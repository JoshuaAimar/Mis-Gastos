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
- El respaldo (Ajustes > Respaldo) se descarga como un estado de cuenta .txt que puedes leer. Al final trae un bloque cifrado que sirve para restaurar; para eso necesitas el PIN que tenías al descargarlo. No edites ese bloque.
- Si cambias algo del código, sube el número en `VERSION` dentro de sw.js para que el celular tome la versión nueva.
- Para probarla en tu computadora: `python -m http.server` dentro de la carpeta y abre http://localhost:8000 (el service worker no funciona abriendo el archivo directo).

## Tus datos al actualizar la app
- Subir una versión nueva NO borra tus datos: viven en el navegador del celular, en la llave `mis-gastos-vault`. Nunca cambies ese nombre en el código.
- Cada vez que abres la app se guarda una copia automática (`mis-gastos-vault-prev`). Si el guardado principal se daña, la app usa esa copia.
- Si cambias la forma de los datos, sube `SCHEMA` en index.html y agrega el paso en `migrate()`. Antes de migrar se guarda una copia con la versión anterior (`mis-gastos-vault-v1`, etc.).
- Aun así, manda un respaldo de vez en cuando: Ajustes > "Enviar respaldo (WhatsApp)" abre el menú de compartir con el .txt adjunto; elige WhatsApp y tu chat "Tú".

## Tarjetas e historial
- Cada pago se aplica al estado de cuenta pendiente más antiguo de esa tarjeta.
- Cuando un estado de cuenta queda pagado, sus movimientos pasan a "Historial pagado" (no se borran). Con ↺ puedes regresarlos a pendientes.
- "Gastos del mes" se reinicia solo cada día 1; los meses pasados quedan en "Meses anteriores".
