import Vue from "vue";
import { Slider } from "vant";
import { Button } from "vant";
Vue.use(Slider);
Vue.use(Button);
import App from "./App.vue";

import "vant/lib/index.css";
import "./index.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
