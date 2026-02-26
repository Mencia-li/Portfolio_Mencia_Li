export interface Project {
    id: number
    title: string
    description: string
    content: string
    folder: string
    cover: string
    images: string[]
}

export const projects: Project[] = [
    { 
        id: 1, 
        title: "Ilustración Narrativa", 
        description: "Exploración visual a través de historias contadas mediante el dibujo.", 
        content: "Este proyecto se centra en la capacidad de la imagen para narrar sin necesidad de palabras...", 
        folder: "1. Ilustracion narrativa",
        cover: "ilustracionNarrativa1.jpg",
        images: Array.from({ length: 6 }, (_, i) => `ilustracionNarrativa${i + 1}.jpg`)
    },
    { 
        id: 2, 
        title: "Juego Interactivo", 
        description: "Diseño de interfaz y experiencia de usuario en entornos digitales.", 
        content: "Desarrollo de un sistema visual coherente para un prototipo de juego interactivo...", 
        folder: "2. Juego interactivo",
        cover: "juegoInteractivo1.jpg",
        images: Array.from({ length: 21 }, (_, i) => `juegoInteractivo${i + 1}.jpg`)
    },
    { 
        id: 3, 
        title: "Juego de Mesa", 
        description: "Creación de componentes y diseño editorial para juegos tradicionales.", 
        content: "Diseño integral de cartas, tablero y manual siguiendo una estética unificada...", 
        folder: "3. Juego de mesa",
        cover: "juegoMesa1.jpg",
        images: Array.from({ length: 22 }, (_, i) => `juegoMesa${i + 1}.jpg`)
    },
    { 
        id: 4, 
        title: "36 Days of Type", 
        description: "Reto de experimentación tipográfica y creatividad visual.", 
        content: "Una serie de letras diseñadas bajo diferentes conceptos visuales y técnicas gráficas...", 
        folder: "4. 36 days of type",
        cover: "tipografia1.jpg",
        images: ["tipografia1.jpg", "tipografia2.jpg", "tipografia3.jpg"]
    },
    { 
        id: 5, 
        title: "Kaoka", 
        description: "Branding y diseño de identidad para marcas sostenibles.", 
        content: "Proyecto de identidad visual enfocado en la naturaleza y la simplicidad orgánica...", 
        folder: "5. Kaoka",
        cover: "kaoka1.jpg",
        images: Array.from({ length: 8 }, (_, i) => `kaoka${i + 1}.jpg`)
    },
{ 
        id: 6, 
        title: "Campaña Publicitaria", 
        description: "Campaña de comunicación integral.", 
        content: "Descripción del proceso de creación de la campaña...", 
        folder: "6. Campanya publicitaria",
        cover: "campanya1.jpg",
        images: Array.from({ length: 14 }, (_, i) => `campanya${i + 1}.jpg`)
    },
    { 
        id: 7, 
        title: "Revista", 
        description: "Maquetación y diseño editorial para publicaciones impresas.", 
        content: "Diseño de artículos y retículas para una revista de diseño y tecnología...", 
        folder: "7. Revista",
        cover: "articulo1.jpg",
        images: Array.from({ length: 5 }, (_, i) => `articulo${i + 1}.jpg`)
    },
    { 
        id: 8, 
        title: "Carteles", 
        description: "Diseño de gran formato enfocado en la síntesis y el impacto visual.", 
        content: "Serie de carteles para eventos culturales utilizando diversas técnicas de ilustración...", 
        folder: "8. Carteles",
        cover: "cartel1.jpg",
        images: Array.from({ length: 5 }, (_, i) => `cartel${i + 1}.jpg`)
    },
    { 
        id: 9, 
        title: "Fotografía", 
        description: "Composición fotográfica y edición digital creativa.", 
        content: "Selección de fotografías de estudio y exteriores con un enfoque en la dirección de arte...", 
        folder: "9. Fotografia",
        cover: "fotografia1.jpg",
        images: Array.from({ length: 6 }, (_, i) => `fotografia${i + 1}.jpg`)
    }
]