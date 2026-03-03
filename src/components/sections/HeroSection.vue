<template>
    <section class="min-h-screen flex items-center justify-center theme-base">
        <div class="section-container w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div class="flex justify-start order-1 md:order-1">
                <div class="w-full aspect-square theme-invert rounded-md shadow-2xl overflow-hidden border border-foreground/10">
                    <Carousel 
                        ref="carouselRef"
                        :opts="carouselOptions"
                        class="w-full h-full"
                    >
                        <CarouselContent class="h-full ml-0">
                            <CarouselItem 
                                v-for="(src, index) in images" 
                                :key="index"
                                class="pl-0 h-full" 
                            >
                                <img 
                                    :src="src" 
                                    class="w-full h-full object-cover" 
                                    :alt="`Imagen carrusel ${index + 1}`"
                                    loading="lazy"
                                />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>

            <div class="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 order-2 md:order-2 md:pl-20">
                <h1 class="hero-title text-5xl md:text-7xl">
                    ¡Hola! Soy Mencía
                </h1>

                <div class="space-y-4">
                    <p class="hero-text text-xl">
                        Soy una estudiante de Diseño y Tecnologías Creativas. <br> 
                        Mis intereses abarcan desde lo gráfico y lo ilustrado hasta lo editorial, interactivo y audiovisual.
                    </p>

                    <p class="hero-text text-xl">
                        Disfruto moviéndome entre disciplinas y entendiendo el diseño como un territorio amplio donde creatividad y técnica se complementan.
                    </p>
                </div>

                <div class="w-full flex justify-center md:justify-start pt-4">
                    <button @click="goToAbout" class="theme-invert btn-primary text-lg px-8 py-4">
                        ¡Cuéntame más!
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useNavigation } from "@/composables/useNavigation"
import { useHeroCarousel } from "@/composables/useHeroCarousel"
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem 
} from "@/components/ui/carousel"

const { goToAbout } = useNavigation()
const { images, carouselOptions } = useHeroCarousel()

// Referencia al componente carrusel para acceder a sus métodos
const carouselRef = ref<any>(null)
let autoPlayInterval: number | null = null

onMounted(() => {
    // Iniciamos el movimiento automático cada 3 segundos
    autoPlayInterval = window.setInterval(() => {
        if (carouselRef.value) {
            carouselRef.value.scrollNext()
        }
    }, 4000) // <--- Velocidad de cambio de imagen (está en milisegundos)
})

onUnmounted(() => {
    // Limpiamos el intervalo al salir de la página para evitar fugas de memoria
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
    }
})
</script>