
describe('doz-routes', function () {

    this.timeout(5000);

    before(function () {
        this.jsdom = require('jsdom-global')();
        global.Doz = require('doz');
        Doz.component('doz-routes', require('../src/doz-routes'));
    });

    after(function () {
        this.jsdom()
    });

    beforeEach(function () {
        document.body.innerHTML = '';
        Doz.collection.removeAll();
    });

    describe('create basic', function () {
        it('should be ok', function (done) {

            // language=HTML
            document.body.innerHTML = `
                <div id="app"></div>
            `;

            Doz.component('home-page', {
                template() {
                    return `
                        <div>I'm home page</div>
                    `
                }
            });

            Doz.component('about-page', {
                template() {
                    return `
                        <div>I'm about page</div>
                    `
                }
            });

            Doz.component('contact-page', {
                template() {
                    return `
                        <div>I'm contact page</div>
                    `
                }
            });

            new Doz({
                root: '#app',
                template: `
                    <nav>
                        <a id="nav-home" href="#/">Home</a> |
                        <a id="nav-about" href="#/about">About</a> |
                        <a id="nav-contact" href="#/contact">Contact</a>
                    </nav>
                    <doz-routes>
                        <home-page d:route="/"></home-page>
                        <about-page d:route="/about"></about-page>
                        <contact-page d:route="/contact"></contact-page>
                    </doz-routes>
                `
            });

            console.log(document.querySelector('#nav-about').click());
            document.querySelector('#nav-about').click();
            setTimeout(()=>{
                console.log(document.body.innerHTML) ;
                done();
            },1000);

        });

    });
});
