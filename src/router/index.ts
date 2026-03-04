import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/pages/01_home/Home.vue"
import SobreMi from "@/pages/01_home/0_about/SobreMi.vue"
import Projects from "@/pages/02_projects/Projects.vue"
import ProjectDetail from "@/pages/02_projects/ProjectDetail.vue"

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
      name: "projects-list",
      component: Projects,
    },
    
    /** * ✅ Cambio clave: 
     * Definimos el detalle como una ruta independiente. 
     * Esto permite que se renderice reemplazando la vista actual 
     * en lugar de intentar renderizarse dentro de la página de Proyectos.
     */
    {
      path: "/proyectos/:id",
      name: "project-detail",
      component: ProjectDetail,
      props: true,
    },

    // Redirección por defecto
    {
      path: "/:patchMatch(.*)",
      redirect: "/",
    },
  ],
})