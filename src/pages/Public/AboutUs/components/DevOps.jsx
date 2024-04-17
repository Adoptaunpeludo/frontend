import { Image } from '@nextui-org/react';

import { H2Title } from '../../../../components';
import { technologiesDevops } from '../data/technologies';
import ModalTechnologies from './ModalTechnologies';
export const DevOps = () => {
  return (
    <section className="w-full min-h-80 bg-white flex flex-col justify-center mx-auto px-10 pb-10">
      <section className=" max-w-screen-xl w-full   mx-auto">
        <header className="flex justify-start font-lobster text-5xl  text-primary py-10 ">
          DevOps
        </header>
        <main className="flex justify-start  flex-col gap-5 ">
          <article className="text-pretty font-poppins leading-6 max-w-screen-md ">
            <p className="pb-5">
              En la sección DevOps de adoptaunpeludo.com, hemos aplicado una
              variedad de tecnologías y prácticas para garantizar un despliegue
              eficiente y confiable de la aplicación. Utilizamos AWS EC2 para
              alojar la aplicación y Docker para contenerizarla, lo que nos
              permite tener un entorno de desarrollo consistente y portátil.
            </p>
            <p className="pb-5">
              Para la implementación continua y la entrega continua (CI/CD),
              aprovechamos GitHub Actions, lo que automatiza el proceso de
              construcción, prueba y despliegue de la aplicación con cada cambio
              de código. Utilizamos NGINX como un proxy inverso para servir
              todos los servicios del backend y el frontend, mejorando la
              eficiencia y la seguridad de la aplicación.
            </p>
          </article>
          <header className="text-start font-lobster text-3xl  text-secondary  capitalize">
            tecnologías devOps
          </header>
          <article className="flex flex-wrap justify-center xl:justify-start max-w-screen-xl mx-auto">
            {technologiesDevops.map((technology, index) => {
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
export default DevOps;
