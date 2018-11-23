const inspect = require('util').inspect
const path = require('path')
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
  mkdirsSync(filePath) //创建文件存储目录

  return new Promise((resolve, reject) => {
    let result = {
      success: false,
      imgurl: ''
    }

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)

      file.pipe(fs.createWriteStream(saveTo))

      file.on('end', () => {
        result.success = true
        result.imgurl = 'http://10.232.46.156:8888/imgs/' + fileType + '/' + fileName

        console.log('upload success!')
        resolve(result)
      })
    })

    busboy.on('finish', () => {
      console.log('ending')
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