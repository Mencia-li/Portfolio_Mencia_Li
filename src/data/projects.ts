export interface Project {
    id: number
    title: string
    description: string
    content: string
    folder: string   // Nombre de la carpeta en public/img/projects/
    cover: string    // Imagen que se verá en la galería principal
    images: string[] // Todas las imágenes para el detalle
}

export const projects: Project[] = [
    { 
        id: 1, 
        title: "Ilustración Narrativa", 
        description: "Exploración visual a través de historias contadas mediante el dibujo.", 
        content: "Este proyecto explora la narrativa visual, utilizando la composición y el color para guiar al espectador a través de una historia...", 
        folder: "1. Ilustracion narrativa",
        cover: "ilustracionNarrativa1_h.jpg",
        images: ["ilustracionNarrativa1_h.jpg", "ilustracionNarrativa2_h.jpg", "ilustracionNarrativa3_h.jpg", "ilustracionNarrativa4_h.jpg", "ilustracionNarrativa5_h.jpg", "ilustracionNarrativa6_v.jpg"]
    },
    { 
        id: 2, 
        title: "Juego Interactivo", 
        description: "Diseño de interfaces y experiencia de usuario para entornos lúdicos.", 
        content: "Desarrollo integral de un entorno interactivo, centrado en la usabilidad y la estética visual coherente...", 
        folder: "2. Juego interactivo",
        cover: "juegoInteractivo1.jpg",
        images: Array.from({ length: 21 }, (_, i) => `juegoInteractivo${i + 1}.jpg`)
    },
    { 
        id: 3, 
        title: "Juego de Mesa", 
        description: "Diseño editorial y de producto aplicado a juegos de mesa tradicionales.", 
        content: "Creación de todos los componentes visuales de un juego de mesa: desde el tablero y las cartas hasta el manual de instrucciones...", 
        folder: "3. Juego de mesa",
        cover: "juegoMesa1_h.jpg",
        images: ["juegoMesa1_h.jpg", "juegoMesa2_h.jpg", "juegoMesa3_h.jpg", "juegoMesa4_h.jpg", "juegoMesa5_h.jpg", "juegoMesa6_h.jpg", "juegoMesa7_v.jpg", "juegoMesa8_v.jpg", "juegoMesa9_v.jpg", "juegoMesa10_v.jpg", "juegoMesa11_v.jpg", "juegoMesa12_v.jpg", "juegoMesa13_v.jpg", "juegoMesa14_v.jpg", "juegoMesa15_v.jpg", "juegoMesa16_v.jpg", "juegoMesa17_v.jpg", "juegoMesa18_h.jpg", "juegoMesa19_h.jpg", "juegoMesa20_h.jpg", "juegoMesa21_h.jpg", "juegoMesa22_h.jpg"]
    },
    { 
        id: 4, 
        title: "36 Days of Type", 
        description: "Reto creativo de diseño tipográfico y experimentación formal.", 
        content: "Una serie de exploraciones tipográficas donde cada letra es una oportunidad para experimentar con nuevas técnicas...", 
        folder: "4. 36 days of type",
        cover: "tipografia1_c.jpg",
        images: ["tipografia1_c.jpg", "tipografia2_c.jpg", "tipografia3_c.jpg"]
    },
    { 
        id: 5, 
        title: "Kaoka", 
        description: "Proyecto de branding y diseño de packaging sostenible.", 
        content: "Diseño de identidad visual para una marca de productos orgánicos, buscando una estética natural y minimalista...", 
        folder: "5. Kaoka",
        cover: "kaoka1_h.jpg",
        images: ["kaoka1_h.jpg", "kaoka2_v.jpg", "kaoka3_v.jpg", "kaoka4_v.jpg", "kaoka5_v.jpg", "kaoka6_v.jpg", "kaoka7_v.jpg", "kaoka8_v.jpg"]
    },
    { 
        id: 7, 
        title: "Revista", 
        description: "Maquetación editorial y dirección de arte para publicaciones impresas.", 
        content: "Diseño de retícula, jerarquía tipográfica y selección de imágenes para un artículo de revista especializado...", 
        folder: "7. Revista",
        cover: "articulo.jpg",
        images: ["articulo.jpg", "articulo1.jpg", "articulo2.jpg", "articulo3.jpg", "articulo4.jpg"]
    },
    { 
        id: 8, 
        title: "Carteles", 
        description: "Diseño gráfico de gran formato para eventos y comunicación visual.", 
        content: "Serie de carteles diseñados para diferentes eventos culturales, enfocados en la síntesis visual y el impacto...", 
        folder: "8. Carteles",
        cover: "cartel1_v.jpg",
        images: ["cartel1_v.jpg", "cartel2_v.jpeg", "cartel3_v.jpg", "cartel4_v.jpg", "cartel5_v.jpg"]
    },
    { 
        id: 9, 
        title: "Fotografía", 
        description: "Composiciones fotográficas y edición digital avanzada.", 
        content: "Una selección de trabajos fotográficos centrados en el retrato, el producto y la edición creativa...", 
        folder: "9. Fotografia",
        cover: "fotografia1.jpg",
        images: ["fotografia1.jpg", "fotografia2.jpg", "fotografia3.jpg", "fotografia4.jpg", "fotografia5.jpg", "fotografia6.jpg"]
    }
]