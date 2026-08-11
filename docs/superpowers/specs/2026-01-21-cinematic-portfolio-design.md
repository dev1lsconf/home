# Spec — Portafolio cinematográfico 3D de Eric Batista

Fecha: 2026-01-21
Estado: Aprobado por el usuario (diseño + estrategia de resiliencia 3D)

## 1. Concepto

Experiencia de scroll cinematográfica y continua. El usuario controla una "película
interactiva" que narra cómo viaja la información por Internet:

```
SERVIDOR → CABLES → RED → DATOS → DISPOSITIVOS → LAPTOP → PORTAFOLIO
```

La experiencia comienza dentro de una sala de servidores y termina frente a una
laptop que muestra el perfil profesional. Un solo `<Canvas>` fijo en fullscreen
detrás del contenido; encima, overlays de HTML semántico con el contenido real.

## 2. Stack

- Next.js 15 (App Router) + React 19 + TypeScript estricto
- Tailwind CSS 4
- Three.js + @react-three/fiber 9 + @react-three/drei
- GSAP + ScrollTrigger (progreso global de scroll 0..1)
- Zustand (estado: sección activa, preset de calidad, reduced-motion)

## 3. Estructura de proyecto

```
eric-portfolio/
├── app/
│   ├── layout.tsx            # fuentes, metadatos, dark base
│   ├── page.tsx              # contenedor de scroll + escenas
│   ├── globals.css           # tokens de diseño, reduced-motion
│   └── api/contact/route.ts  # endpoint stub del formulario
├── components/
│   ├── scene/
│   │   ├── SceneCanvas.tsx   # Canvas con DPR adaptativo, frameloop por preset
│   │   ├── CameraRig.tsx     # cámara 100% controlada por keyframes de scroll
│   │   ├── ServerRoom.tsx    # racks, LEDs, fans, cables (instanced meshes)
│   │   ├── DataCables.tsx    # tubos curvos + partículas viajeras
│   │   ├── NetworkGraph.tsx  # nodos SERVER/DB/API/CLOUD/CLIENT
│   │   └── Laptop.tsx        # laptop con pantalla emisiva (portal a contenido)
│   ├── ui/
│   │   ├── ProgressRail.tsx  # barra 01-09, clickeable, accesible (nav landmark)
│   │   ├── Menu.tsx          # menú discreto (hamburguesa -> overlay)
│   │   ├── Section.tsx       # contenedor semántico por sección
│   │   ├── ProjectCard.tsx · ServiceItem.tsx · MethodStep.tsx
│   │   └── ContactForm.tsx   # validación client + fetch a /api/contact
│   └── fx/                   # partículas, bloom selectivo (postprocessing)
├── lib/
│   ├── content.ts            # TODOS los datos (proyectos, servicios, bio...)
│   ├── scroll-timeline.ts    # keyframes de cámara + rangos por sección
│   └── quality.ts            # detección de GPU/móvil -> preset de calidad
└── hooks/
    ├── useScrollProgress.ts  # GSAP ScrollTrigger -> progress 0..1
    └── useReducedMotion.ts
```

## 4. Flujo de datos

1. GSAP ScrollTrigger sobre contenedor de ~900vh produce `progress` global 0→1.
2. `CameraRig` interpola posición/rotación/fov de cámara entre keyframes
   definidos por escena (mismo archivo de timeline que los overlays — fuente única).
3. Zustand expone la sección activa a los overlays UI (ProgressRail, Menu).
4. El canvas es fijo; las secciones HTML son overlays con `pointer-events`
   controlados. El contenido es accesible y SEO-amigable aunque el 3D falle.

## 5. Escenas y secciones de contenido

