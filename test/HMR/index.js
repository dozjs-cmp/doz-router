import Doz from 'doz'
import './src/ui'

window.MyApp = new Doz({
    root: '#app',
    template: `
        <app-ui></app-ui>
    `
});