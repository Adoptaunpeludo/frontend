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
              <ModalHeader className="flex flex-col gap-1">
                <div className="w-full flex justify-center py-3">
                  <Avatar
                    isBordered
                    color="primary"
                    size="lg"
                    className="bg-white"
                    src={member.img}
                  />
                </div>
                <H2Title title={member.person} />
                <H3Title title={member.position} />
              </ModalHeader>
              <ModalBody className="">
                <main className="p-2">
                  <MemberTeam member={member.readMore} />
                </main>
                <footer className="flex justify-center gap-10">
                  <Link href={member.github} isExternal>
                    <IconBrandGithub className="stroke-white fill-tertiary size-10" />
                  </Link>
                  <Link href={member.linkedin} isExternal>
                    <IconBrandLinkedin
                      stroke={1}
                      className="stroke-tertiary size-10"
                    />
                  </Link>
                  <Link href={member.mailto} isExternal>
                    <IconMail
                      stroke={1}
                      className="stroke-white fill-tertiary size-10"
                    />
                  </Link>
                  {member.portFolio !== '' && (
                    <Link href={member.portFolio} target="_blank">
                      <IconClipboard
                        stroke={1}
                        className="stroke-tertiary size-10"
                      />
                    </Link>
                  )}
                  {member.resume !== '' && (
                    <Link href={member.resume} isExternal>
                      <IconUserSquare
                        stroke={1}
                        className="stroke-tertiary size-10"
                      />
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
