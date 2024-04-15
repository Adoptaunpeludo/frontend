import { Image } from '@nextui-org/react';
import { technologiesBackend } from '../data/technologies';
import { H2Title } from '../../../../components';
import ModalTechnologies from './ModalTechnologies';

export const Backend = () => {
  return (
    <section className="w-full min-h-80 bg-black flex flex-col justify-center px-10">
      <section className=" max-w-screen-xl w-full   mx-auto">
        <header className="flex justify-end font-lobster text-5xl  text-primary py-10 ">
          Back-end
        </header>
        <main className=" flex justify-end gap-5 flex-col">
          <article className="text-pretty font-poppins leading-6 text-white max-w-screen-md self-end text-right">
            El backend de adoptaunpeludo.com es una arquitectura robusta y
            escalable, diseñada para manejar todas las funcionalidades clave de
            la aplicación. Basado en microservicios, cada componente tiene una
            responsabilidad específica y se comunica entre sí de manera
            eficiente utilizando RabbitMQ. La API, desarrollada en Node.js y
            utilizando una base de datos relacional PostgreSQL con Prisma como
            ORM, gestiona todas las solicitudes relacionadas con la
            autenticación, el CRUD de usuarios, animales y los chats. Además,
            cuenta con un servicio de envío de correos electrónicos para
            notificaciones, un servidor de websockets para comunicaciones en
            tiempo real, un asistente de IA implementado con Express y
            LangChain, y un servicio de monitorización para garantizar la
            estabilidad del sistema. Este backend está completamente dockerizado
            y desplegado en AWS EC2, con un sólido flujo de integración y
            entrega continua (CICD) para garantizar despliegues sin problemas.
          </article>
          <header className="text-right font-lobster text-3xl  text-secondary  capitalize">
            tecnologías backend
          </header>
          <article className="flex flex-wrap justify-center xl:justify-end max-w-screen-xl mx-auto">
            {technologiesBackend.map((technology, index) => {
              return (
                <article
                  key={index}
                  className="flex flex-col w-96 p-5 text-white self-end"
                >
                  <div className="flex items-center gap-3 pb-5 self-end ">
                    <Image
                      src={technology.img}
                      width={'50px'}
                      alt={technology.title}
                    />

                    <H2Title title={technology.title} />
                  </div>
                  <div>
                    <section
                      className="text-pretty truncate h-20 leading-5  "
                      dangerouslySetInnerHTML={{
                        __html: technology.description,
                      }}
                    />
                  </div>
                  <div className="flex justify-end mr-16 ">
                    <ModalTechnologies technology={technology} />
                  </div>
                </article>
              );
            })}
          </article>
        </main>
        <footer className="py-10 flex justify-end"></footer>
      </section>
    </section>
  );
};
export default Backend;
