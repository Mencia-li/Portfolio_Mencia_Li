// src/composables/useHeroCarousel.ts
import { computed } from 'vue'

export function useHeroCarousel() {
    // Genera el array de rutas: /img/carrusel/carru1.jpg ... /img/carrusel/carru13.jpg
    const images = computed(() => 
        Array.from({ length: 13 }, (_, i) => `/img/carrusel/carru${i + 1}.jpg`)
    )

    // Configuración básica para que el carrusel sea infinito
    const carouselOptions = {
        loop: true,
    }

    return {
        images,
        carouselOptions
    }
}