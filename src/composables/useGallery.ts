import { ref, computed, watch, onMounted, onUnmounted } from "vue";

// Definimos el tipo para las imágenes e ilustraciones según tus datos
interface IllustrationImage { name: string; alt: string }
interface IllustrationCategory { 
    id: number; 
    title: string; 
    folder: string; 
    images: IllustrationImage[] 
}

export function useGallery() {
    const isOpen = ref(false);
    const selectedCat = ref<IllustrationCategory | null>(null);
    const currentIndex = ref(0);

    // Genera la URL de la imagen (la lógica que tenías en el componente)
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

    // Bloquea el scroll del body cuando la galería está abierta
    watch(isOpen, (open) => {
        document.body.style.overflow = open ? "hidden" : "auto";
    });

    // Control por teclado
    const handleKey = (e: KeyboardEvent) => {
        if (!isOpen.value) return;
        if (e.key === "Escape") closeGallery();
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
    };

    onMounted(() => window.addEventListener("keydown", handleKey));
    onUnmounted(() => window.removeEventListener("keydown", handleKey));

    return {
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
        imgUrl // La exportamos también para las miniaturas del grid
    };
}