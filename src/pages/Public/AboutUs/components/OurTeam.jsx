import { Avatar, Link } from '@nextui-org/react';
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react';
import { H2Title, H3Title } from '../../../../components';

const team = [
  {
    img: '/public/logoTech/aws.svg',
    person: 'José Alberto Delgado',
    position: 'Backend Lead',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
    github: 'https://github.com/JoseAlbDR',
    linkdin: 'https://www.linkedin.com/in/jalbertodelgado/',
    mailto: 'josealbdr84@gmail.com',
  },
  {
    img: '/public/logoTech/aws.svg',
    person: 'Juan Manuel Acosta',
    position: 'UX/UI, Fronted dev ',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
    github: 'https://github.com/jmacosta',
    linkdin: 'https://www.linkedin.com/in/juan-manuel-acosta-benitez/',
    mailto: 'mailto:jmab2k@gmail.com',
  },

  {
    img: '/public/logoTech/aws.svg',
    person: 'Pol Valle',
    position: 'Frontend dev',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
    github: 'https://github.com/Doplax',
    linkdin: 'https://www.linkedin.com/in/pol-valle-montes/',
    mailto: 'mailto:doplax@gmail.com ',
  },
  {
    img: '/public/logoTech/aws.svg',
    person: 'Francisco Suárez',
    position: 'Frontend dev',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra dui ac ante viverra vestibulum. Suspendisse non orci eget ipsum venenatis egestas ut a odio. Suspendisse finibus placerat lectus vel vulputate. Sed sodales a est et sodales. In hac habitasse platea dictumst. Sed velit neque, imperdiet sed fringilla mattis, consequat nec ligula. Praesent molestie libero nibh, sed sollicitudin dolor faucibus ut.',
    link: 'dsds',
    github: 'https://github.com/PaquitoGR',
    linkdin: 'https://www.linkedin.com/in/francisco-a-suarez/',
    mailto: '',
  },
];

export const OurTeam = () => {
  return (
    <section className=" w-full  py-10 flex flex-col justify-center mx-auto px-10">
      <header className="text-center font-lobster text-5xl  text-secondary pb-10">
        Nuestro equipo
      </header>
      <main className="flex flex-wrap max-w-screen-xl mx-auto justify-center">
        {team.map((member, index) => {
          return (
            <article key={index} className="flex  lg:w-128 pb-10 ">
              <div className="flex gap-3 ">
                <div className="w-20 h-20">
                  <Avatar isBordered color="primary" size="lg" className="" />
                </div>

                <section>
                  <header>
                    <H2Title title={member.person} />
                    <H3Title title={member.position} />
                  </header>
                  <main className="p-2">
                    <p className="text-pretty truncate h-20 leading-5 max-w-96">
                      {member.description}
                    </p>
                    <div className="flex justify-end">
                      <Link
                        className="text-tertiary flex items-center gap-2 py-3"
                        href="#"
                      >
                        Leer más
                        <IconArrowRight
                          stroke={1}
                          className="stroke-tertiary"
                        />
                      </Link>
                    </div>
                  </main>
                  <footer className="flex justify-center gap-10">
                    <Link href={member.github} target="_blank">
                      <IconBrandGithub className="stroke-white fill-tertiary size-10" />
                    </Link>
                    <Link href={member.linkdin} target="_blank">
                      <IconBrandLinkedin
                        stroke={1}
                        className="stroke-tertiary size-10"
                      />
                    </Link>
                    <Link href={member.mailto} target="_blank">
                      <IconMail
                        stroke={1}
                        className="stroke-white fill-tertiary size-10"
                      />
                    </Link>
                  </footer>
                </section>
              </div>
            </article>
          );
        })}
      </main>
    </section>
  );
};
export default OurTeam;
