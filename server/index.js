const fs = require('fs')
const Koa = require('koa')
const path = require('path')
const fileServer = require('koa-static')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

const { uploadFile } = require('./src/utils')

const app = new Koa()
const router = new Router()

mongoose.connect('mongodb://127.0.0.1/memory')
const memoryDb = mongoose.connection

memoryDb.on('error', () => {
  console.log('connection error!')
})

memoryDb.once('open', () => {
  console.log('connect successfully!')
})

const memorySchema = new mongoose.Schema({
  storyPeople: String,
  storyAddress: String,
  storyDate: String,
  storyPicture: [String],
  storyBrief: String,
  storyDetails: String
})

const memory = mongoose.model('memory', memorySchema)

app.use(fileServer(path.join(__dirname, './')))

app.use(bodyParser())

app.use(async (ctx, next) => {
  await next()
  ctx.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  })
})

router.post('/imgs/uploads', async (ctx) => {
  let result = {success: false}
  let serverFilePath = path.join(__dirname, 'imgs')

  result = await uploadFile(ctx, {
    fileType: 'album',
    path: serverFilePath
  })
  ctx.body = result
})

router.post('/story/info', async ctx => {
  const { storyPeople, storyAddress, storyDate, storyPicture, storyBrief, storyDetails } = ctx.request.body
  const memoryItem = new memory({ storyPeople, storyAddress, storyDate, storyPicture, storyBrief, storyDetails })
  const result = { code: 0, message: 'failed'}
  await new Promise((resolve, reject) => {
    memoryItem.save((err, item) => {
      if (err) {
        return console.log('save failed!')
      }
      result.code = 1
      result.message = 'success'
      resolve()
    })
  })
  ctx.body = result
})

router.get('/', (ctx) => {
  ctx.response.redirect('/animate/particle.html')
})

router.get('/manage/*', ctx => {
  let html = fs.readFileSync(path.resolve('./manage/index.html'))
  ctx.type = 'html'
  ctx.body = html
})

router.post('/checkAuthority', (ctx) => {
  ctx.body = {
    code: 1,
    msg: 'success'
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  console.log('Your application is running on port 8888')
})
