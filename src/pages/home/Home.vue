<template>
    <main>
        <section id="home">
        <HeroSection />
        </section>

        <section id="proyectos">
        <ProjectsSection />
        </section>

        <section id="ilustraciones">
        <IllustrationsSection />
        </section>

        <section id="contacto">
        <ContactSection />
        </section>
    </main>
</template>

<script setup lang="ts">
import HeroSection from "@/components/sections/HeroSection.vue"
import ProjectsSection from "@/components/sections/ProjectsSection.vue"
import IllustrationsSection from "@/components/sections/IllustrationsSection.vue"
import ContactSection from "@/components/sections/ContactSection.vue"
</script>