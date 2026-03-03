<template>
    <section class="min-h-screen flex items-center justify-center theme-base">
        <div class="section-container w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div class="flex justify-center">
                <div class="w-72 md:w-96 aspect-square theme-invert rounded-md shadow-lg overflow-hidden border border-foreground/10">
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

            <div class="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6">
                <h1 class="hero-title">
                    ¡Hola! Soy Mencía
                </h1>

                <p class="hero-text">
                    Soy una estudiante de Diseño y Tecnologías Creativas. <br> 
                    Mis intereses abarcan desde lo gráfico y lo ilustrado hasta lo editorial, interactivo y audiovisual.
                </p>

                <p class="hero-text">
                    Disfruto moviéndome entre disciplinas y entendiendo el diseño como un territorio amplio donde creatividad y técnica se complementan.
                </p>

                <div class="w-full flex justify-center md:justify-start">
                    <button @click="goToAbout" class="theme-invert btn-primary">
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