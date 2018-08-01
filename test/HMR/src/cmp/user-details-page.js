import {component} from 'doz'

component('user-details-page', {
    template() {
        return `
                <div>I'm user page with id "${this.props.id}", <a href="javascript:history.back()">back</a></div>
            `
    },
    onCreate() {
        this.props.id = this.getComponentById('router').$_param['id'];
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});