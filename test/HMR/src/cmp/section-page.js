import {component} from 'doz'

component('section-page', {
    template() {
        let id = this.getComponentById('router').$_param['id'];
        return `
                <div>I'm section page index ${id}</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});