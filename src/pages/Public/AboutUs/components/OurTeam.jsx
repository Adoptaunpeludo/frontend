import { Avatar, Link } from '@nextui-org/react';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react';
import { H2Title, H3Title } from '../../../../components';
import { team } from '../data/team';
import ModalTeam from './ModalTeam';
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
                  <Avatar
                    isBordered
                    color="primary"
                    size="lg"
                    src={member.img}
                    className="bg-white"
                  />
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
                      <ModalTeam member={member} />
                    </div>
                  </main>
                  <footer className="flex justify-center gap-10">
                    <Link
                      href={member.github}
                      target="_blank"
                      className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
                    >
                      <IconBrandGithub /> Github
                    </Link>
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
                    >
                      <IconBrandLinkedin stroke={1} /> Linkedin
                    </Link>
                    <Link
                      href={member.mailto}
                      target="_blank"
                      className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
                    >
                      <IconMail stroke={1} /> Mail
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
