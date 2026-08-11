# Eric Batista — Portfolio cinematográfico 3D

Una experiencia interactiva controlada por scroll. La cámara viaja desde una sala de datacenter oscura (racks de servidores, LEDs parpadeando, ventiladoras), por cables de datos que transportan paquetes, dentro de una red global abstracta, y acaba frente a una laptop cuya pantalla se enciende con el contenido del portafolio. Construido para contar la historia: **idea → código → infraestructura → usuario**.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + TypeScript strict
- **Three.js** + @react-three/fiber + @react-three/drei + @react-three/postprocessing
- **GSAP** ScrollTrigger (el progreso global de scroll dirige la línea temporal de la cámara)
- **Tailwind CSS 4** + tokens CSS propios
- **Zustand** (store externo pequeño para estado de scroll/sección)

## Principios de diseño

- **Un solo canvas 3D fijo** detrás de todo; el contenido vive en overlays HTML semánticos (SSR, accesible, SEO-friendly incluso sin WebGL).
- **Rig de cámara cinematográfico**: línea temporal de 11 keyframes interpolada en `useFrame` con damping exponencial — se siente como una película, no como una página con animaciones de scroll.
- **Presets de calidad** (`high` / `medium` / `low` / `fallback`) detectados automáticamente del dispositivo; un watchdog de FPS degrada si es necesario. Sin WebGL, un fallback cinemático 2D (CSS/SVG) renderiza en su lugar.
- **Reduced motion** soportado: las overlays se apilan estáticamente sin viaje de cámara.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:3000
```

Override de calidad para testear: `?q=low` | `?q=medium` | `?q=high` | `?q=fallback`

## Tests

```bash
npm test         # vitest + jsdom, 21 tests
npm run build    # build de producción
```

---

© 2026 Eric Batista — Developer · Web · AI · Infrastructure
