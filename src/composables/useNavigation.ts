import { useRoute, useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()
    const route = useRoute()

    // Navegación por secciones (scroll)
    async function goToSection(id: string): Promise<void> {
        if (route.path !== "/") {
        // Si no estamos en Home, vamos a la Home con el hash
        await router.push({ path: "/", hash: `#${id}` })
        } else {
        // Si ya estamos en Home, hacemos scroll manual
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        }
    }

    // Navegación a la página Sobre Mi
    async function goToAbout(): Promise<void> {
        await router.push("/sobre-mi")
        // Forzamos el scroll arriba por si acaso
        window.scrollTo(0, 0)
    }

    return {
        goToSection,
        goToAbout
    }
}