import {
  Avatar,
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconClipboard,
  IconMail,
  IconUserSquare,
} from '@tabler/icons-react';
import { H2Title, H3Title } from '../../../../components';
import { MemberTeam } from './MemberTeam';

export const ModalTeam = ({ member = '' }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} variant="light">
        <span className="text-tertiary font-poppins">Leer más</span>

        <IconArrowRight stroke={1} className="stroke-tertiary" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        className="max-h-dvh overflow-y-auto"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex  gap-3 justify-start items-center">
                <div className=" flex  py-3">
                  <Avatar
                    isBordered
                    color="primary"
                    size="lg"
                    className="bg-white w-24 h-24"
                    src={member.img}
                  />
                </div>
                <div className="flex flex-col pt-5">
                  <H2Title title={member.person} />
                  <H3Title title={member.position} />
                </div>
              </ModalHeader>
              <ModalBody className="">
                <main className="p-2">
                  <MemberTeam member={member.readMore} />
                </main>
                <footer className="flex justify-center gap-10">
                  <Link
                    href={member.github}
                    isExternal
                    className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
                  >
                    <IconBrandGithub stroke={1} /> Github
                  </Link>
                  <Link
                    href={member.linkedin}
                    isExternal
                    className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
                  >
                    <IconBrandLinkedin stroke={1} /> Linkedin
                  </Link>
                  <Link
                    href={member.mailto}
                    isExternal
                    className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
                  >
                    <IconMail stroke={1} /> Mail
                  </Link>
                  {member.portFolio !== '' && (
                    <Link
                      href={member.portFolio}
                      target="_blank"
                      className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
                    >
                      <IconClipboard stroke={1} /> Portfolio
                    </Link>
                  )}
                  {member.resume !== '' && (
                    <Link
                      href={member.resume}
                      isExternal
                      className="text-tertiary font-poppins font-semibold mr-1 flex self-baseline pt-3"
                    >
                      <IconUserSquare stroke={1} /> CV
                    </Link>
                  )}
                </footer>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="solid" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalTeam;
