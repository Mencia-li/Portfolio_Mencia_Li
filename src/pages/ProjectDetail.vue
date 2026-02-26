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
  <section class="min-h-screen bg-background text-foreground flex items-center justify-center px-6 transition-colors duration-300">
    <div v-if="project" class="max-w-3xl text-center">
      <h1 class="text-4xl font-bold mb-6">
        {{ project.title }}
      </h1>

      <p class="mb-4 opacity-90">
        {{ project.description }}
      </p>

      <div class="p-8 bg-foreground text-background rounded-xl shadow-inner">
        <p class="leading-relaxed">
          {{ project.content }}
        </p>
      </div>

      <button 
        @click="goBack" 
        class="mt-8 text-sm font-medium hover:underline cursor-pointer"
      >
        ← Volver a proyectos
      </button>
    </div>

    <div v-else class="text-center">
      <h1 class="text-3xl font-bold">
        Proyecto no encontrado
      </h1>
    </div>
  </section>
</template>