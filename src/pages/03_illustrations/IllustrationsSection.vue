<template>
    <section class="min-h-screen theme-base section-container transition-colors duration-300">
        <div>
            <h2 class="section-title">Mis Ilustraciones</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pt-8">
                <button
                    v-for="cat in visibleCategories"
                    :key="cat.id"
                    type="button"
                    @click="openGallery(cat)"
                    class="cursor-pointer text-left w-full max-w-[320px] sm:max-w-none mx-auto outline-none"
                >
                    <StackedCards 
                        :images="getFormattedImages(cat)" 
                        :title="cat.title"
                    />
                </button>
            </div>

            <div v-if="shouldShowButton" class="text-center mt-16">
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
            :initial-index="initialIndex"
            :title="title"
            @close="closeLightbox"
        />
    </section>
</template>

<script setup lang="ts">
import { useIllustrations } from "./useIllustrations"
import ModalCarousel from "@/components/layout/ModalCarousel.vue"
// 👇 Importamos desde layout
import StackedCards from "@/components/layout/StackedCards.vue" 
import type { IllustrationCategory } from "./illustrations.data"

const { 
    visibleCategories, 
    shouldShowButton, 
    showAll, 
    imgUrl, 
    openGallery,
    isOpen,
    images,
    initialIndex,
    title,
    closeLightbox
} = useIllustrations()

const getFormattedImages = (cat: IllustrationCategory) => {
    return cat.images.map(img => ({
        url: imgUrl(cat, img),
        alt: img.alt || cat.title
    }));
}
</script>