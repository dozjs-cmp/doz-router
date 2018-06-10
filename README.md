# doz-router
Routing for DOZ framework

## Install
```
npm install --save doz-router
```

## Usage
```javascript
//..
import DozRouter from 'doz-router'

//Register component
Doz.component('doz-router', DozRouter);

```

## Basic example
```javascript
import Doz from 'doz'
import DozRouter from 'doz-router'

Doz.component('doz-router', DozRouter);

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

Doz.component('page-not-found', {
    template() {
        return `
            <div>Page not found</div>
        `
    }
});

new Doz({
    root: '#app',
    template: `
        <nav>
            <a router-link href="/">Home</a>
            <a router-link href="/about">About</a>
            <a router-link href="/contact">Contact</a>
            <a router-link href="/not-found-page-bla-bla">Not found</a>
        </nav>
        <doz-router>
            <home-page route="/"></home-page>
            <about-page route="/about"></about-page>
            <contact-page route="/contact"></contact-page>
            <page-not-found route="*"></page-not-found>
        </doz-router>
    `
});
```