import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/pages/01_home/Home.vue"
// Ya no importamos SobreMi, Projects y ProjectDetail aquí arriba
// para aprovechar el Lazy Loading.

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
      component: Home, // El Home sí se carga inmediatamente
    },
    {
      path: "/sobre-mi",
      name: "sobre-mi",
      // Lazy loading: solo se descarga el código cuando el usuario visita la ruta
      component: () => import("@/pages/01_home/0_about/SobreMi.vue"),
    },

    // Rutas para proyectos
    {
      path: "/proyectos",
      name: "projects-list",
      component: () => import("@/pages/02_projects/Projects.vue"),
    },
    
    /** * ✅ Cambio clave: 
     * Definimos el detalle como una ruta independiente. 
     */
    {
      path: "/proyectos/:id",
      name: "project-detail",
      component: () => import("@/pages/02_projects/ProjectDetail.vue"),
      props: true,
    },

    // ✅ Corregido: Redirección por defecto (Catch-All para Vue Router 4)
    // Era: /:patchMatch(.*) -> Ahora es: /:pathMatch(.*)*
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
})