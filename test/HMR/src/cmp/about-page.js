import {component} from 'doz'

component('about-page', {
    template() {
        return `
                <div>I'm about page</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});