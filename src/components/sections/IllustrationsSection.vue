<template>
    <section class="min-h-screen bg-background text-foreground px-6 py-20 transition-colors duration-300">
        <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center uppercase tracking-widest">
            Mis Ilustraciones
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <button
            v-for="cat in illustrationCategories"
            :key="cat.id"
            type="button"
            @click="openGallery(cat)"
            class="group relative aspect-square bg-background rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 hover:scale-[1.02] text-left"
            >
            <img
                v-if="cat.images?.[0]"
                :src="imgUrl(cat, cat.images[0])"
                class="w-full h-full object-cover"
                :alt="cat.title"
                loading="lazy"
            />
            
            <div class="absolute inset-0 flex items-center justify-center bg-foreground/85 group-hover:bg-foreground/20 transition-all duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-none">
                <span class="text-background font-bold text-xl uppercase tracking-widest transition-opacity group-hover:opacity-0">
                {{ cat.title }}
                </span>
            </div>
            </button>
        </div>
        </div>

        <Transition name="fade">
        <div
            v-if="isOpen"
            class="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
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

            <div class="relative max-w-5xl w-full h-full flex flex-col items-center justify-center p-4" @click.stop>
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
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { X, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { illustrationCategories, type IllustrationCategory } from "@/data/illustrations";
import { Button } from "@/components/ui/button";

type IllustrationImage = { name: string; alt: string };

const isOpen = ref(false);
const selectedCat = ref<IllustrationCategory | null>(null);
const currentIndex = ref(0);

const imgUrl = (cat: IllustrationCategory, img: IllustrationImage) =>
  `/illustrations/${cat.folder}/${img.name}.jpg`;

const openGallery = (category: IllustrationCategory) => {
  if (!category.images?.length) return;
  selectedCat.value = category;
  currentIndex.value = 0;
  isOpen.value = true;
};

const closeGallery = () => {
  isOpen.value = false;
};

const hasMany = computed(() => (selectedCat.value?.images?.length ?? 0) > 1);

const next = () => {
  const len = selectedCat.value?.images?.length ?? 0;
  if (!len) return;
  currentIndex.value = (currentIndex.value + 1) % len;
};

const prev = () => {
  const len = selectedCat.value?.images?.length ?? 0;
  if (!len) return;
  currentIndex.value = (currentIndex.value - 1 + len) % len;
};

const currentImageUrl = computed(() => {
  const cat = selectedCat.value;
  if (!cat) return "";
  const img = cat.images?.[currentIndex.value];
  if (!img) return "";
  return imgUrl(cat, img);
});

const selectedImageAlt = computed(() => {
  const cat = selectedCat.value;
  const img = cat?.images?.[currentIndex.value];
  return img?.alt || cat?.title || "Ilustración";
});

watch(isOpen, (open) => {
    document.body.style.overflow = open ? "hidden" : "auto";
});

const handleKey = (e: KeyboardEvent) => {
    if (!isOpen.value) return;
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
};

onMounted(() => window.addEventListener("keydown", handleKey));
onUnmounted(() => window.removeEventListener("keydown", handleKey));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    backdrop-filter: blur(0px);
}
</style>