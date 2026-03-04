<template>
    <section class="min-h-screen theme-base section-container transition-colors duration-300">
        <div>
        <h2 class="section-title">
            Mis Ilustraciones
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <button
            v-for="cat in illustrationCategories"
            :key="cat.id"
            type="button"
            @click="openGallery(cat)"
            class="group relative aspect-square bg-background rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 hover:scale-[1.02] text-left
                    w-full max-w-[320px] sm:max-w-none mx-auto"
            >
            <img
                v-if="cat.images?.[0]"
                :src="imgUrl(cat, cat.images[0])"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                :alt="cat.title"
                loading="lazy"
            />

            <div
                class="absolute inset-0 flex items-center justify-center bg-foreground/85 group-hover:bg-foreground/20 transition-all duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-none"
            >
                <span
                class="text-background font-bold text-xl uppercase tracking-widest transition-opacity group-hover:opacity-0 px-4 text-center"
                >
                {{ cat.title }}
                </span>
            </div>
            </button>
        </div>
        </div>

        <Transition name="fade">
        <div
            v-if="isOpen"
            class="modal-overlay"
            role="dialog"
            @click="closeGallery"
        >
            <Button
            variant="ghost"
            size="icon"
            class="absolute top-6 right-6 text-foreground/70 hover:text-foreground z-50 rounded-full h-12 w-12"
            @click="closeGallery"
            >
            <X class="h-8 w-8" />
            </Button>

            <Button
            v-if="hasMany"
            variant="outline"
            size="icon"
            class="absolute left-4 md:left-10 bg-background/50 border-primary/20 hover:bg-primary hover:text-primary-foreground hidden sm:flex h-14 w-14 rounded-full"
            @click.stop="prev"
            >
            <ChevronLeft class="h-10 w-10" />
            </Button>

            <div
            class="relative max-w-5xl w-full h-full flex flex-col items-center justify-center p-4"
            @click.stop
            >
            <div class="relative group">
                <img
                v-if="currentImageUrl"
                :key="currentIndex"
                :src="currentImageUrl"
                class="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-lg border border-border/50 animate-in fade-in zoom-in-95 duration-300"
                :alt="selectedImageAlt"
                />
            </div>

            <div class="mt-8 px-6 py-2 bg-muted/50 backdrop-blur-sm rounded-full border border-border">
                <p class="text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
                <span class="text-background font-bold">{{ selectedCat?.title }}</span>
                <span class="mx-3 opacity-30 text-foreground">|</span>
                <span class="text-foreground">
                    {{ currentIndex + 1 }} / {{ selectedCat?.images?.length ?? 0 }}
                </span>
                </p>
            </div>
            </div>

            <Button
            v-if="hasMany"
            variant="outline"
            size="icon"
            class="absolute right-4 md:right-10 bg-background/50 border-primary/20 hover:bg-primary hover:text-primary-foreground hidden sm:flex h-14 w-14 rounded-full"
            @click.stop="next"
            >
            <ChevronRight class="h-10 w-10" />
            </Button>
        </div>
        </Transition>
    </section>
</template>

<script setup lang="ts">
import { X, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { illustrationCategories } from "@/pages/03_illustrations/illustrations.data";
import { Button } from "@/components/ui/button";
import { useGallery } from "@/pages/03_illustrations/useGallery";

const {
    isOpen,
    selectedCat,
    currentIndex,
    currentImageUrl,
    selectedImageAlt,
    hasMany,
    openGallery,
    closeGallery,
    next,
    prev,
    imgUrl
} = useGallery();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>