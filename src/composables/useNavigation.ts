import { useRoute, useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()
    const route = useRoute()

    async function goToSection(id: string, isInstant: boolean = false): Promise<void> {
        
        const executeScroll = () => {
            const el = document.getElementById(id)
            if (el) {
                if (isInstant) {
                    // ⚡ "Apagamos" el scroll suave global del CSS temporalmente
                    document.documentElement.style.scrollBehavior = 'auto'
                    el.scrollIntoView({ behavior: 'auto', block: "start" })
                    
                    // Lo volvemos a encender un instante después
                    setTimeout(() => {
                        document.documentElement.style.scrollBehavior = ''
                    }, 50)
                } else {
                    // Scroll suave normal para el menú superior
                    el.scrollIntoView({ behavior: "smooth", block: "start" })
                }
            }
        }

        if (route.path !== "/") {
            await router.push("/")
            setTimeout(executeScroll, 100)
        } else {
            executeScroll()
        }
    }

    function goToAbout(): void {
        router.push("/sobre-mi")
    }

    return { goToSection, goToAbout }
}