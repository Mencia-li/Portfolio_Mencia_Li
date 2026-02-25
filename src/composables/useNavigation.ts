// src/composables/useNavigation.ts
import { nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()
    const route = useRoute()

    async function goToSection(id: string): Promise<void> {
        if (route.path !== "/") {
        await router.push("/")
        await nextTick()
        }
        
        const el = document.getElementById(id)
        if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    // ✅ Añadimos 'async' y 'await' para asegurar que la navegación se complete
    async function goToAbout(): Promise<void> {
        await router.push("/sobre-mi")
    }

    return {
        goToSection,
        goToAbout
    }
}