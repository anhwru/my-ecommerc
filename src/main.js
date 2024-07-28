import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

//Vue.config.productionTip = false;

//buefy
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCaretUp, faCaretDown);
Vue.component("vue-fontawesome", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  render: (h) => h(App)
}).$mount("#app");
