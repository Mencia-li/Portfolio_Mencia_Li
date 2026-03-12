# Web Portfolio de Mencía Li (Jiayi Li)

Este proyecto es un portfolio web personal e interactivo diseñado para mostrar proyectos de diseño, ilustración y tecnologías creativas. 

## Características principales

- **Navegación completa:** El sitio cuenta con secciones estructuradas para Inicio, Sobre mí, Proyectos, Ilustraciones y Contacto.
- **Temas dinámicos:** Permite a los usuarios cambiar la apariencia de la web alternando entre paletas de colores personalizadas (Matcha, Solar y Lavanda).
- **Reproductor de música:** Incluye un controlador de audio integrado en la cabecera que permite reproducir, pausar, silenciar y cambiar entre diferentes pistas musicales ambientales.
- **Exploración visual interactiva:** Hace uso de carruseles de imágenes y ventanas modales (lightbox) para que los usuarios puedan explorar las galerías y los detalles de cada proyecto de forma cómoda.

## Tecnologías utilizadas

- **Framework principal:** Desarrollado utilizando Vue 3 (Composition API) y TypeScript.
- **Estilos y Diseño:** Maquetado con Tailwind CSS, incorporando un sistema de columnas responsivo que se adapta a dispositivos móviles, tablets y PC.
- **Componentes UI:** Construido utilizando componentes base accesibles provenientes de Reka UI y Radix Vue, con iconos proporcionados por Lucide Vue Next.
- **Enrutamiento:** Gestión de vistas y anclas a través de Vue Router.

## Estructura del proyecto

El código fuente principal se encuentra en la carpeta `src/` y está organizado de la siguiente manera:

```
src/
├── components/                 # COMPONENTES REUTILIZABLES
│   ├── layout/                 # Componentes estructurales (Header, Footer, modales, reproductor)
│   └── ui/                     # Componentes base de interfaz construidos sobre Radix/Reka UI
│
├── composables/                # LÓGICA REUTILIZABLE (COMPOSITION API)
│   ├── useGridColumns.ts       # Sistema responsivo de columnas
│   ├── useLightbox.ts          # Gestión del visor de imágenes (modal carrusel)
│   ├── useMusic.ts             # Lógica del reproductor de música y control de volumen
│   ├── useNavigation.ts        # Control de scroll suave y enrutamiento
│   └── useTheme.ts             # Gestión y persistencia de las paletas de colores
│
├── lib/                        # UTILIDADES
│   └── utils.ts                # Funciones auxiliares (fusión de clases de Tailwind)
│
├── pages/                      # VISTAS DE LA APLICACIÓN
│   ├── 01_home/                # Inicio (Hero) y subpágina "Sobre mí"
│   ├── 02_projects/            # Listado de proyectos, vista de detalle y base de datos local
│   ├── 03_illustrations/       # Galería interactiva de ilustraciones por categorías
│   └── 04_contact/             # Formulario de contacto y mapa
│
├── router/                     # ENRUTAMIENTO
│   └── index.ts                # Configuración de Vue Router y comportamiento del scroll
│
├── App.vue                     # Componente raíz
├── main.ts                     # Punto de entrada de la aplicación
└── style.css                   # Estilos globales y variables CSS de los temas
```

## Comandos principales

- `npm install`: Instala todas las dependencias necesarias que están listadas en `package.json`.

- `npm run dev`: Ejecuta el servidor de desarrollo, permitiendo ver y probar la aplicación en modo interactivo en local.