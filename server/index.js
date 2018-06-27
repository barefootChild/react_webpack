const Koa = require('koa')
const path = require('path')
const fileServer = require('koa-static')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
  ctx.response.redirect('/index/index.html')
})

app.use(fileServer(path.join(__dirname, './')))

app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  console.log('Your application is running on port 88888')
})
