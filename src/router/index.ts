import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/pages/home/Home.vue"
import SobreMi from "@/pages/SobreMi.vue"
import Projects from "@/pages/Projects.vue"
import ProjectDetail from "@/pages/ProjectDetail.vue"

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  
  /**
   * ✅ Control de scroll mejorado:
   * 1. Respeta la posición si el usuario vuelve atrás.
   * 2. Si hay un hash (ej: #contacto), se desplaza suavemente a esa sección.
   * 3. Si no, resetea el scroll arriba del todo.
   */
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    
    return { top: 0 }
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

    // ✅ Rutas anidadas para proyectos
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

    // Redirección por defecto si la ruta no existe
    {
      path: "/:patchMatch(.*)",
      redirect: "/",
    },
  ],
})