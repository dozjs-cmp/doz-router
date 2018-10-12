# doz-router
Routing for DOZ framework

Live <a href="https://dozjs-cmp.github.io/doz-router/dist/index.html">here</a>

## Install
```
npm install --save doz-router
```

## Basic example
```javascript
import Doz from 'doz'
import 'doz-router'

Doz.component('home-page', {
    template(h) {
        return h`
            <div>I'm home page</div>
        `
    }
});

Doz.component('about-page', {
    template(h) {
        return h`
            <div>I'm about page</div>
        `
    }
});

Doz.component('contact-page', {
    template(h) {
        return h`
            <div>I'm contact page</div>
        `
    }
});

Doz.component('page-not-found', {
    template(h) {
        return h`
            <div>Page not found</div>
        `
    }
});

new Doz({
    root: '#app',
    template(h) {
        return h`
            <nav>
                <a data-router-link href="/">Home</a>
                <a data-router-link href="/about">About</a>
                <a data-router-link href="/contact">Contact</a>
                <a data-router-link href="/not-found-page-bla-bla">Not found</a>
            </nav>
            <doz-router>
                <home-page route="/"></home-page>
                <about-page route="/about"></about-page>
                <contact-page route="/contact"></contact-page>
                <page-not-found route="*"></page-not-found>
            </doz-router>
        `
    }
});
```

## Using HTML5 api pushstate

```javascript

new Doz({
    root: '#app',
    template(h) {
        return h`
            <doz-router mode="history">
                //...
            </doz-router>
        `
    }
});

```

## Dynamic routes

```javascript

new Doz({
    root: '#app',
    template(h) {
        return h`
            <doz-router>
                <user-page route="/user/:id"></user-page>
            </doz-router>
        `
    }
});

```

## Wild cards

```javascript

new Doz({
    root: '#app',
    template(h) {
        return h`
            <doz-router>
                <docs-page route="/docs/*"></docs-page>
            </doz-router>
        `
    }
});

```

## Props
| Name | Default | Description | Since |
| ---- | ------- | ----------- | ----- |
| hash | # | hash symbol | |
| class-active-link | router-link-active | css class for active router link | |
| link-attr | data-router-link | attribute that identify link | |
| mode | hash | router mode "hash" or "history" (html5 api) | |
| root | / | base root, works only in "history" mode | |
| initial-redirect |  | applies a redirect to specific path if initial path is "/" | 1.4.0 |

## Instance methods

### navigate

| Param | Type | Default | Description |
| ---- | ------- | ----------- | ---------- |
| path | `string` | undefined | path to navigate |
| params | `object` | undefined | optional params |

#### Example

```javascript
this.router.navigate('/about');
```

### currentPath
Returns current path. (since 1.0.0)

### param

| Param | Type | Default | Description |
| ---- | ------- | ----------- | ---------- |
| property | `string` | undefined | property name |

#### Example

```javascript

// A route defined like so '/user/:id'

this.router.param('id');
```

### query

| Param | Type | Default | Description |
| ---- | ------- | ----------- | ---------- |
| property | `string` | undefined | property name |

#### Example

```javascript

// A route defined like so '/news/?search=tech'

this.router.query('search');
```

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/dozjs-cmp/doz-router/blob/master/CHANGELOG.md">here</a>

## License
doz-router is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="rica.li">Fabio Ricali</a>