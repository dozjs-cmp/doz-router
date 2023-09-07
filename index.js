import Doz from 'doz'
import cmp from './src/index.js'

// expose component to global scope
function register() {
    if (typeof window !== 'undefined') {
        Doz.component('doz-router', cmp)
    }
}

register();

export default cmp