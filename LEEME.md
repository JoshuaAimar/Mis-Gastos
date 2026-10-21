# Money Club (PWA)

## Publicar gratis en GitHub Pages
1. Crea un repositorio público en GitHub, por ejemplo `mis-gastos`.
2. Sube todo el contenido de esta carpeta (index.html, manifest.webmanifest, sw.js y la carpeta icons) a la raíz del repositorio.
3. Ve a Settings > Pages, en "Branch" elige `main` y la carpeta `/ (root)`, y guarda.
4. En un minuto tendrás tu app en `https://TU-USUARIO.github.io/mis-gastos/`.

## Instalar en el celular
- Android (Chrome): abre el enlace y toca "Instalar app" o menú ⋮ > "Agregar a pantalla de inicio".
- iPhone (Safari): botón Compartir > "Agregar a pantalla de inicio".

## Notas
- Funciona sin internet después de abrirla una vez.
- Los datos se guardan solo en ese celular, cifrados con tu PIN (AES-GCM con clave derivada por PBKDF2).
- Si olvidas el PIN no hay forma de recuperar los datos. Anótalo en un lugar seguro.
- El respaldo (Ajustes > Respaldo) también va cifrado: para restaurarlo necesitas el PIN que tenías al descargarlo.
- Si cambias algo del código, sube el número en `VERSION` dentro de sw.js para que el celular tome la versión nueva.
- Para probarla en tu computadora: `python -m http.server` dentro de la carpeta y abre http://localhost:8000 (el service worker no funciona abriendo el archivo directo).
