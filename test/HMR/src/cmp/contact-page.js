import {component} from 'doz'

component('contact-page', {
    template() {
        return `
                <div>I'm contact page</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});