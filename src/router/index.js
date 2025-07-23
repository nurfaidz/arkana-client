import { createRouter, createWebHistory } from "vue-router";
import { authRoutes } from "./auth";

// define route
const routes = [
  ...authRoutes,
  {
    path: "/admin/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
