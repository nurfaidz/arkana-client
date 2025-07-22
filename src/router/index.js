import { createRouter, createWebHistory } from "vue-router";
import { authRoutes } from "./auth";

// define route
const routes = [
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
