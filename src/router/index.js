import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/main.vue";
import Settings from "@/views/settings.vue";
import About from "@/views/about.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;