import { Link } from '@nextui-org/react';
import { IconBrandFigma, IconBrandGithub } from '@tabler/icons-react';

import { H2Title, H3Title } from '../../../../components';
export const JmacostaCard = () => {
  return (
    <div className="text-pretty leading-5 flex flex-col ">
      <p>¡Hola! Soy Juanma, tu desarrollador web FullStack.</p>

      <H2Title
        title="Diseñador UX/UI y Desarrollador Frontend"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Como <strong>Diseñador UX/UI y Desarrollador Frontend</strong>, he
        tenido el privilegio de combinar mis habilidades creativas con mi
        conocimiento técnico para crear esta experiencia digital que estás
        viendo. Mi enfoque se centra en la intersección entre el diseño y la
        funcionalidad, asegurando que los usuarios tengan una experiencia fluida
        e intuitiva en las aplicaciones y sitios web que desarrollo.
      </p>
      <H3Title title="Mis logros clave incluyen:" />
      <div className="pl-5 pt-5">
        <p className="flex flex-col justify-start gap-3">
          <span>
            <strong>Diseño Centrado en el Usuario:</strong> He trabajado en
            proyectos que han puesto al usuario en el centro de todo. Desde la
            investigación inicial hasta la creación de wireframes y prototipos
            interactivos, mi objetivo siempre ha sido comprender las necesidades
            y deseos de los usuarios para diseñar soluciones efectivas.
          </span>
        </p>
        <p className="flex flex-col justify-start gap-3">
          <span>
            <strong>Interfaz de Usuario Atractiva:</strong> Mi experiencia en
            diseño gráfico me ha permitido crear interfaces visuales atractivas
            y coherentes. He trabajado con <strong>herramientas de IA</strong>{' '}
            para crear paletas de colores, tipografías y elementos gráficos que
            reflejen la identidad de la marca y mejoren la experiencia del
            usuario.
          </span>
        </p>
        <p className="flex flex-col justify-start gap-3">
          <strong>Desarrollo Frontend Robusto:</strong> Como desarrollador
          frontend, he implementado diseños y funcionalidades utilizando
          tecnologías como HTML, CSS, JavaScript y frameworks como React.
        </p>
        <p>
          En este proyecto concretamente he trabajado con la librería de
          componentes NextUI, la cual es una biblioteca de componentes de
          interfaz de usuario (UI) para React que combina la potencia de
          TailwindCSS con React Aria para ofrecer componentes completos (lógica
          y estilos) para construir interfaces de usuario accesibles y
          personalizables.
        </p>
        <p>
          Dado que NextUI utiliza TailwindCSS como su motor de estilos, he
          podido utilizar todas las clases de TailwindCSS dentro de los
          componentes de NextUI, lo que nos garantizaba un tamaño óptimo de CSS
          compilado
        </p>
        <p>
          Mi enfoque en la optimización del rendimiento y la accesibilidad
          garantiza que los usuarios disfruten de una experiencia rápida y sin
          problemas.
        </p>

        <p>
          <strong>Colaboración Efectiva:</strong> He trabajado en estrecha
          colaboración con desarrolladores backend y otros miembros del equipo
          para garantizar la coherencia en el diseño y la funcionalidad. Mi
          habilidad para comunicarme de manera efectiva ha sido fundamental para
          el éxito de los proyectos.
        </p>

        <p className="flex flex-col justify-start gap-3">
          <span>
            En resumen, mi pasión por el diseño y mi experiencia en desarrollo
            frontend me han permitido crear este producto digital que no solo se
            ven bien, sino que también funcionan de manera excepcional. Estoy
            emocionado de seguir contribuyendo al éxito de futuros proyectos
            web.
          </span>
        </p>
      </div>
      <H3Title title="Mi trabajo en este proyecto:" />
      <div className="pl-5 pt-5 ">
        <p>
          Puedes encontrar el código fuente de este proyecto en el repositorio
          de <strong>GitHub.</strong> Allí, junto con mis compañeros he
          versionado y documentado cada paso del desarrollo, desde la
          configuración inicial hasta las últimas implementaciones. Siéntete
          libre de explorar:
          <Link
            href="https://github.com/Adoptaunpeludo/frontend"
            isExternal
            className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
          >
            <IconBrandGithub stroke={1} /> Github
          </Link>
        </p>

        <p>
          Para visualizar los diseños y prototipos interactivos, he utilizado
          <strong> Figma.</strong> En mi espacio de trabajo de Figma,
          encontrarás las iteraciones de diseño, los wireframes y los
          componentes visuales que han dado forma a esta experiencia digital.
          Echa un vistazo aquí:
          <Link
            href="https://www.figma.com/file/hrtuLqd3baM1SXYRsLhJMI/Adopta-un-peludo----landing?type=design&node-id=0%3A1&mode=design&t=j9I6NDs5FrRKIsgU-1"
            isExternal
            className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
          >
            <IconBrandFigma stroke={1} /> Figma
          </Link>
        </p>
      </div>

      <H2Title
        title="¿Por qué contar conmigo?"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Mi carrera en los últimos años se ha centrado en gestionar equipos de
        diseño gráfico, asegurando una colaboración efectiva entre departamentos
        y proporcionando un servicio al cliente de primer nivel.{' '}
      </p>
      <p>
        La innovación es el motor de mi práctica profesional, apoyada por una
        sólida base técnica y la habilidad para optimizar recursos y ejecutar
        estrategias innovadoras. Mi objetivo es superar los retos y crecer en mi
        campo, siempre con la mira puesta en la excelencia.{' '}
      </p>
      <p>
        Si buscas a alguien que impulse tu proyecto con visión y eficacia,
        estaré encantado de aportar mi experiencia
      </p>
    </div>
  );
};
export default JmacostaCard;
