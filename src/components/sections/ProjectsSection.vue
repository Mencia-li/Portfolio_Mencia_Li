<script setup lang="ts">
import { useProjects } from "@/composables/useProjects"

const { visibleProjects, showAll, goToProject, allProjects } = useProjects()
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
                    @click="goToProject(project.id)"
                    class="bg-background text-foreground p-4 md:p-6 rounded-lg shadow-md hover:scale-105 transition-all cursor-pointer group w-full max-w-[320px] sm:max-w-none mx-auto"
                >
                    <div class="aspect-square bg-foreground mb-4 rounded-md transition-colors duration-300 overflow-hidden">
                        </div>
                    
                    <h3 class="text-xl font-semibold mb-2">
                        {{ project.title }}
                    </h3>
                    <p class="text-sm opacity-90 leading-snug">
                        {{ project.description }}
                    </p>
                </div>
            </div>

            <div v-if="allProjects.length > 6" class="text-center mt-12">
                <button
                    @click="showAll = !showAll"
                    class="bg-background text-foreground px-6 py-3 rounded-md hover:opacity-80 transition-all cursor-pointer font-bold active:scale-95 shadow-lg"
                >
                    {{ showAll ? 'Ver menos' : 'Ver más' }}
                </button>
            </div>
        </div>
    </section>
</template>