import { createWebHistory, createRouter } from "vue-router";
import home from "@/components/homePage.vue";
import todoList from "@/components/todoList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: home,
  },
  {
    path: "/todo-list",
    name: "Todo List",
    component: todoList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;