<template>
    <section
        class="min-h-screen flex items-center justify-center bg-background text-foreground px-6 transition-colors duration-300"
    >
        <div
            class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
            <div class="flex justify-center">
                <div
                    class="w-72 md:w-96 aspect-square bg-foreground rounded-md shadow-lg transition-colors duration-300"
                ></div>
            </div>

            <div class="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6">
                <h1 class="text-4xl md:text-5xl font-bold">
                    ¡Hola! Soy Mencía
                </h1>

                <p class="text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                    Soy una estudiante de Diseño y Tecnologías Creativas. <br> 

                    Mis intereses abarcan desde lo gráfico y lo ilustrado hasta lo editorial, interactivo y audiovisual.
                </p>
                <p class="text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                    Disfruto moviéndome entre disciplinas y entendiendo el diseño como un territorio amplio donde creatividad y técnica se complementan.
                </p>

                <div class="w-full flex justify-center md:justify-start">
                    <button
                        @click="goToAbout"
                        class="bg-foreground text-background px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-all cursor-pointer active:scale-95"
                    >
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