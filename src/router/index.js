import { createRouter, createWebHistory  } from "vue-router";

// 只保留大屏页面路由
const routes = [
  {
    path: "/",
    name: "screen",
    component: () => import("../views/Screen.vue"),
  }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes
});
export default router;