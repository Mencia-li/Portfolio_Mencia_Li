import { useRoute, useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()
    const route = useRoute()

    async function goToSection(id: string): Promise<void> {
        
        // 💡 OPCIONAL: Si quieres que el botón de "Proyectos" del Header vaya a la página 
        // completa de proyectos en lugar de a la sección del Home, descomenta esto:
        /*
        if (id === "proyectos") {
            router.push("/proyectos")
            return
        }
        */

        if (route.path !== "/") {
            // 1. Vamos a la Home
            await router.push("/")
            
            // 2. Esperamos un poco para que el DOM se monte y el router termine su scrollBehavior(top:0)
            setTimeout(() => {
                const el = document.getElementById(id)
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" })
                }
            }, 100) // 100ms suele ser el punto dulce ideal
        } else {
            // Si ya estamos en la Home, hacemos el scroll inmediatamente
            const el = document.getElementById(id)
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        }
    }

    function goToAbout(): void {
        router.push("/sobre-mi")
    }

    return { goToSection, goToAbout }
}