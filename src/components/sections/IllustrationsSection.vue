<template>
    <section class="min-h-screen bg-background text-foreground px-6 py-20 transition-colors duration-300">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center uppercase tracking-widest">
                Mis Ilustraciones
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <div
                    v-for="illustration in illustrations"
                    :key="illustration.id"
                    class="aspect-square bg-foreground rounded-md shadow-md transition-all duration-300 hover:scale-105 transform cursor-pointer w-full max-w-[320px] sm:max-w-none mx-auto"
                >
                    </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue"

/**
 * Interfaz para definir la estructura de una ilustración
 */
interface Illustration {
    id: number
}

// Datos embebidos para generar los placeholders
const illustrations = ref<Illustration[]>(
    Array.from({ length: 6 }, (_, i) => ({ id: i + 1 }))
)
</script>