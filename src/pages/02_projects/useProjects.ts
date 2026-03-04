import { ref, computed, onMounted, onUnmounted } from "vue"
import { useRouter } from "vue-router"
import { projects as projectsData, type Project } from "@/pages/02_projects/projects_data"

export function useProjects() {
    const router = useRouter()
    const showAll = ref(false)
    const selectedProject = ref<Project | null>(null)

    // --- LÓGICA PARA DETECTAR MÓVIL ---
    const isMobile = ref(false)
    const updateSize = () => {
        // Definimos móvil como menos de 768px (estándar de Tailwind 'md')
        isMobile.value = window.innerWidth < 768
    }

    onMounted(() => {
        updateSize()
        window.addEventListener('resize', updateSize)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateSize)
    })
    // ---------------------------------

    const allProjects = projectsData

    const visibleProjects = computed<Project[]>(() => {
        if (showAll.value) return projectsData
        // En móvil mostramos 3 inicialmente, en PC mostramos 6
        const limit = isMobile.value ? 3 : 6
        return projectsData.slice(0, limit)
    })

    const shouldShowButton = computed(() => {
        const limit = isMobile.value ? 3 : 6
        return projectsData.length > limit
    })

    const openPreview = (project: Project) => {
        selectedProject.value = project
        document.body.style.overflow = "hidden"
    }

    const closePreview = () => {
        selectedProject.value = null
        document.body.style.overflow = "auto"
    }

    const getProjectById = (id: string | number) => {
        const numericId = Number(id)
        return projectsData.find(p => p.id === numericId)
    }

    const goToProject = (id: number) => {
        closePreview()
        router.push({ name: "project-detail", params: { id } })
    }

    return {
        showAll,
        allProjects,
        visibleProjects,
        shouldShowButton,
        selectedProject,
        openPreview,
        closePreview,
        getProjectById,
        goToProject,
        goBack: () => router.back()
    }
}