import {component} from 'doz'

component('profile-page', {
    template() {
        return `
                <div>I'm profile me page</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});