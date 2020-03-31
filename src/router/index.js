import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Monitor from "../components/Monitor.vue"
import Echartsdata from "../components/Echartsdata.vue"

const routes = [
    // {
    //   path: "/",
    //   name: "Home",
    //   component: Home
    // },
    // {
    //   path: "/about",
    //   name: "About",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/About.vue")
    // }
    {
        path: '/monitor',
        component: Monitor
    },
    {
        path: '/echartsdata',
        component: Echartsdata
    },

];

const router = new VueRouter({
    routes
});

export default router;