import { useRoute, useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()
    const route = useRoute()

    async function goToSection(id: string, isInstant: boolean = false): Promise<void> {
        
        if (route.path !== "/") {

            await router.push({ path: "/", hash: `#${id}` })
        } else {
            // Si YA estamos en el Home (click en el Header), hacemos el scroll a mano
            const el = document.getElementById(id)
            if (el) {
                if (isInstant) {
                    document.documentElement.style.scrollBehavior = 'auto'
                    el.scrollIntoView({ behavior: 'auto', block: "start" })
                    
                    setTimeout(() => {
                        document.documentElement.style.scrollBehavior = ''
                    }, 50)
                } else {
                    el.scrollIntoView({ behavior: "smooth", block: "start" })
                }
            }
        }
    }

    function goToAbout(): void {
        router.push("/sobre-mi")
    }

    return { goToSection, goToAbout }
}