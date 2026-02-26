import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { projects as projectsData, type Project } from "@/data/projects"

export function useProjects() {
    const router = useRouter()
    const showAll = ref(false)
    const selectedProject = ref<Project | null>(null)

    const allProjects = projectsData
    const visibleProjects = computed<Project[]>(() =>
        showAll.value ? projectsData : projectsData.slice(0, 6)
    )

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
        selectedProject,
        openPreview,
        closePreview,
        getProjectById,
        goToProject,
        goBack: () => router.back()
    }
}