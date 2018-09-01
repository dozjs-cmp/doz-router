const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const body = require('koa-body');
const app = new Koa();
const router = new Router();
const fs = require('fs');

require('jsdom-global')();

process.chdir('test/SSR');

app
    .use(serve('./public'))
    .use(body())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async ctx => {
        let entryContent = fs.readFileSync('./public/app.html').toString();

        const ROOT = '__DOZ_GLOBAL_COMPONENTS__';
        if (window[ROOT])
            window[ROOT].components = {};

        document.documentElement.innerHTML = entryContent.replace('<!DOCTYPE html>', '');

        let bundleJS = fs.readFileSync('./public/'+document.getElementById('bundle').src).toString();

        window.__DOZ_SSR_PATH__ = ctx.path;

        eval(bundleJS);

        entryContent = `<!DOCTYPE html>${document.documentElement.outerHTML}`;

        /*
        await new Promise(resolve => {
            setTimeout(()=>{
                resolve();
            }, 1000);
        });
        */

        ctx.body = entryContent;

    })

    .listen(3000);