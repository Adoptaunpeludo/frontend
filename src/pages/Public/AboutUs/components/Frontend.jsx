import { Image } from '@nextui-org/react';
import { H2Title } from '../../../../components';
import { technologiesFrontend } from '../data/technologies';
import ModalTechnologies from './ModalTechnologies';

export const Frontend = () => {
  return (
    <section className="w-full min-h-80 bg-white flex flex-col justify-center mx-auto px-10">
      <section className=" max-w-screen-xl w-full   mx-auto">
        <header className="flex justify-start font-lobster text-5xl  text-primary py-10 ">
          Front-end
        </header>
        <main className="flex justify-start  flex-col gap-5 ">
          <article className="text-pretty font-poppins leading-6 max-w-screen-md pb-20">
            Adopta un Peludo es el frontend de un proyecto más amplio destinado
            a facilitar la adopción de animales. Las protectoras de animales
            pueden subir anuncios de mascotas disponibles para adopción,
            mientras que los potenciales adoptantes pueden buscar animales, ver
            detalles y contactar a las protectoras para iniciar el proceso de
            adopción.
          </article>
          <header className="text-start font-lobster text-3xl  text-secondary  capitalize">
            tecnologías Frontend
          </header>
          <article className="flex flex-wrap justify-center xl:justify-start max-w-screen-xl mx-auto">
            {technologiesFrontend.map((technology, index) => {
              return (
                <article key={index} className="flex flex-col w-96 p-5">
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
                  </div>
                  <div className="flex justify-end mr-16 ">
                    <ModalTechnologies technology={technology} />
                  </div>
                </article>
              );
            })}
          </article>
        </main>
        <footer className="py-10"></footer>
      </section>
    </section>
  );
};
export default Frontend;
