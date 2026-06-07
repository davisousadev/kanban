import { createRouter, createWebHistory } from "vue-router";
import kanban from "@/views/Kanban.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/kanban",
      name: "Kanban",
      component: kanban,
      meta: { requiresAuth: true },
    },
    { path: "/", name: "Login", component: Login },
    { path: "/register", name: "Register", component: Register },
  ],
});

router.beforeEach((to, _from) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    return {path: "/"}
  }
});

export default router;
