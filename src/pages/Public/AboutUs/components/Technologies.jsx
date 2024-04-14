import { Image } from '@nextui-org/react';
import React from 'react';
import { H2Title } from '../../../../components';
import { technologies } from '../data/technologies';
import ModalTechnologies from './ModalTechnologies';
export const Technologies = () => {
  return (
    <section className=" w-full  max-w-screen-xl py-10 flex flex-col justify-center mx-auto px-10">
      <header className="text-center font-lobster text-5xl  text-secondary pb-10">
        Las tecnologías
      </header>
      <main className="flex flex-wrap justify-center xl:justify-start max-w-screen-xl mx-auto">
        {technologies.map((technology, index) => {
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
      </main>
    </section>
  );
};
export default Technologies;
