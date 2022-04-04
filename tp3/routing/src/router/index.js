import { createWebHistory, createRouter } from "vue-router";
import Exercice1 from "@/components/Exercice-1";
import Exercice2 from "@/components/Exercice-2";

const routes = [
    {
        path: "/exercice1",
        name: "Exercice 1",
        component : Exercice1,
    },
    {
        path: "/exercice2",
        name: "Exercice 2",
        component : Exercice2,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;