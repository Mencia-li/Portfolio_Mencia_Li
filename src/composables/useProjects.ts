// En src/composables/useProjects.ts
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { projects as projectsData, type Project } from "@/data/projects"

export function useProjects() {
    const router = useRouter()
    const showAll = ref(false)
    
    // Nuevo: Estado para la previsualización
    const selectedProject = ref<Project | null>(null)

    const allProjects = projectsData
    const visibleProjects = computed<Project[]>(() =>
        showAll.value ? projectsData : projectsData.slice(0, 6)
    )

    const getProjectById = (id: string | number) => {
        const numericId = Number(id)
        return projectsData.find(p => p.id === numericId)
    }

    // Cambiamos esta función para que primero abra la previsualización
    const openPreview = (project: Project) => {
        selectedProject.value = project
    }

    const closePreview = () => {
        selectedProject.value = null
    }

    const goToProject = (id: number) => {
        selectedProject.value = null // Cerramos el modal antes de irnos
        router.push({ name: "project-detail", params: { id } })
    }

    return {
        showAll,
        allProjects,
        visibleProjects,
        selectedProject, // Exportamos el nuevo estado
        openPreview,     // Exportamos la función de abrir
        closePreview,    // Exportamos la función de cerrar
        getProjectById,
        goToProject,
        goBack: () => router.back()
    }
}