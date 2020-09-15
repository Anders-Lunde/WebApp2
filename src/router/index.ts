import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/morfologi",
    name: "Morphologi",
    // route level code-splitting
    // this generates a separate chunk (morfologi.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "morfologi" */ "../views/Morfologi.vue"),
  },
  {
    path: "/ordforraad",
    name: "Ordforraad",
    component: () => import("../views/Ordforraad.vue"),
  },
  {
    path: "/tallforstaaelse",
    name: "Tallforstaaelse",
    component: () => import("../views/Tallforstaaelse.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
