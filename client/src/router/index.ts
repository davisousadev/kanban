import {createRouter, createWebHistory} from "vue-router";
import kanban from "@/views/Kanban.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/kanban", name: "Kanban", component: kanban },
        { path: "/", name: "Login", component: Login },
        { path: "/register", name: "Register", component: Register }
    ]
});

export default router;