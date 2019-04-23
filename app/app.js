import Vue from "nativescript-vue";
import RadListView from 'nativescript-ui-listview/vue';

Vue.use(RadListView);

import Home from "./components/Home";

new Vue({
    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();
