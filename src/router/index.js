import { createRouter, createWebHistory  } from "vue-router";

// 路由配置
const routes = [
  {
    path: "/",
    name: "setting",
    component: () => import("../views/Setting.vue"),
  },  {
    path: "/Screen",
    name: "screen",
    component: () => import("../views/Screen.vue"),
  },
];
// 创建路由

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes
});
// 导出 router
export default router;