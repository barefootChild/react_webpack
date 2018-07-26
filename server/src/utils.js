const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

function getSuffixName(fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

function uploadFile(ctx, options) {
  let req = ctx.req
  let busboy = new Busboy({headers: req.headers})
  let fileType = options.fileType || 'common'
  let filePath = path.join(options.path, fileType)
  let mkdirResult = mkdirsSync(filePath)
  console.log(mkdirResult)

  return new Promise((resolve, reject) => {
    console.log('uploading...')
    let result = {
      success: false,
      formData: {}
    }

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)

      file.pipe(fs.createWriteStream(saveTo))

      file.on('end', () => {
        result.success = true

        console.log('upload success!')
        resolve(result)
      })
    })

    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
      console.log('表单数据[' + fieldname + ']:value:' + inspect(val))
      result.formData[fieldname] = inspect(val)
    })

    busboy.on('finish', () => {
      console.log('ending')
      resolve(result)
    })

    busboy.on('error', () => {
      console.log('error')
      reject(result)
    })

    req.pipe(busboy)
  })
}

module.exports = {
  uploadFile
}