| #  | Sección       | Cámara                                                | Contenido overlay |
|----|---------------|-------------------------------------------------------|-------------------|
| 00 | Intro         | Dentro del datacenter, plano general de racks + LEDs  | "ERIC BATISTA · Developer · Web · AI · Infrastructure / Scroll to explore" |
| 01 | Servidor      | Acercamiento a un servidor que se ilumina             | HUD: REQUEST RECEIVED / PROCESSING DATA / STATUS: ONLINE; partículas salen del servidor |
| 02 | Cables        | Sigue las partículas y entra "dentro" de los cables   | Etiquetas flotantes: HTTP, HTTPS, TCP/IP, DNS, IPv6, API, DATABASE, CLOUD (pocas, sin saturar) |
| 03 | Red           | Sale de los cables, revela grafo de nodos conectados  | Nodos SERVER/DATABASE/API/CLOUD/CLIENT con paquetes viajando |
| 04 | Tecnologías   | La red se transforma en interfaz tecnológica          | FRONTEND/BACKEND/DATABASE/AI/DEVOPS/LINUX/NETWORKING/CLOUD/SECURITY con tecnologías del content.ts; microanimación al hover |
| 05 | Servicios     | Los datos convergen hacia un dispositivo              | "WHAT I BUILD" + 6 servicios, aparición vinculada al scroll |
| 06 | Experiencia   | Llegada frente a la laptop, pantalla se enciende      | "ABOUT ME · ERIC BATISTA · Freelance Developer based in Barcelona" + bio |
| 07 | Proyectos     | Desde la pantalla se despliegan tarjetas flotantes    | 4 proyectos reales: Batista Doleo y Asociados, twtxt timeline, 0880 Headquarters, Mr. Robot Store |
| 08 | Metodología   | Plano medio sobre la laptop                           | "HOW I WORK" — Descubrimiento / Arquitectura / Construcción / Entrega & Grow (sustituye testimonios por decisión del usuario) |
| 09 | Contacto      | Alejamiento de la laptop, red de fondo, datos convergen | "LET'S BUILD SOMETHING" + botones (Contact/GitHub/LinkedIn/CV) + formulario |
| 10 | Final         | Laptop encendida, cables con partículas               | Marca + eslogan + © 2026 Eric Batista |

## 6. Contenido real (lib/content.ts)

- Nombre: Eric Batista — Full Stack Developer freelance & Especialista Next.js — Barcelona
- Eslogan: "Diseño y código donde cada píxel importa"
- Bio: especialista en transformar ideas complejas en productos web rápidos,
  accesibles y visualmente impecables.
- Stack: Next.js, React, TypeScript, JavaScript, Tailwind CSS · Node.js, Python,
  FastAPI, PHP · Docker, Linux (NixOS, OpenBSD), CI/CD · SQL/NoSQL
- Servicios: Web Apps (SSG/SSR/ISR), UI/UX Engineering, DevOps & Linux,
  Backend Development, AI Integration (Gemini/OpenAI), Performance & SEO
- Proyectos (sin URL por ahora -> badge "Case study: a petición"):
  - Batista Doleo y Asociados — legal, Lighthouse 98, 99.9% uptime (React, CSS)
  - twtxt timeline — red social descentralizada serverless (JavaScript vanilla)
  - 0880 Headquarters — dashboard financiero en tiempo real, 149+ activos (Python, FastAPI, Docker)
  - Mr. Robot Store — e-commerce cyberpunk (PHP, almacenamiento JSON)
- Metodología: 01 Descubrimiento / 02 Arquitectura / 03 Construcción / 04 Entrega & Grow
- Contacto: ericbatista@gmail.com · https://ericbatista.vercel.app/
  · github.com/dev1lsconf · linkedin.com/in/eric-batista-6978b0118
- CV: botón mailto con asunto "Solicitud de CV" (hasta que exista PDF)

## 7. Resiliencia del 3D — "el 3D no debe fallar" (requisito explícito)

### 7.1 Detección temprana (antes de montar la escena)
`lib/quality.ts` clasifica en `HIGH | MEDIUM | LOW | FALLBACK` según:
soporte WebGL2/1 (test real de `canvas.getContext` antes de hidratar el Canvas),
`deviceMemory`, `hardwareConcurrency`, UA móvil y `prefers-reduced-motion`.
Sobreescribible con `?q=low|medium|high` para testing.

### 7.2 Presets de calidad

|                 | HIGH (desktop GPU)      | MEDIUM (laptop iGPU) | LOW (móvil)                        |
|-----------------|-------------------------|----------------------|------------------------------------|
| Pixel ratio     | hasta 2                 | hasta 1.5            | 1                                  |
| Partículas      | 3000                    | 1000                 | 300                                |
| Bloom/postFX    | sí                      | selectivo            | no (emisivos + color grading falso)|
| Sombras         | PCF soft                | básicas              | no (luces horneadas en materiales) |
| Racks/cables    | geometría completa      | instanced            | instanced + menos unidades         |
| frameloop       | always                  | always               | demand (render solo al animar)     |

### 7.3 Degradación en tiempo real
Monitor de FPS los primeros segundos: si sostenidamente < 30fps, baja
automáticamente un nivel de preset. Aviso en consola, nunca en UI.

