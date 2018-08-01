import {component} from 'doz'

component('search-page', {
    template() {
        return `
            <div>I'm search page with query "${this.props.query}"</div>
        `
    },
    onCreate() {
        this.props.query = this.getComponentById('router').$_query['t'];
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});
