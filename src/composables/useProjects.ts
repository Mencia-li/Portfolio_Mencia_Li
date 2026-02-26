import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { projects as projectsData, type Project } from "@/data/projects"

export function useProjects() {
    const router = useRouter()
    
    // Estado para controlar cuántos proyectos se ven (útil para la sección de la Home)
    const showAll = ref(false)

    // Obtener todos los proyectos
    const allProjects = projectsData

    // Proyectos filtrados para la vista previa (6 o todos)
    const visibleProjects = computed<Project[]>(() =>
        showAll.value ? projectsData : projectsData.slice(0, 6)
    )

    // Función para buscar un proyecto por su ID
    const getProjectById = (id: string | number) => {
        const numericId = Number(id)
        return projectsData.find(p => p.id === numericId)
    }

    // Navegación hacia el detalle de un proyecto
    const goToProject = (id: number) => {
        router.push({ name: "project-detail", params: { id } })
    }

    // Volver atrás (útil para el detalle)
    const goBack = () => router.back()

    return {
        showAll,
        allProjects,
        visibleProjects,
        getProjectById,
        goToProject,
        goBack
    }
}