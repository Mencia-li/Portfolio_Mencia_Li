<template>
    <section class="min-h-screen theme-base pt-20 transition-colors duration-300">
        <div v-if="project" class="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div class="max-w-5xl mx-auto px-6 space-y-16">
            <div class="space-y-6">
            <button
                @click="goBack"
                class="theme-invert btn-ghost text-sm font-bold uppercase tracking-widest transition-opacity flex items-center gap-2 cursor-pointer mb-8"
            >
                ← Volver a proyectos
            </button>

            <div class="space-y-2">
                <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                {{ project.title }}
                </h1>
                <p v-if="project.subtitle" class="text-2xl md:text-3xl font-light italic opacity-80">
                {{ project.subtitle }}
                </p>
            </div>
            </div>

            <div
            class="aspect-video bg-foreground rounded-2xl shadow-2xl transition-colors duration-300 overflow-hidden border border-foreground/10"
            >
            <img
                :src="`/img/projects/${project.folder}/${project.cover}`"
                :alt="project.title"
                class="w-full h-full object-cover"
            />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div class="lg:col-span-2 space-y-16">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-4">
                    <h2 class="text-xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">
                    Contexto
                    </h2>
                    <p class="text-lg leading-relaxed opacity-90">{{ project.contexto }}</p>
                </div>
                <div class="space-y-4">
                    <h2 class="text-xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">
                    Objetivo
                    </h2>
                    <p class="text-lg leading-relaxed opacity-90">{{ project.objetivo }}</p>
                </div>
                </div>

                <div class="space-y-4 bg-foreground/5 p-8 rounded-2xl border border-foreground/10">
                <h2 class="text-2xl font-bold uppercase tracking-tight">El Proceso</h2>
                <p class="text-lg leading-relaxed text-justify opacity-90">{{ project.proceso }}</p>
                </div>

                <div class="space-y-4">
                <h2 class="text-2xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">
                    Resultado Final
                </h2>
                <p class="text-lg leading-relaxed opacity-90">{{ project.resultado }}</p>
                </div>

                <div class="space-y-8 pt-8">
                <h2 class="text-2xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">
                    Exploración Visual
                </h2>
                <div class="columns-1 sm:columns-2 gap-4 space-y-4">
                    <button
                    v-for="(img, idx) in project.images"
                    :key="idx"
                    @click="openGallery(idx)"
                    class="break-inside-avoid group cursor-pointer w-full text-left"
                    >
                    <img
                        :src="`/img/projects/${project.folder}/${img}`"
                        class="w-full rounded-xl shadow-md border border-foreground/5 group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                    />
                    </button>
                </div>
                </div>
            </div>

            <aside class="space-y-10 lg:sticky lg:top-32 h-fit pb-10">
                <div class="space-y-1">
                <h4 class="text-xs font-bold uppercase tracking-widest opacity-50">Categoría</h4>
                <p class="font-bold text-xl">Diseño & Tecnologías Creativas</p>
                </div>

                <div class="space-y-3">
                <h4 class="text-xs font-bold uppercase tracking-widest opacity-50">Herramientas</h4>
                <div class="flex flex-wrap gap-2">
                    <span
                    v-for="tool in project.herramientas"
                    :key="tool"
                    class="theme-invert px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter"
                    >
                    {{ tool }}
                    </span>
                </div>
                </div>

                <div class="space-y-1">
                <h4 class="text-xs font-bold uppercase tracking-widest opacity-50">Año</h4>
                <p class="font-bold text-xl">2024 - 2025</p>
                </div>
            </aside>
            </div>
        </div>

        <div class="mt-20 theme-invert py-24 text-center transition-colors duration-300">
            <div class="max-w-5xl mx-auto px-6">
            <button
                @click="goBack"
                class="theme-base px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-2xl border border-background/20"
            >
                Volver a la galería
            </button>
            </div>
        </div>
        </div>

        <div v-else class="text-center space-y-6 py-40">
        <h1 class="text-4xl font-black uppercase">Proyecto no encontrado</h1>
        <button @click="goBack" class="underline font-bold cursor-pointer">Volver al inicio</button>
        </div>

        <ModalCarousel
            :is-open="isOpen"
            :images="images"
            :initial-index="initialIndex"
            :title="title"
            @close="closeLightbox"
        />
    </section>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useProjects } from "@/pages/02_projects/useProjects"
import ModalCarousel from "@/components/layout/ModalCarousel.vue"
import { useLightbox } from "@/composables/useLightbox"

const route = useRoute()
const { getProjectById, goBack } = useProjects()
const { isOpen, images, initialIndex, title, openLightbox, closeLightbox } = useLightbox()

const project = computed(() => getProjectById(route.params.id as string))

const openGallery = (index: number) => {
    if (!project.value) return;

    // Mapeamos las imágenes del proyecto al formato estandarizado { url, alt }
    const formattedImages = project.value.images.map(img => ({
        url: `/img/projects/${project.value!.folder}/${img}`,
        alt: project.value!.title
    }));
    
    // Abrimos el Lightbox en la imagen exacta que el usuario clicó
    openLightbox(formattedImages, index, project.value.title);
}
</script>

<style scoped>
.animate-in {
    animation-fill-mode: forwards;
}
</style>