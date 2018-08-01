import {component} from 'doz'

component('user-page', {
    template() {
        return `
                <div>I'm user page index, <a href="#/user/10">show id 10</a></div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});