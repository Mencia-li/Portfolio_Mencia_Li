<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import { useProjects } from "@/composables/useProjects"
import { X, ChevronLeft, ChevronRight } from "lucide-vue-next"
import { Button } from "@/components/ui/button"

const route = useRoute()
const { getProjectById, goBack } = useProjects()

const project = computed(() => getProjectById(route.params.id as string))

const isOpen = ref(false)
const currentIndex = ref(0)

const openGallery = (index: number) => {
    currentIndex.value = index
    isOpen.value = true
}

const closeGallery = () => {
    isOpen.value = false
}

const hasMany = computed(() => (project.value?.images?.length ?? 0) > 1)

const next = () => {
    const len = project.value?.images?.length ?? 0
    if (!len) return
    currentIndex.value = (currentIndex.value + 1) % len
}

const prev = () => {
    const len = project.value?.images?.length ?? 0
    if (!len) return
    currentIndex.value = (currentIndex.value - 1 + len) % len
}

const currentImageUrl = computed(() => {
    if (!project.value) return ""
    return `/img/projects/${project.value.folder}/${project.value.images[currentIndex.value]}`
})

watch(isOpen, (open) => {
    document.body.style.overflow = open ? "hidden" : "auto"
})

const handleKey = (e: KeyboardEvent) => {
    if (!isOpen.value) return
    if (e.key === "Escape") closeGallery()
    if (e.key === "ArrowRight") next()
    if (e.key === "ArrowLeft") prev()
}

onMounted(() => window.addEventListener("keydown", handleKey))
onUnmounted(() => {
    window.removeEventListener("keydown", handleKey)
    document.body.style.overflow = "auto"
})
</script>

<template>
  <section class="min-h-screen theme-base pt-20 transition-colors duration-300">
    
    <div v-if="project" class="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div class="max-w-5xl mx-auto px-6 space-y-16">
        <div class="space-y-6">
            <button 
            @click="goBack" 
            class="text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2 cursor-pointer mb-8"
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

        <div class="aspect-video bg-foreground rounded-2xl shadow-2xl transition-colors duration-300 overflow-hidden border border-foreground/10">
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
                        <h2 class="text-xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">Contexto</h2>
                        <p class="text-lg leading-relaxed opacity-90">{{ project.contexto }}</p>
                    </div>
                    <div class="space-y-4">
                        <h2 class="text-xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">Objetivo</h2>
                        <p class="text-lg leading-relaxed opacity-90">{{ project.objetivo }}</p>
                    </div>
                </div>

                <div class="space-y-4 bg-foreground/5 p-8 rounded-2xl border border-foreground/10">
                    <h2 class="text-2xl font-bold uppercase tracking-tight">El Proceso</h2>
                    <p class="text-lg leading-relaxed text-justify opacity-90">{{ project.proceso }}</p>
                </div>

                <div class="space-y-4">
                    <h2 class="text-2xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">Resultado Final</h2>
                    <p class="text-lg leading-relaxed opacity-90">{{ project.resultado }}</p>
                </div>

                <div class="space-y-8 pt-8">
                    <h2 class="text-2xl font-bold uppercase tracking-tight border-b border-foreground/10 pb-2">Exploración Visual</h2>
                    <div class="columns-1 sm:columns-2 gap-4 space-y-4">
                        <button 
                            v-for="(img, idx) in project.images" 
                            :key="idx" 
                            @click="openGallery(idx)"
                            class="break-inside-avoid group cursor-pointer w-full text-left"
                        >
                            <img 
                                :src="`/img/projects/${project.folder}/${img}`" 
                                class="w-full rounded-xl shadow-md border border-foreground/5 group-hover:scale-[1.02] transition-transform duration-300"
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
                        <span v-for="tool in project.herramientas" :key="tool" class="theme-invert px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
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

    <Teleport to="body">
      <Transition name="fade">
        <div
            v-if="isOpen && project"
            class="fixed inset-0 z-100 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
            role="dialog"
            @click="closeGallery"
        >
            <Button
                variant="ghost"
                size="icon"
                class="absolute top-6 right-6 text-foreground/70 hover:text-foreground z-50 rounded-full h-12 w-12 cursor-pointer"
                @click="closeGallery"
            >
                <X class="h-8 w-8" />
            </Button>

            <Button
                v-if="hasMany"
                variant="outline"
                size="icon"
                class="absolute left-4 md:left-10 bg-background/50 border-primary/20 hover:bg-primary hover:text-primary-foreground hidden sm:flex h-14 w-14 rounded-full cursor-pointer"
                @click.stop="prev"
            >
                <ChevronLeft class="h-10 w-10" />
            </Button>

            <div class="relative max-w-full max-h-full flex flex-col items-center justify-center" @click.stop>
                <div class="relative group">
                    <img
                        :key="currentIndex"
                        :src="currentImageUrl"
                        class="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-lg border border-border/50 animate-in fade-in zoom-in-95 duration-300"
                        :alt="project.title"
                    />
                </div>

                <div class="mt-6 px-6 py-2 bg-muted/50 backdrop-blur-sm rounded-full border border-border">
                    <p class="text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
                        <span class="text-foreground font-bold">{{ project.title }}</span> 
                        <span class="mx-3 opacity-30 text-foreground">|</span>
                        <span class="text-foreground">
                            {{ currentIndex + 1 }} / {{ project.images.length }}
                        </span>
                    </p>
                </div>
            </div>

            <Button
                v-if="hasMany"
                variant="outline"
                size="icon"
                class="absolute right-4 md:right-10 bg-background/50 border-primary/20 hover:bg-primary hover:text-primary-foreground hidden sm:flex h-14 w-14 rounded-full cursor-pointer"
                @click.stop="next"
            >
                <ChevronRight class="h-10 w-10" />
            </Button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.animate-in {
    animation-fill-mode: forwards;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>