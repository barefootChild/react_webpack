const Koa = require('koa')
const path = require('path')
const fileServer = require('koa-static')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const { uploadFile } = require('./src/utils')

const app = new Koa()
const router = new Router()

app.use(fileServer(path.join(__dirname, './')))

app.use(bodyParser())

app.use(async (ctx, next) => {
  await next()
  ctx.set({'Access-Control-Allow-Origin': '*'})
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

router.get('/', (ctx) => {
  ctx.response.redirect('/animate/particle.html')
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
