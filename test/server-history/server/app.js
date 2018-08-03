//const server = require('pushstate-server');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const body = require('koa-body');
const app = new Koa();
const router = new Router();
const fs = require('fs');

process.chdir('test/server-history');

router.get('*', ctx => {
    ctx.body = fs.readFileSync('./public/index.html').toString();
});

app
    .use(serve('./public/'))
    .use(body())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
/*server.start({
    port: 3000,
    directory: './public'
});*/