### 7.4 Red de seguridad (solo si WebGL no existe o crashea)
ErrorBoundary alrededor del Canvas + fallo en `onCreated` -> "modo
cinematográfico 2D": mismas secciones, mismos textos y transiciones de scroll,
con capas de gradientes radiales, líneas SVG animadas (cables con "datos"
viajando vía CSS/SMIL) y rayado sutil de fondo. Debe parecer decisión de
diseño, no un error.

### 7.5 Contenido siempre primero
Todo el texto vive en HTML semántico real montado desde el primer paint;
nada de contenido crítico depende del canvas (SEO y lectores de pantalla intactos).

### 7.6 prefers-reduced-motion
Convierte el recorrido en secciones con fade simple, sin viaje de cámara.
Narrativa intacta, cero mareo. `useReducedMotion.ts` centraliza la lógica.

### 7.7 Robustez de ejecución
- `dispose()` de geometrías/materiales/texturas al desmontar escenas
- Instanced meshes para racks/LEDs (1 draw call por tipo)
- Texturas generadas proceduralmente (cero requests de assets = cero fallos de red)
- `<Suspense>` con loader propio con progreso real

## 8. Rendimiento

Objetivo 60 FPS en desktop; degradación con gracia en móvil.
- Lazy loading + dynamic imports (escenas 3D con `next/dynamic`)
- Code splitting por escena pesada
- Evitar re-renders: estado de scroll fuera de React (refs + useFrame),
  Zustand solo para sección activa
- Reducción de resolución del renderer en móvil
- Sin memory leaks: dispose correcto de recursos Three.js

## 9. UX

- ProgressRail lateral con 9 paradas (clickeables, salto con scroll suave):
  01 SERVER · 02 NETWORK · 03 DATA · 04 SKILLS · 05 SERVICES · 06 EXPERIENCE
  · 07 PROJECTS · 08 METHOD · 09 CONTACT
- Menú discreto (hamburguesa) con navegación por secciones + enlaces sociales
- No romper la experiencia cinematográfica: UI mínima, mono-espaciada, opacidad ~
  que no compite con la escena

## 10. Accesibilidad

- HTML semántico (header/main/section/nav/footer, h1 único)
- Navegación por teclado completa (secciones focuseables, skip-to-content)
- Focus states visibles (anillo cian)
- Contraste AA sobre fondo oscuro
- aria-labels en controles no textuales; progress rail como `<nav>` con `aria-current`
- alt text en previews de proyectos
- prefers-reduced-motion soportado
- Fallback 2D completo sin WebGL

## 11. Responsive

- Tipografía fluida con `clamp()` en todos los tamaños
- Layout pensado mobile-first; la experiencia 3D se adapta (posiciones de cámara,
  densidad de partículas, geometría simplificada) — no es solo "desktop encogido"
- Portrait y landscape soportados
- Preset LOW garantiza usabilidad en hardware limitado

## 12. Estilo visual

- Paleta: negro, gris muy oscuro, blanco, azul eléctrico/cian, acentos violetas puntuales
- Tipografía: sans geométrica (display) + mono (etiquetas técnicas/HUD)
- Iluminación volumétrica simulada, reflejos sutiles, bloom moderado (HIGH)
- Sin: gradientes excesivos, SaaS genérico, glassmorphism excesivo, cards sin
  relación con la historia, aspecto de plantilla o de videojuego

## 13. Formulario de contacto

- Validación completa en cliente (nombre, email, mensaje; estados de error/success)
- POST a `/api/contact` (stub): valida payload y devuelve 200; preparado para
  conectar Resend/Formspree/endpoint propio sin tocar el frontend
- Accesible: labels asociados, errores anunciados con `aria-live`

## 14. Criterios de aceptación

1. `npm run dev` arranca y la experiencia de scroll funciona de punta a punta
2. Las 10 escenas están conectadas con transiciones continuas de cámara
3. En móvil (preset LOW) la narrativa se mantiene y es usable
4. Sin WebGL (simulado desactivándolo) el fallback 2D muestra todo el contenido
5. `prefers-reduced-motion` elimina el viaje de cámara
6. El formulario valida y "envía" (stub 200) con estados accesibles
7. ProgressRail y menú permiten saltar entre secciones
8. Lighthouse: contenido accesible sin JS-WebGL, contraste AA
