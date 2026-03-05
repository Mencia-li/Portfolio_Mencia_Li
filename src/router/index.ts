import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/pages/01_home/Home.vue"

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  
  scrollBehavior(to, _from, savedPosition) {
    // 1. Apagamos el scroll suave de CSS temporalmente antes del salto
    document.documentElement.style.scrollBehavior = 'auto'
    
    // 2. Lo volvemos a encender un instante después para no perder 
    // la navegación suave en los menús
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = ''
    }, 50)

    // 3. ✨ LA MAGIA: Si hay un hash (ej. #proyectos), Vue Router salta directo sin que se vea el Home
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'auto' // Salto instantáneo nativo del router
      }
    }

    // 4. Devolvemos la posición guardada (si existe) o el top 0
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
      component: () => import("@/pages/01_home/0_about/SobreMi.vue"),
    },
    {
      path: "/proyectos/:id",
      name: "project-detail",
      component: () => import("@/pages/02_projects/ProjectDetail.vue"),
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
})