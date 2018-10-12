# doz-router
Routing for DOZ framework

Live <a href="https://dozjs-cmp.github.io/doz-router/dist/index.html">here</a>

## Install
```
npm install --save doz-router
```

## Usage
```javascript
//..
import 'doz-router'

```

## Basic example
```javascript
import Doz from 'doz'
import 'doz-router'

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
});
```

## Using HTML5 api pushstate

```javascript

new Doz({
    root: '#app',
    template: `
        <doz-router mode="history">
            //...
        </doz-router>
    `
});

```

## Dynamic routes

```javascript

new Doz({
    root: '#app',
    template: `
        <doz-router>
            <user-page route="/user/:id"></user-page>
        </doz-router>
    `
});

```

## Wild cards

```javascript

new Doz({
    root: '#app',
    template: `
        <doz-router>
            <docs-page route="/docs/*"></docs-page>
        </doz-router>
    `
});

```

## Props
| Name | Default | Description |
| ---- | ------- | ----------- |
| hash | # | hash symbol |
| class-active-link | router-link-active | css class for active router link |
| link-attr | data-router-link | attribute that identify link |
| mode | hash | router mode "hash" or "history" (html5 api) |
| root | / | base root, works only in "history" mode |

## Instance methods

### $navigate

| Param | Type | Default | Description |
| ---- | ------- | ----------- | ---------- |
| path | `string` | undefined | path to navigate |
| params | `object` | undefined | optional params |

#### Example

```javascript
this.getCmp('my-router-id').$navigate('/about');
```

### $currentPath
Returns current path. (since 1.0.0)

### $param

| Param | Type | Default | Description |
| ---- | ------- | ----------- | ---------- |
| property | `string` | undefined | property name |

#### Example

```javascript

// A route defined like so '/user/:id'

this.router.$param('id');
```

### $query

| Param | Type | Default | Description |
| ---- | ------- | ----------- | ---------- |
| property | `string` | undefined | property name |

#### Example

```javascript

// A route defined like so '/news/?search=tech'

this.getCmp('my-router-id').$query('search');
```

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/dozjs-cmp/doz-router/blob/master/CHANGELOG.md">here</a>

## License
doz-router is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="rica.li">Fabio Ricali</a>