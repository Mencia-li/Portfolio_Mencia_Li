import { nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()
    const route = useRoute()

    async function goToSection(id: string): Promise<void> {
        // Si no estamos en la Home, vamos a la Home primero (URL limpia)
        if (route.path !== "/") {
        await router.push("/")
        await nextTick()
        }
        
        // Hacemos el scroll manual por ID. Esto NO cambia la barra de direcciones.
        const el = document.getElementById(id)
        if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    function goToAbout(): void {
        router.push("/sobre-mi")
    }

    return { goToSection, goToAbout }
}