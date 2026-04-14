# ToDoListSE — Frontend

Frontend de **ToDoListSE**, una aplicación full-stack de gestión de tareas construida como solución a la prueba técnica de Atom.

Aplicación Angular 17 con NgModules, arquitectura feature-first, Angular Material, Bootstrap (grid), SCSS con tokens de diseño, Transloco para i18n, e iconos FontAwesome SVG. Consume una API REST securizada con JWT y API key, desplegada en Firebase Hosting.

**Producción**: https://todolistsamuelescobar.web.app

## Inicio rápido

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Crear archivo de entorno desde la plantilla
cp .env.example .env
# Editar .env con tus valores de API_KEY y API_BASE_URL

# Iniciar servidor de desarrollo
npm start
# Navegar a http://localhost:4200/
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Genera entorno + `ng serve` en modo desarrollo |
| `npm run build` | Genera entorno producción + `ng build` |
| `npm test` | Ejecuta tests unitarios (Karma + Jasmine, Chrome Headless) |
| `npm run lint` | Ejecuta linter (ESLint) |

## Variables de entorno

Las variables de entorno se inyectan en tiempo de build mediante `src/set-env.ts`. No se commitean — se generan a partir de archivos `.env`:

| Archivo | Genera | Uso |
|---------|--------|-----|
| `.env` | `environment.ts` | Desarrollo |
| `.env.production` | `environment.prod.ts` | Producción |

Plantilla disponible en `.env.example`:

```
API_KEY=dev-api-key-change-in-production
API_BASE_URL=http://127.0.0.1:5001/service/us-central1/api
```

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Angular 17 (NgModules) |
| UI | Angular Material 17 |
| Grid | Bootstrap 5 (solo grid) |
| Iconos | FontAwesome 7 (SVG) |
| i18n | Transloco 8 (español / inglés) |
| Estilos | SCSS + CSS custom properties (light/dark) |
| Estado | RxJS + Services (BehaviorSubject) |
| Auth | JWT (sessionStorage) + API key (interceptor) |
| Testing | Karma + Jasmine (42 tests) |
| Deploy | Firebase Hosting |
| CI/CD | GitHub Actions |

## Arquitectura

```
src/app/
├── core/           # Servicios singleton, guards, interceptors, modelos
├── layout/         # PublicLayout (topbar + footer), PrivateLayout (topbar + sidebar)
├── shared/         # UI reutilizable (atoms, molecules, organisms), directivas
└── features/       # Módulos por dominio
    ├── home/       # Landing page
    ├── auth/       # Login + creación de cuenta
    ├── tasks/      # CRUD de tareas + filtros + paginación cursor
    └── categories/ # CRUD de categorías
```

Cada feature es un NgModule lazy-loaded con estructura interna consistente: `data-access/`, `pages/`, `dialogs/`, `models/`.

## Funcionalidades

- **Login** con email — creación automática de cuenta si el usuario no existe
- **Tareas**: crear, editar, eliminar, marcar como completada/pendiente
- **Paginación cursor** con "Load More"
- **Filtros**: por estado (all/completed/pending), por categoría, por búsqueda con debounce
- **Categorías**: CRUD con selector de color
- **Tema claro/oscuro** con opción "sistema"
- **Internacionalización** (español / inglés) con cambio en tiempo real
- **SEO**: títulos y meta tags dinámicos por página
- **Seguridad**: JWT + API key vía interceptors, errores normalizados

## Testing

```bash
npm test
```

42 tests unitarios cubriendo:
- Servicios de data-access (contratos HTTP)
- Páginas principales (flujos de usuario)
- Componente root

## Deploy

```bash
# Build de producción
npm run build

# Copiar al directorio de hosting
cp -r dist/to-do-list-sefront/* ../ToDoListSEBack/public/

# Deploy a Firebase Hosting
cd ../ToDoListSEBack && firebase deploy --only hosting
```

En producción, Firebase Hosting reescribe `/api/**` hacia la Cloud Function del backend — ambos viven bajo el mismo dominio (sin CORS).

## Documentación detallada

La carpeta [`docs/`](docs/README.md) contiene documentación completa del proyecto:

| Documento | Contenido |
|-----------|-----------|
| [architecture](docs/architecture.md) | Visión, capas, flujo de datos |
| [folder-structure](docs/folder-structure.md) | Árbol, convenciones, reglas de ubicación |
| [ui-system](docs/ui-system.md) | Catálogo de componentes compartidos |
| [styles-theming](docs/styles-theming.md) | SCSS, tokens, temas, breakpoints |
| [routing-state-http](docs/routing-state-http.md) | Rutas, guards, interceptors, data-access |
| [forms-validation](docs/forms-validation.md) | Reactive Forms, validación, diálogos |
| [i18n-seo-accessibility](docs/i18n-seo-accessibility.md) | Transloco, SEO, accesibilidad |
| [features](docs/features.md) | Documentación por feature |
| [testing](docs/testing.md) | Estrategia y cobertura |
| [deploy](docs/deploy.md) | Firebase, CI/CD, entornos |
| [decisions](docs/decisions.md) | 12 decisiones técnicas (ADR) |
| [challenge-compliance](docs/challenge-compliance.md) | Cumplimiento del challenge |
| [engineering-principles](docs/engineering-principles.md) | Principios aplicados |

## Backend

El backend (Express + TypeScript + Firebase Functions + Firestore) está en el repositorio [ToDoListSE-Back](https://github.com/Samuel-s-Proyects/ToDoListSE-Back).
