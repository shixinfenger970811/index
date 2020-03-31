import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import './axios/api'
import './assets/iconfont/iconfont.css'

//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//导入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

//引入mock
require('../src/mock/mock')
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");