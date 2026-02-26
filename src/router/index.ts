import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/pages/home/Home.vue"
import SobreMi from "@/pages/SobreMi.vue"
import Projects from "@/pages/Projects.vue"
import ProjectDetail from "@/pages/ProjectDetail.vue"

export const router = createRouter({
  // Mantenemos el modo Hash para compatibilidad con hosting gratuito
  history: createWebHashHistory(import.meta.env.BASE_URL),
  
  /**
   * ✅ Scroll simple y limpio:
   * Al cambiar de página, siempre volvemos arriba del todo.
   * Eliminamos la lógica de 'to.hash' para evitar los errores de URL duplicada.
   */
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
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

    // Rutas para proyectos
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

    // Redirección por defecto
    {
      path: "/:patchMatch(.*)",
      redirect: "/",
    },
  ],
})