# Frontend
(Adopta un Peludo)[https://www.adoptaunpeludo.com/] es el frontend de un proyecto más amplio destinado a facilitar la adopción de animales. Las protectoras de animales pueden subir anuncios de mascotas disponibles para adopción, mientras que los potenciales adoptantes pueden buscar animales, ver detalles y contactar a las protectoras para iniciar el proceso de adopción.

## Tecnologías Utilizadas
- [React](https://es.react.dev/): Framework de JavaScript para construir interfaces de usuario.
- [React Router DOM](https://reactrouter.com/en/main): Utilizado para manejar la navegación entre páginas dentro de la aplicación.
- [React Query](https://tanstack.com/query/v3/): Biblioteca para manejar las peticiones y el estado del servidor en React.
- [Next UI](https://nextui.org/): Biblioteca de componentes UI para React que permite un desarrollo más rápido y eficiente basada en Tailwind.
- [Tailwind CSS](https://tailwindcss.com/): Framework de CSS para estilizar la aplicación sin salir del HTML.
- [Vite](https://vitejs.dev/): Herramienta de construcción que permite un desarrollo más rápido con módulos modernos de JavaScript.
- [Docker](https://www.docker.com/): Plataforma de contenedores que simplifica la configuración y despliegue de aplicaciones en entornos uniformes.
- [Auth0](https://auth0.com/)


## Estructura del Proyecto
### Zona Pública:
- **Página de inicio**: Incluye secciones como animales destacados, cómo involucrarse, y diferencias entre adoptar y comprar.
- **Exploración de animales y refugios**: Páginas dedicadas a mostrar animales y refugios disponibles para adopción.
- **Autenticación**: Inicio de sesión seguro a través de OAuth con Google, facilitado por [Auth0](https://auth0.com/).

### Zona Privada:
- **Chat para adopciones**: Facilita la comunicación directa y segura entre protectoras y adoptantes, con características avanzadas como confirmación de lectura de mensajes, gracias a los servicios de web sockets.
- **Asistente inteligente con ChatGPT**: Proporciona ayuda contextualizada y asistencia dentro de la aplicación.
- **Sistema de notificaciones**: Alerta a los usuarios sobre eventos importantes como nuevos favoritos en mascotas o mensajes.
- **Panel de cuenta**: Permite a los usuarios cambiar su contraseña, subir nuevos animales, editar o eliminar anuncios existentes, y borrar su cuenta.

# Instalación
## Instalación Tradicional
Para configurar y ejecutar el proyecto de manera tradicional, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Adoptaunpeludo/frontend.git
   cd frontend
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar las variables de entorno:**
   - Copia el archivo `.env.template` a un nuevo archivo llamado `.env`.
   - Ajusta las variables según sea necesario.

4. **Ejecutar el proyecto:**
   ```bash
   npm run dev
   ```
   Esto iniciará el servidor de desarrollo en `http://localhost:3000` o en otro puerto especificado en tu archivo `.env`.

## Instalación con Docker

Si prefieres usar Docker para la instalación y ejecución del proyecto, sigue estos pasos:

1. **Construir la imagen de Docker:**
   - Asegúrate de que Docker esté instalado en tu sistema.
   - Corre el siguiente comando en la raíz del proyecto para construir la imagen Docker:
     ```bash
     docker build -t adopta-un-peludo .
     ```

2. **Ejecutar el contenedor de Docker:**
   ```bash
   docker run -p 3000:3000 adopta-un-peludo
   ```
   Esto ejecutará la aplicación y la hará accesible en `http://localhost:3000` en tu navegador.
