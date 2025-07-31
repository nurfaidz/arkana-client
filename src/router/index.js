import { createRouter, createWebHistory } from "vue-router";
import { authRoutes } from "./auth";
import Dashboard from "../views/dashboard/Dashboard.vue";
import DashboardPage from "../components/dashboard/DashboardPage.vue";
import FieldPage from "../components/field/FieldPage.vue";

// define route
const routes = [
  ...authRoutes,
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboard",
        component: DashboardPage,
        meta: { requiresAuth: true },
      },
      {
        path: "fields",
        name: "fields",
        component: FieldPage,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
