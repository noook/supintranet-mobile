import Vue from "nativescript-vue";
import RadListView from 'nativescript-ui-listview/vue';
import store from './store';

import Home from './components/Home';
import Login from './components/Login.vue';

Vue.use(RadListView);

new Vue({
    template: `
        <Frame>
            <Home v-if="loggedIn" />
            <Login v-else />
        </Frame>`,
    computed: {
        loggedIn() {
            return this.$store.getters.username !== null;
        },
    },
    components: {
        Home,
        Login,
    },
    store
}).$start();

