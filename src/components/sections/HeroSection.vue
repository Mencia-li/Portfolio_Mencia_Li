<template>
    <section class="min-h-screen flex items-center justify-center theme-base">
        <div class="section-container w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div class="flex justify-center">
                <div class="w-72 md:w-96 aspect-square theme-invert rounded-md shadow-lg"></div>
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
import { useNavigation } from "@/composables/useNavigation"
const { goToAbout } = useNavigation()
</script>