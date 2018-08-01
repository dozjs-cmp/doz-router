import {component} from 'doz'

component('not-found-page', {
    template() {
        return `
            <div>404 page not found</div>
        `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});