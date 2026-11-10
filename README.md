# Calculadora web

Calculadora web para operaciones matemáticas básicas, desarrollada como proyecto académico con HTML, CSS y JavaScript, sin dependencias externas.

## Funcionalidades

- Suma, resta, multiplicación y división.
- Entrada decimal, cambio de signo y borrado de dígitos.
- Manejo de división entre cero y resultados no válidos.
- Diseño adaptable y controles con teclado.

## Uso

Abre `index.html` en un navegador. No se requiere instalación ni proceso de compilación.

También puedes usar el teclado:

- `0`–`9` para ingresar números.
- `.` o `,` para ingresar decimales.
- `+`, `-`, `*` y `/` para elegir una operación.
- `Enter` o `=` para calcular.
- `Backspace` para borrar el último dígito.
- `Escape` o `Delete` para limpiar.

## Publicación en GitHub Pages

El flujo de GitHub Actions de este repositorio publica el sitio automáticamente
cada vez que se actualiza la rama `main`. Para activarlo:

1. Sube el proyecto a GitHub.
2. En el repositorio, abre **Settings > Pages**.
3. En **Build and deployment**, selecciona **GitHub Actions** como fuente.
4. Después de cada publicación, encontrarás el enlace en **Actions** o en
   **Settings > Pages**.

También puedes iniciar una publicación manual desde **Actions > Deploy static
site to GitHub Pages > Run workflow**.
