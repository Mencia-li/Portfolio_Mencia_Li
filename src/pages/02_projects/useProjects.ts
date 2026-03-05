import { ref, computed, onMounted, onUnmounted } from "vue"
import { useRouter } from "vue-router"
import { projects as projectsData, type Project } from "@/pages/02_projects/projects_data"

export function useProjects() {
    const router = useRouter()
    const showAll = ref(false)
    const selectedProject = ref<Project | null>(null)

    // --- DETECCIÓN DE COLUMNAS ---
    const columns = ref(3)
    const updateColumns = () => {
        if (window.innerWidth >= 1024) columns.value = 3      // LG: 3 columnas
        else if (window.innerWidth >= 640) columns.value = 2 // SM: 2 columnas
        else columns.value = 1                               // XS: 1 columna
    }

    onMounted(() => {
        updateColumns()
        window.addEventListener('resize', updateColumns)
    })
    onUnmounted(() => window.removeEventListener('resize', updateColumns))

    // Límite inicial según tu regla de filas
    const initialLimit = computed(() => {
        if (columns.value === 3) return 6 // 2 filas de 3
        if (columns.value === 2) return 4 // 2 filas de 2
        return 3                          // 3 filas de 1
    })

    const visibleProjects = computed<Project[]>(() => {
        if (showAll.value) return projectsData
        return projectsData.slice(0, initialLimit.value)
    })

    const shouldShowButton = computed(() => {
        return projectsData.length > initialLimit.value
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