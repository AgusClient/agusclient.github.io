# AClient // Sitio de producto

Landing page de **AClient (Clientx30)**, cliente competitivo para DDNet. HTML, CSS y JS, con Three.js (3D) y Web Audio.

## Ver el sitio
Abrí `index.html` en el navegador, o:
```bash
cd product-showcase
python -m http.server 8080   # http://localhost:8080
```

## Imágenes (`assets/images/`)
| Archivo | Se usa en |
|---|---|
| `logo.png` | Header, footer, preloader y favicon |
| `fast-input.png` | Sección Visión |
| `race-stats.png` | Race Stats (con hotspots) y galería |
| `player-menu.png`, `mod-menu.png` | Mod Tools y galería |
| `gameskin-others.png` | GameSkinOthers |
| `perfiles.png` | Galería |

Para cambiar una imagen, reemplazá el archivo manteniendo el nombre, o editá el `src` en `index.html`.

## Pendientes
- Links de Discord y DDNet en el footer (hoy son `#`).
- Los botones Download y el logo del header apuntan a https://github.com/AgusClient/AClient.

## Idiomas (i18n)
Selector ubicado en la barra de navegación (a la izquierda de Download). Soporta:
- 🇪🇸 **Español** (`es`, por defecto)
- 🇧🇷 **Português** (`pt`)
- 🇺🇸 **English** (`en`)
La preferencia se guarda automáticamente en `localStorage`.

## Estructura
- `index.html`: contenido y secciones con atributos `data-i18n`.
- `css/style.css`: estilos, selector de idioma y temas de color (`[data-theme]`).
- `js/i18n.js`: motor de traducción con diccionarios completos para Español, Português e English.
- `js/main.js`: interacciones y eventos; `js/three-scene.js`: escena 3D del hero; `js/audio.js`: tonos de Fast Input.
