# Día de las Flores Amarillas 🌼

Landing page conmemorativa del 21 de septiembre.

## Ver localmente

Abre `index.html` con un servidor estático simple, por ejemplo:

```bash
python3 -m http.server 8000
```

y visita `http://localhost:8000`.

## Estructura

- `index.html` — contenido y estructura
- `styles.css` — estilos
- `script.js` — caja/ramo interactivo, lightbox de fotos, lluvia de flores y contador de fecha
- `images/` — fotos (11 fotos, `foto-01.jpg` a `foto-11.jpg`)

## Cómo funciona la caja

En la portada hay una caja de regalo. Al tocarla se abre y aparece un ramo de
flores amarillas (una por foto). Al tocar cada flor se abre esa foto en
grande. Todo esto vive en `script.js`, en el arreglo `photos` (orden, alt text
y dimensiones de cada imagen).

## Personalizar

- Cambia el texto en `index.html` (hero, sección "La tradición", cierre).
- Cambia o reordena las fotos editando el arreglo `photos` en `script.js`.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube este contenido.
2. En **Settings → Pages**, elige la rama `main` y carpeta raíz (`/`).
3. La página quedará disponible en `https://<usuario>.github.io/<repo>/`.
