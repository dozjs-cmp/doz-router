import {component} from 'doz'

component('home-page', {
    template() {
        return `
                <div>I'm home page</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});