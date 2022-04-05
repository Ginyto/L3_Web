import { createWebHistory, createRouter } from "vue-router";
import home from "@/components/homePage";
import todoList from "@/components/todoList";
import studentList from "@/components/studentList"
import GroupeA from "@/components/GroupeA"
import GroupeB from "@/components/GroupeB"
import GroupeAB from "@/components/GroupeAB"

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
  {
    path: "/student-list",
    name: "Student List",
    component: studentList,
  },
  {
    path: "/groupe-a",
    name: "Groupe A",
    component: GroupeA,
  },
  {
    path: "/groupe-b",
    name: "Groupe B",
    component: GroupeB,
  },
  {
    path: "/groupe-ab",
    name: "Groupe AB",
    component: GroupeAB,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;