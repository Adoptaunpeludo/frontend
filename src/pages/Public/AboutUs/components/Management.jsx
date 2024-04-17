import { Image } from '@nextui-org/react';

import { H2Title } from '../../../../components';
import { technologiesManagement } from '../data/technologies';
import ModalTechnologies from './ModalTechnologies';

export const Management = () => {
  return (
    <section className="w-full min-h-80 bg-white flex flex-col justify-center mx-auto px-10 pb-10">
      <section className=" max-w-screen-xl w-full   mx-auto">
        <header className="flex justify-start font-lobster text-5xl  text-primary py-10 ">
          Product Management
        </header>
        <main className="flex justify-start  flex-col gap-5 ">
          <article className="text-pretty font-poppins leading-6 max-w-screen-md ">
            <p className="pb-5">
              En nuestro proceso de desarrollo, utilizamos una combinación de
              tres herramientas clave: Trello, Figma y GitHub, para gestionar
              eficazmente nuestro producto y garantizar un flujo de trabajo
              fluido y colaborativo.
            </p>
            <p className="pb-5">
              En resumen, estas tres herramientas nos han proporcionado un
              conjunto completo de soluciones para la gestión efectiva de
              nuestro producto, desde la planificación y el diseño hasta la
              implementación y el seguimiento del desarrollo. Su uso conjunto ha
              mejorado la colaboración dentro del equipo, aumentado la
              transparencia en el proceso de desarrollo y garantizado la entrega
              oportuna de funcionalidades de alta calidad dentro de los plazos
              fijados.
            </p>
          </article>
          <header className="text-start font-lobster text-3xl  text-secondary  capitalize">
            tecnologías Product Management
          </header>
          <article className="flex flex-wrap justify-center xl:justify-start max-w-screen-xl mx-auto">
            {technologiesManagement.map((technology, index) => {
              return (
                <article
                  key={index}
                  className="flex flex-col w-96 p-5 self-end"
                >
                  <div className="flex items-center gap-3 pb-5">
                    <Image
                      src={technology.img}
                      width={'50px'}
                      alt={technology.title}
                    />

                    <H2Title title={technology.title} />
                  </div>
                  <div>
                    <section
                      className="text-pretty truncate h-20 leading-5 max-w-72"
                      dangerouslySetInnerHTML={{
                        __html: technology.description,
                      }}
                    />
                    <span>...</span>
                  </div>
                  <div className="flex justify-end mr-16 ">
                    <ModalTechnologies technology={technology} />
                  </div>
                </article>
              );
            })}
          </article>
        </main>
      </section>
    </section>
  );
};
export default Management;
