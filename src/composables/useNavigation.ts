// src/composables/useNavigation.ts
import { useRoute, useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()
    const route = useRoute()

    async function goToSection(id: string): Promise<void> {
        if (route.path !== "/") {
        // ✅ Si no estamos en la Home, navegamos a ella incluyendo el hash
        // Esto hará que el scrollBehavior del router se encargue de todo automáticamente
        await router.push({ path: "/", hash: `#${id}` })
        } else {
        // Si ya estamos en la Home, el scroll manual sigue siendo lo más fluido 
        // y evita añadir muchas entradas al historial del navegador
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        }
    }

    async function goToAbout(): Promise<void> {
        await router.push("/sobre-mi")
    }

    return {
        goToSection,
        goToAbout
    }
}