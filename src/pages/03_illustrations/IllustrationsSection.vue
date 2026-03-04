<template>
    <section class="min-h-screen theme-base section-container transition-colors duration-300">
        <div>
            <h2 class="section-title">Mis Ilustraciones</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <button
                    v-for="cat in visibleCategories"
                    :key="cat.id"
                    type="button"
                    @click="openGallery(cat)"
                    class="group relative aspect-square bg-background rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 hover:scale-[1.02] text-left w-full max-w-[320px] sm:max-w-none mx-auto"
                >
                    <img
                        v-if="cat.images?.[0]"
                        :src="imgUrl(cat, cat.images[0])"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        :alt="cat.title"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 flex items-center justify-center bg-foreground/85 group-hover:bg-foreground/20 transition-all duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-none">
                        <span class="text-background font-bold text-xl uppercase tracking-widest transition-opacity group-hover:opacity-0 px-4 text-center">
                            {{ cat.title }}
                        </span>
                    </div>
                </button>
            </div>

            <div class="text-center mt-12">
                <button
                    @click="showAll = !showAll"
                    class="theme-invert px-6 py-3 rounded-md hover:opacity-80 transition-all cursor-pointer font-bold active:scale-95 shadow-lg"
                >
                    {{ showAll ? 'Ver menos' : 'Ver más ilustraciones' }}
                </button>
            </div>
        </div>

        <ModalCarousel
            :is-open="isOpen"
            :images="images"
            :initial-index="initialIndex"s
            :title="title"
            @close="closeLightbox"
        />
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue' //
import { illustrationCategories } from "@/pages/03_illustrations/illustrations.data"; //
import type { IllustrationCategory, IllustrationImage } from "@/pages/03_illustrations/illustrations.data"; //
import ModalCarousel from "@/components/layout/ModalCarousel.vue"; //
import { useLightbox } from "@/composables/useLightbox"; //

const { isOpen, images, initialIndex, title, openLightbox, closeLightbox } = useLightbox(); //

const showAll = ref(false)
const isMobile = ref(false)

const updateSize = () => { isMobile.value = window.innerWidth < 768 }

onMounted(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
})
onUnmounted(() => window.removeEventListener('resize', updateSize))

// Lógica de visibilidad
const visibleCategories = computed(() => {
    if (showAll.value) return illustrationCategories
    // En móvil mostramos 3, en PC podrías mostrar las 6 o también 3 según pides
    return illustrationCategories.slice(0, 3)
})

const imgUrl = (cat: IllustrationCategory, img: IllustrationImage) => {
    return `/img/illustrations/${cat.folder}/${img.name}.jpg`; //
};

const openGallery = (cat: IllustrationCategory) => {
    const formattedImages = cat.images.map(img => ({
        url: imgUrl(cat, img),
        alt: img.alt || cat.title
    }));
    openLightbox(formattedImages, 0, cat.title); //
};
</script>