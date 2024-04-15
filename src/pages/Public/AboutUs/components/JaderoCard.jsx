import { Link } from '@nextui-org/react';
import { IconLink } from '@tabler/icons-react';
import { H2Title } from '../../../../components';
export const JaderoCard = () => {
  return (
    <div className="text-pretty leading-5 flex flex-col ">
      <p>
        ¡Hola! Soy Jose Alberto, un desarrollador fullstack apasionado por crear
        soluciones tecnológicas innovadoras.
      </p>
      <p>
        Mi experiencia se centra en el desarrollo de aplicaciones web complejas,
        y mi último proyecto,
        <strong>adoptaunpeludo.com</strong>, es un claro ejemplo de mi habilidad
        para gestionar equipos y recursos y llevar a cabo proyectos desde la
        conceptualización hasta la implementación.
      </p>
      <H2Title
        title="Backend Wizard 🧙‍♂️"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Como arquitecto del backend de <strong>adoptaunpeludo.com</strong>, tuve
        el privilegio de tomar decisiones clave en cuanto a tecnologías y
        arquitecturas. Diseñé y desarrollé una arquitectura de microservicios
        utilizando <strong>RabbitMQ</strong>, donde cada servicio tiene su
        propia responsabilidad:
      </p>
      <div className="pl-5">
        <p className="flex flex-col justify-start gap-3">
          <Link
            href="https://github.com/Adoptaunpeludo/backend"
            isExternal
            className="text-tertiary font-poppins font-semibold mr-1"
          >
            <IconLink stroke={1} /> API:
          </Link>
          <span>
            Desarrollé una API robusta con Node.js, utilizando una base de datos
            relacional <strong>PostgreSQL</strong> y <strong>Prisma </strong>
            como ORM para manejar todas las solicitudes relacionadas con la
            autenticación, el CRUD de usuarios y animales, y los chats en tiempo
            real.
          </span>
        </p>
        <p className="flex flex-col justify-start gap-3">
          <Link
            href="https://github.com/Adoptaunpeludo/email-service"
            isExternal
            className="text-tertiary font-poppins font-semibold mr-1"
          >
            <IconLink stroke={1} /> Servicio de envío de emails:
          </Link>
          <span>
            Notifica a los usuarios sobre eventos importantes incluso cuando
            están offline.
          </span>
        </p>
        <p className="flex flex-col justify-start gap-3">
          <Link
            href="https://github.com/Adoptaunpeludo/websocket-service"
            isExternal
            className="text-tertiary font-poppins font-semibold mr-1"
          >
            <IconLink stroke={1} /> Servidor de websockets:
          </Link>
          <span>
            Facilita las comunicaciones en tiempo real entre usuarios,
            incluyendo los chats y las notificaciones en la página.
          </span>
          <Link
            href="https://github.com/Adoptaunpeludo/chatbot-service"
            isExternal
            className="text-tertiary font-poppins font-semibold mr-1"
          >
            <IconLink stroke={1} /> Asistente:
          </Link>
          <span>
            Desarrollé un servicio de asistente con Express y
            <strong> LangChain</strong> para proporcionar una experiencia de
            usuario mejorada a través de la inteligencia artificial.
          </span>
        </p>
        <p className="flex flex-col justify-start gap-3">
          <Link
            href="https://github.com/Adoptaunpeludo/noc-service"
            isExternal
            className="text-tertiary font-poppins font-semibold mr-1"
          >
            <IconLink stroke={1} /> Servicio de monitorización:
          </Link>
          <span>
            Almacena y gestiona todos los errores que se produzcan en la API y
            los servicios anteriores para garantizar la estabilidad del sistema.
          </span>
        </p>
      </div>
      <H2Title
        title="DevOps Guru 🛠️"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Mi experiencia no se limita al desarrollo, también tengo sólidos
        conocimientos en DevOps. Lideré la creación de una instancia de
        <strong> AWS EC2</strong> y dockericé todo el backend, utilizando
        DockerHub para alojar los contenedores. Configuré
        <strong> NGINX</strong> como proxy inverso para servir todos los
        servicios, incluido el frontend, y establecí un sólido flujo de
        integración y entrega continua (CICD) con GitHub Actions para garantizar
        despliegues sin problemas.
      </p>
      <H2Title
        title="Frontend Maestro 🎨"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        En el frontend, me encargué de implementar la lógica detrás de las
        páginas privadas, el asistente de IA y los chats. Opté por tecnologías
        como <strong>React Query</strong> para optimizar el rendimiento y
        <strong>React Router</strong> para la gestión de la navegación. Mi
        enfoque en la gestión eficiente del estado y la resolución de conflictos
        durante el desarrollo me permitió mantener un código limpio y escalable.
      </p>
      <H2Title
        title="¿Por qué contar conmigo?"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Mi enfoque en la innovación, combinado con mi experiencia técnica y mi
        capacidad para gestionar recursos e implementar soluciones, me convierte
        en un activo valioso para cualquier proyecto. Estoy constantemente
        buscando nuevos desafíos y oportunidades para aprender y crecer como
        profesional. Si estás buscando un desarrollador que pueda llevar tu
        proyecto al siguiente nivel, ¡no dudes en contactarme!
      </p>
    </div>
  );
};
export default JaderoCard;
