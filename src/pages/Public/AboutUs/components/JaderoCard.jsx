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
        y mi último proyecto, <strong>adoptaunpeludo.com</strong>, es un claro
        ejemplo de mi habilidad para gestionar equipos y recursos y llevar a
        cabo proyectos desde la conceptualización hasta la implementación.
      </p>
      <H2Title
        title="Backend ⚙️"
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
        title="DevOps 🛠️"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Como parte de mi rol como DevOps, contribuí al proyecto
        adoptaunpeludo.com en varias áreas clave:
      </p>
      <div className="pl-5">
        <p className="flex flex-col justify-start gap-3">
          <span>
            <strong>Creación de la instancia de AWS EC2:</strong> Establecí una
            instancia de AWS EC2 para alojar y ejecutar el proyecto. Esta
            instancia proporciona una infraestructura escalable y confiable para
            el despliegue de la aplicación, asegurando su disponibilidad y
            rendimiento.
          </span>
        </p>
        <p className="flex flex-col justify-start gap-3">
          <span>
            <strong>Dockerización del backend:</strong> Utilicé Docker para
            containerizar todas las partes del backend, lo que facilita la
            gestión de dependencias, la portabilidad y la replicabilidad del
            entorno de desarrollo. Esto garantiza una mayor consistencia entre
            los diferentes entornos y simplifica el despliegue del sistema en
            diferentes plataformas.
          </span>
        </p>
        <p className="flex flex-col justify-start gap-3">
          <span>
            <strong>Configuración de NGINX como proxy inverso:</strong>{' '}
            Implementé NGINX como un servidor proxy inverso para dirigir el
            tráfico entrante a los diferentes servicios del proyecto, incluido
            el frontend. Esto mejora la seguridad, el rendimiento y la
            escalabilidad del sistema al permitir la gestión centralizada del
            tráfico y la carga balanceada entre los servidores backend.
          </span>
        </p>
        <p className="flex flex-col justify-start gap-3">
          <span>
            <strong>Implementación de CICD con GitHub Actions:</strong>{' '}
            Establecí un flujo de integración y entrega continua (CICD)
            utilizando GitHub Actions. Esto automatiza el proceso de prueba,
            compilación y despliegue de la aplicación, lo que garantiza
            despliegues más rápidos y consistentes. Además, proporciona una
            mayor visibilidad y control sobre el ciclo de vida del software,
            mejorando la colaboración y la calidad del código.
          </span>
        </p>
      </div>
      <H2Title
        title="Frontend 🎨"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        En el frontend, contribuí al proyecto adoptaunpeludo.com con las
        siguientes mejoras clave:
      </p>
      <div className="pl-5">
        <p className="flex flex-col justify-start gap-3">
          <span>
            <strong>Implementación de páginas privadas:</strong> Desarrollé la
            lógica necesaria para las páginas que requieren autenticación,
            garantizando la seguridad y la privacidad de los usuarios al
            restringir el acceso a contenido sensible. Esto mejora la
            experiencia del usuario al proporcionar un entorno seguro y
            personalizado.
          </span>
        </p>
        <p className="flex flex-col justify-start gap-3">
          <span>
            <strong>Desarrollo del asistente de IA y los chats:</strong> Utilicé
            tecnologías como React Query para optimizar el rendimiento al
            realizar consultas a la API de manera eficiente, mejorando así la
            velocidad y la capacidad de respuesta de la aplicación. Además,
            empleé React Router para gestionar la navegación entre las
            diferentes secciones del sitio, lo que proporciona una experiencia
            de usuario fluida y coherente.
          </span>
        </p>
        <p className="flex flex-col justify-start gap-3">
          <span>
            <strong>Enfoque en la gestión eficiente del estado:</strong> Mi
            atención a la gestión del estado y la resolución de conflictos
            durante el desarrollo contribuyó a mantener un código limpio y
            escalable. Esto facilita el mantenimiento futuro de la aplicación y
            permite una evolución más fluida a medida que se agregan nuevas
            funcionalidades.
          </span>
        </p>
      </div>
      <H2Title
        title="¿Por qué contar conmigo?"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Soy un apasionado de la programación y disfruto resolviendo problemas a
        través del código. Mi curiosidad insaciable y mi compromiso con el
        aprendizaje continuo me mantienen siempre actualizado sobre las últimas
        tecnologías y metodologías de desarrollo. Además, mi capacidad para
        adaptarme rápidamente a nuevos desafíos y mi enfoque en el crecimiento
        profesional me hacen un candidato ideal para equipos que valoran la
        innovación y el progreso constante.
      </p>
    </div>
  );
};
export default JaderoCard;
