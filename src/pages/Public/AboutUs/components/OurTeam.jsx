import { Avatar, Link } from '@nextui-org/react';
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react';
import { H2Title, H3Title } from '../../../../components';
import { team } from '../data/team';
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
                      <section
                        dangerouslySetInnerHTML={{
                          __html: member.readMore,
                        }}
                      />
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
