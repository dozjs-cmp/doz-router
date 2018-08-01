import {component} from 'doz'

component('navigate-buttons', {
    template() {
        return `
                <div style="color: #fff; margin: 20px">Navigate by "$navigate" method</div>
                <div>
                    <button onclick="this.$router('/about')">About</button>
                    <button onclick="this.$router('/profile/me')">Profile</button>
                    <button onclick="this.$router('/search/?t=hello')">Search hello</button>
                </div>
            `
    },
    $router(path){
        this.getComponentById('router').$navigate(path);
    }
});