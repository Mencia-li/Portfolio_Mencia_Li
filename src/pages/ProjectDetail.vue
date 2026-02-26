<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useProjects } from "@/composables/useProjects"

const route = useRoute()
const { getProjectById, goBack } = useProjects()

// Obtenemos el proyecto usando la función del composable
const project = computed(() => getProjectById(route.params.id as string))
</script>

<template>
  <section class="min-h-screen bg-background text-foreground py-20 px-6 transition-colors duration-300">
    <div v-if="project" class="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div class="space-y-6">
        <button 
          @click="goBack" 
          class="text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2 cursor-pointer"
        >
          ← Volver a proyectos
        </button>
        
        <h1 class="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          {{ project.title }}
        </h1>
        
        <p class="text-xl md:text-2xl font-medium opacity-80 max-w-2xl leading-relaxed">
          {{ project.description }}
        </p>
      </div>

      <div class="aspect-video bg-foreground rounded-2xl shadow-2xl transition-colors duration-300 flex items-center justify-center overflow-hidden">
        <span class="text-background opacity-20 text-4xl font-bold uppercase tracking-widest">
          Main Project Image
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
        
        <div class="md:col-span-2 space-y-8">
            <div class="space-y-4">
                <h2 class="text-2xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">
                    Sobre el proyecto
                </h2>
                <p class="text-lg leading-relaxed text-justify opacity-90">
                    {{ project.content }}
                </p>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">
                    El Proceso Creativo
                </h2>
                <p class="text-lg leading-relaxed text-justify opacity-90">
                    En esta etapa me centré en la investigación de referentes y en la creación de una paleta cromática que transmitiera los valores del proyecto. El objetivo era lograr un equilibrio entre lo funcional y lo estético, asegurando que cada elemento gráfico tuviera una intención clara.
                </p>
            </div>
        </div>
        
        <aside class="space-y-8 bg-foreground/5 p-8 rounded-2xl border border-foreground/10 h-fit">
            <div class="space-y-1">
                <h4 class="text-xs font-bold uppercase tracking-widest opacity-50">Categoría</h4>
                <p class="font-bold text-lg">Diseño Gráfico / Editorial</p>
            </div>

            <div class="space-y-1">
                <h4 class="text-xs font-bold uppercase tracking-widest opacity-50">Herramientas</h4>
                <ul class="font-bold text-lg">
                    <li>Adobe Illustrator</li>
                    <li>Adobe InDesign</li>
                    <li>Procreate</li>
                </ul>
            </div>

            <div class="space-y-1">
                <h4 class="text-xs font-bold uppercase tracking-widest opacity-50">Fecha</h4>
                <p class="font-bold text-lg">2024</p>
            </div>
        </aside>

      </div>

      <div class="pt-12 border-t border-foreground/10 text-center">
        <button 
            @click="goBack" 
            class="bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
        >
            Volver a la galería
        </button>
      </div>

    </div>

    <div v-else class="text-center space-y-6">
      <h1 class="text-4xl font-black uppercase">Proyecto no encontrado</h1>
      <button @click="goBack" class="underline font-bold">Volver al inicio</button>
    </div>
  </section>
</template>

<style scoped>
/* Transición suave para la entrada de la página */
.animate-in {
    animation-fill-mode: forwards;
}
</style>