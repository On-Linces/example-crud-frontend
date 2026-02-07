# Frontend — Vue 3 + Vite

Pequeña SPA en Vue 3 con TypeScript que consume la API en `Api/`.

## Stack

- Vue 3
- Vite
- TypeScript
- Axios

## Requirements

- Node.js >= 18 + npm

## Quick Start

```bash
cd Frontend
npm install
npm run dev
```

- Frontend disponible en: `http://localhost:5173`

## Configuración

1. Copia el archivo de ejemplo y crea tu `.env`:

```bash
cd Frontend
# macOS / Linux
cp .env.example .env
# Windows (PowerShell)
Copy-Item .env.example .env
```

2. Edita `.env` y ajusta `VITE_API_URL` si tu API corre en otra URL (incluir `/api` si tu backend lo usa):

```
VITE_API_URL=http://localhost:5295/api
```

3. Si el servidor de desarrollo (`npm run dev`) ya estaba corriendo, reinícialo para que tome las nuevas variables.


## Build

```bash
npm run build
```