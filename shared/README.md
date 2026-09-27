# Nexa Design Lab · Shared Resources

Este directorio centraliza los recursos canónicos compartidos a través de los tres espacios del Design Lab monorepo:
1. **Web Style** (`web-style`): Angular 22 + `nexa-ui` (Portal & Plataforma de escritorio).
2. **Mobile Style** (`mobile-style`): Astro + Jetpack Compose & Flutter specs (Operaciones y Conductor).
3. **Website Style** (`website-style`): Astro + Motor Gráfico Vivo Nexafy y Landing interactiva.

---

## Estructura de `shared/`

```
shared/
├── tokens/                         # Design Tokens canónicos (W3C Format)
│   ├── primitive.tokens.json       # Paleta base (azul 50–950, pizarra, escalas de espacio y radio)
│   ├── semantic.tokens.json        # Roles semánticos (superficies, texto, estados, bordes)
│   ├── component.tokens.json       # Geometría de controles y componentes reutilizables
│   ├── data-visualization.tokens.json # Series categóricas, secuencias y gráficos operativos
│   ├── icons.tokens.json           # Catálogo validado de PrimeIcons
│   └── README.md                   # Guía de tokens de diseño
└── brand/                          # Activos de marca oficiales
    ├── logo-nexa.svg               # Isotipo y logotipo vectorial oficial Nexa
    └── Documento.svg               # Símbolo vectorial secundario
```

---

## Flujo de Sincronización

- **Tokens**: Los archivos JSON en `shared/tokens/` representan la única fuente de verdad (*single source of truth*).
  * En `web-style`: Se sincronizan e integran en SCSS mediante `npm run validate:tokens`.
  * En `mobile-style`: Se mapean a tokens Compose / Material 3 en `src/styles/mobile-tokens.css` y especificaciones Kotlin.
  * En `website-style`: Se compilan como variables CSS globales en `src/styles/tokens.css`.
- **Marca**: Los activos vectoriales en `shared/brand/` son inmutables y no se redibujan manualmente en CSS ni en texto.
