// src/composables/useLightbox.ts
import { ref } from "vue"

export interface LightboxImage {
    url: string
    alt: string
}

export function useLightbox() {
    const isOpen = ref(false)
    const images = ref<LightboxImage[]>([])
    const initialIndex = ref(0)
    const title = ref("") // <-- Nuevo

    // <-- Añadido el 3er parámetro: galleryTitle
    const openLightbox = (imgList: LightboxImage[], startIndex = 0, galleryTitle = "") => {
        images.value = imgList
        initialIndex.value = startIndex
        title.value = galleryTitle // <-- Guardamos el título
        isOpen.value = true
        document.body.style.overflow = "hidden"
    }

    const closeLightbox = () => {
        isOpen.value = false
        document.body.style.overflow = "auto"
        setTimeout(() => { images.value = [] }, 300)
    }

    return {
        isOpen,
        images,
        initialIndex,
        title, // <-- Exportamos el título
        openLightbox,
        closeLightbox
    }
}