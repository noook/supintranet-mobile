import Vue from "nativescript-vue";
import RadListView from 'nativescript-ui-listview/vue';
import store from './store';

Vue.use(RadListView);

import Home from "./components/Home";

new Vue({
    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    },
    store
}).$start();
