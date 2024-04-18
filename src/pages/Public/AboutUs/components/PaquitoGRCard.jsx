import { Link } from '@nextui-org/react';
import { IconBrandGithub } from '@tabler/icons-react';
import { H2Title, H3Title } from '../../../../components';

export const PaquitoGRCard = () => {
  return (
    <div className="text-pretty leading-5 flex flex-col ">
      <H2Title
        title="Desarrollador Frontend"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Desde temprana edad, he sentido una ferviente pasión por la tecnología,
        una llama que ha permanecido encendida a pesar de haber tomado un camino
        distinto en el ámbito de la hostelería. Sin embargo, he llegado a un
        punto en el que estoy decidido a seguir mi verdadera vocación: las
        tecnologías de la información.{' '}
      </p>
      <p>
        Aunque no he tenido la oportunidad de trabajar formalmente en el campo
        de la informática desde que obtuve mi título de formación profesional,
        mi interés y aprendizaje continuo en los fundamentos del desarrollo de
        software, utilizando diversos lenguajes, nunca han menguado. He
        explorado también áreas como la contenerización de aplicaciones y la
        automatización de procesos. Además, siempre he destacado por mi
        habilidad para resolver problemas matemáticos y lógicos, junto con una
        insaciable curiosidad por entender la mecánica interna de los sistemas y
        el rol de cada componente, tanto a nivel de software como de hardware.{' '}
      </p>
      <H3Title title="Mi trabajo en este proyecto:" />
      <div className="pl-5 pt-5 ">
        <p>
          Como miembro del equipo, mi enfoque principal ha sido garantizar la
          integridad de los datos a través de la programación de las
          validaciones en todos los formularios, inputs e imágenes de nuestra
          plataforma web. Mi labor ha sido fundamental para asegurar que la
          información enviada al backend sea siempre precisa y coherente.
        </p>
        <p>
          Además de mi rol principal, he brindado apoyo constante a mis
          compañeros mediante la provisión de pequeños bloques de código y
          también he desempeñado el papel de Control de Calidad, asegurándome de
          que nuestro producto final cumpla con los más altos estándares de
          calidad. Puedes acceder directamente al código del proyecto en el
          siguiente enlace:
          <Link
            href="https://github.com/Adoptaunpeludo/frontend"
            isExternal
            className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
          >
            <IconBrandGithub stroke={1} /> Github
          </Link>
        </p>
      </div>
      <H2Title
        title="¿Por qué contar conmigo?"
        className={'border-b-1 border-primary mb-5 ml-0'}
      />
      <p>
        Si bien mi experiencia profesional puede ser incipiente, poseo un sólido
        dominio de una variedad de lenguajes de programación, incluyendo Python,
        JavaScript y C.
      </p>
      <p>
        Mis prácticas en el desarrollo web han abarcado todo el espectro, desde
        el frontend utilizando tecnologías como React, hasta el backend con
        Node.js, Express, y bases de datos como MongoDB y PostgreSQL.
      </p>
      <p>
        Además, he profundizado mis conocimientos a través de un curso dedicado
        a DevOps, donde adquirí habilidades en herramientas vitales como Docker,
        Kubernetes, y CI/CD utilizando GitHub Actions. Mi pasión por la
        tecnología y mi compromiso con el aprendizaje continuo me convierten en
        un recurso valioso, capaz de enfrentar desafíos con creatividad y
        determinación, siempre buscando contribuir al éxito del equipo y del
        proyecto.
      </p>
    </div>
  );
};
export default PaquitoGRCard;
