// src/router/index.ts
import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/pages/home/Home.vue"
import SobreMi from "@/pages/SobreMi.vue"
import Projects from "@/pages/Projects.vue"
import ProjectDetail from "@/pages/ProjectDetail.vue"

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  
  // ✅ Usamos guiones bajos para indicar parámetros no usados y eliminar los warnings
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/sobre-mi",
      name: "sobre-mi",
      component: SobreMi,
    },
    {
      path: "/proyectos",
      component: Projects,
      children: [
        {
          path: ":id",
          name: "project-detail",
          component: ProjectDetail,
          props: true,
        },
      ],
    },
    {
      path: "/:patchMatch(.*)",
      redirect: "/",
    },
  ],
})