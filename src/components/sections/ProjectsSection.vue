<script setup lang="ts">
import { X, ArrowRight } from "lucide-vue-next"
import { useProjects } from "@/composables/useProjects"
import { Button } from "@/components/ui/button"

// Extraemos las nuevas funciones y estados del composable
const { 
    visibleProjects, 
    showAll, 
    allProjects, 
    selectedProject, 
    openPreview, 
    closePreview, 
    goToProject 
} = useProjects()
</script>

<template>
    <section class="min-h-screen bg-foreground text-background px-6 py-20 transition-colors duration-300">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center uppercase tracking-widest">
                Mis Proyectos
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <div
                    v-for="project in visibleProjects"
                    :key="project.id"
                    @click="openPreview(project)"
                    class="bg-background text-foreground p-4 md:p-6 rounded-lg shadow-md hover:scale-105 transition-all cursor-pointer group w-full max-w-[320px] sm:max-w-none mx-auto"
                >
                    <div class="aspect-square bg-foreground mb-4 rounded-md transition-colors duration-300 overflow-hidden relative">
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-primary/10 transition-opacity duration-300">
                            <span class="bg-background text-foreground px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter">
                                Vista rápida
                            </span>
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

            <div v-if="allProjects.length > 6" class="text-center mt-12">
                <button
                    @click="showAll = !showAll"
                    class="bg-background text-foreground px-6 py-3 rounded-md hover:opacity-80 transition-all cursor-pointer font-bold active:scale-95 shadow-lg"
                >
                    {{ showAll ? 'Ver menos' : 'Ver todos los proyectos' }}
                </button>
            </div>
        </div>

        <Transition name="fade">
            <div 
                v-if="selectedProject" 
                class="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
                @click="closePreview"
            >
                <div 
                    class="bg-foreground text-background max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative"
                    @click.stop
                >
                    <button 
                        @click="closePreview" 
                        class="absolute top-4 right-4 p-2 hover:bg-background/10 rounded-full transition-colors cursor-pointer"
                    >
                        <X class="w-6 h-6" />
                    </button>

                    <div class="p-8 space-y-6">
                        <div class="aspect-video bg-background/20 rounded-lg flex items-center justify-center">
                            <span class="opacity-30 uppercase tracking-widest font-bold">Imagen del Proyecto</span>
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
                                class="bg-background text-foreground gap-2 font-bold px-8 py-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
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