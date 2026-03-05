<template>
    <section class="min-h-screen theme-invert transition-colors duration-300">
        <div class="section-container">
            <h2 class="section-title">
                Mis Proyectos
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <div
                v-for="project in visibleProjects"
                :key="project.id"
                @click="openPreview(project)"
                class="theme-base p-4 md:p-6 rounded-lg shadow-md hover:scale-105 transition-all cursor-pointer group w-full max-w-[320px] sm:max-w-none mx-auto"
                >
                    <div class="aspect-square bg-foreground mb-4 rounded-md transition-colors duration-300 overflow-hidden relative">
                        <img
                        :src="`/img/projects/${project.folder}/${project.cover}`"
                        :alt="project.title"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        <div
                        class="absolute inset-0 flex flex-col items-center justify-center bg-foreground/85 group-hover:bg-foreground/20 transition-all duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-none"
                        >
                        <span
                            class="text-background font-bold text-xl uppercase tracking-widest transition-opacity group-hover:opacity-0 px-4 text-center"
                        >
                            {{ project.title }}
                        </span>

                        <div
                            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <span class="theme-base px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter shadow-lg">
                            Vista rápida
                            </span>
                        </div>
                        </div>
                    </div>

                    <h3 class="text-xl font-semibold mb-2">
                        {{ project.title }}
                    </h3>
                    <p class="text-sm opacity-90 leading-snug line-clamp-2">
                        {{ project.description }}
                    </p>
                </div>
            </div>

            <div v-if="shouldShowButton" class="text-center mt-12">
                <button
                ref="toggleBtn"
                @click="handleToggle"
                class="theme-base px-6 py-3 rounded-md hover:opacity-80 transition-all cursor-pointer font-bold active:scale-95 shadow-lg"
                >
                {{ showAll ? 'Ver menos' : 'Ver todos los proyectos' }}
                </button>
            </div>
        </div>

        <Transition name="fade">
        <div
            v-if="selectedProject"
            class="modal-overlay"
            @click="closePreview"
        >
            <div
            class="theme-invert max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative"
            @click.stop
            >
                <button
                    @click="closePreview"
                    class="absolute top-4 right-4 p-2 hover:bg-background/10 rounded-full transition-colors cursor-pointer z-10"
                >
                    <X class="w-6 h-6" />
                </button>

                <div class="p-8 space-y-6">
                    <div class="aspect-video bg-background/20 rounded-lg overflow-hidden">
                    <img
                        :src="`/img/projects/${selectedProject.folder}/${selectedProject.cover}`"
                        :alt="selectedProject.title"
                        class="w-full h-full object-cover"
                    />
                    </div>

                    <div class="space-y-4">
                    <h3 class="text-3xl font-bold uppercase tracking-tight">
                        {{ selectedProject.title }}
                    </h3>
                    <p class="text-lg opacity-80 leading-relaxed">
                        {{ selectedProject.description }}
                    </p>
                    </div>

                    <div class="pt-6 border-t border-background/10 flex justify-end">
                    <Button
                        @click="goToProject(selectedProject.id)"
                        class="theme-base gap-2 font-bold px-8 py-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                    >
                        Ver proyecto completo <ArrowRight class="w-5 h-5" />
                    </Button>
                    </div>
                </div>
            </div>
        </div>
        </Transition>
    </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue" // <-- Asegúrate de importar esto
import { X, ArrowRight } from "lucide-vue-next"
import { useProjects } from "@/pages/02_projects/useProjects"
import { Button } from "@/components/ui/button"

const { 
    visibleProjects, 
    showAll, 
    selectedProject, 
    shouldShowButton,
    openPreview, 
    closePreview, 
    goToProject 
} = useProjects()

// 👇 NUEVA LÓGICA DE ANCLAJE VISUAL 👇
const toggleBtn = ref<HTMLButtonElement | null>(null)

const handleToggle = async () => {
    if (!showAll.value) {
        // Si vamos a expandir, no hay problema porque crece hacia abajo
        showAll.value = true
        return
    }

    // Si vamos a contraer ("Ver menos"), guardamos la posición del botón
    const btn = toggleBtn.value
    if (!btn) return

    // 1. Dónde está el botón ahora mismo respecto a la pantalla
    const oldTop = btn.getBoundingClientRect().top

    // 2. Cambiamos el estado para que desaparezcan las tarjetas
    showAll.value = false

    // 3. Esperamos un microsegundo a que Vue actualice el DOM visualmente
    await nextTick()

    // 4. Dónde ha acabado el botón tras el colapso
    const newTop = btn.getBoundingClientRect().top

    // 5. Ajustamos la cámara (scroll) para que el botón se quede en el mismo sitio
    const html = document.documentElement
    html.style.scrollBehavior = 'auto' // Apagamos el scroll suave un instante
    
    window.scrollBy(0, newTop - oldTop)
    
    html.style.scrollBehavior = '' // Lo volvemos a encender
}
</script>

<style scoped>
/* Animación del modal */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>