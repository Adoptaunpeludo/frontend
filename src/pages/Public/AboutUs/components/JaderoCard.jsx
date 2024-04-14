import { Link } from 'react-router-dom';

export const JaderoCard = () => {
  return (
    <p className="text-pretty leading-5 flex flex-col gap-3">
      <h1 className="mb-4">Jadero</h1>
      <div>
        <h2>Sobre mí</h2>
        <p>
          ¡Hola! Soy Jose Alberto, un desarrollador fullstack apasionado por
          crear soluciones tecnológicas innovadoras. Mi experiencia se centra en
          el desarrollo de aplicaciones web complejas, y mi último proyecto,{' '}
          <strong>adoptaunpeludo.com</strong>, es un claro ejemplo de mi
          habilidad para gestionar equipos y recursos y llevar a cabo proyectos
          desde la conceptualización hasta la implementación.
        </p>

        <h3>Backend Wizard 🧙‍♂️</h3>
        <p>
          Como arquitecto del backend de <strong>adoptaunpeludo.com</strong>,
          tuve el privilegio de tomar decisiones clave en cuanto a tecnologías y
          arquitecturas. Diseñé y desarrollé una arquitectura de microservicios
          utilizando <strong>RabbitMQ</strong>, donde cada servicio tiene su
          propia responsabilidad:
        </p>
        <ul>
          <li>
            <Link to="https://github.com/Adoptaunpeludo/backend">API:</Link>
            Desarrollé una API robusta con Node.js, utilizando una base de datos
            relacional <strong>PostgreSQL</strong> y <strong>Prisma</strong>{' '}
            como ORM para manejar todas las solicitudes relacionadas con la
            autenticación, el CRUD de usuarios y animales, y los chats en tiempo
            real.
          </li>
          <li>
            <Link to="https://github.com/Adoptaunpeludo/email-service">
              Servicio de envío de emails:
            </Link>
            Notifica a los usuarios sobre eventos importantes incluso cuando
            están offline.
          </li>
          <li>
            <Link to="https://github.com/Adoptaunpeludo/websocket-service">
              Servidor de websockets:
            </Link>
            Facilita las comunicaciones en tiempo real entre usuarios,
            incluyendo los chats y las notificaciones en la página.
          </li>
          <li>
            <Link to="https://github.com/Adoptaunpeludo/chatbot-service">
              Asistente:
            </Link>
            Desarrollé un servicio de asistente con Express y{' '}
            <strong>LangChain</strong> para proporcionar una experiencia de
            usuario mejorada a través de la inteligencia artificial.
          </li>
          <li>
            <Link href="https://github.com/Adoptaunpeludo/noc-service">
              Servicio de monitorización:
            </Link>
            Almacena y gestiona todos los errores que se produzcan en la API y
            los servicios anteriores para garantizar la estabilidad del sistema.
          </li>
        </ul>

        <h3>DevOps Guru 🛠️</h3>
        <p>
          Mi experiencia no se limita al desarrollo, también tengo sólidos
          conocimientos en DevOps. Lideré la creación de una instancia de{' '}
          <strong>AWS EC2</strong> y dockericé todo el backend, utilizando
          DockerHub para alojar los contenedores. Configuré{' '}
          <strong>NGINX</strong> como proxy inverso para servir todos los
          servicios, incluido el frontend, y establecí un sólido flujo de
          integración y entrega continua (CICD) con GitHub Actions para
          garantizar despliegues sin problemas.
        </p>

        <h3>Frontend Maestro 🎨</h3>
        <p>
          En el frontend, me encargué de implementar la lógica detrás de las
          páginas privadas, el asistente de IA y los chats. Opté por tecnologías
          como <strong>React Query</strong> para optimizar el rendimiento y{' '}
          <strong>React Router</strong> para la gestión de la navegación. Mi
          enfoque en la gestión eficiente del estado y la resolución de
          conflictos durante el desarrollo me permitió mantener un código limpio
          y escalable.
        </p>

        <h3>¿Por qué contar conmigo?</h3>
        <p>
          Mi enfoque en la innovación, combinado con mi experiencia técnica y mi
          capacidad para gestionar recursos e implementar soluciones, me
          convierte en un activo valioso para cualquier proyecto. Estoy
          constantemente buscando nuevos desafíos y oportunidades para aprender
          y crecer como profesional. Si estás buscando un desarrollador que
          pueda llevar tu proyecto al siguiente nivel, ¡no dudes en contactarme!
        </p>
      </div>
    </p>
  );
};
export default JaderoCard;
