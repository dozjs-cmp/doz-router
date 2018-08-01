import {component} from 'doz'

component('extension-page', {
    template() {
        return `
                <div>I'm .html page</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});