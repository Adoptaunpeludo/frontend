import { Button, Image, Link, useDisclosure } from '@nextui-org/react';

export const Architecture = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="w-full min-h-80 bg-white flex flex-col justify-center mx-auto px-10">
      <section className=" max-w-screen-xl w-full   mx-auto">
        <header className="flex justify-start font-lobster text-5xl  text-secondary py-10 capitalize">
          Arquitectura de la Aplicación
        </header>
        <main className="flex justify-start  flex-col gap-5 ">
          <article className="text-pretty font-poppins leading-6 max-w-screen-md">
            Para comprender mejor la estructura y el flujo de nuestra
            aplicación, presentamos el diagrama de arquitectura que ilustra de
            manera visual la disposición de sus componentes principales y sus
            interacciones.
          </article>
          <article className=" max-w-screen-xl w-full flex flex-col justify-center mx-auto mb-5">
            <Link
              href="https://app.eraser.io/workspace/D58PzFABY4wKu58IJIUg"
              isExternal
            >
              <figure>
                <figcaption className="border-b-1 border-primary text-lg font-poppins text-foreground mb-5 pb-3 font-semibold">
                  Diagrama de Arquitectura de la Aplicación
                </figcaption>
                <Image src="https://app.eraser.io/workspace/D58PzFABY4wKu58IJIUg/preview?elements=jkA_jeuY3_kG_no1zUPq8Q&type=embed" />
              </figure>
              {/* {<Image src="/architecture/architecture.png" />} */}
            </Link>
          </article>
        </main>
        <footer className="py-10 flex justify-end">
          <Link
            href="https://app.eraser.io/workspace/D58PzFABY4wKu58IJIUg"
            isExternal
          >
            <Button className="font-lobster text-2xl bg-primary text-white py-6 px-5 capitalize">
              Ver Diagrama Completo
            </Button>
          </Link>
        </footer>
      </section>
    </section>
  );
};

export default Architecture;

// <>
//   <header className="text-center font-lobster text-5xl  text-secondary pb-10">
//     La Arquitectura
//   </header>
//   <Button
//     onPress={onOpen}
//     className="w-[50%] h-[50%] max-w-screen-xl p-0 flex flex-col justify-center mx-auto mb-5"
//   >
//     <Image src="/architecture/architecture.png" />
//   </Button>
//   <Modal
//     isOpen={isOpen}
//     onOpenChange={onOpenChange}
//     size="full"
//     scrollBehavior="outside"
//   >
//     <ModalContent className="bg-stone-300">
//       {(onClose) => (
//         <>
//           <ModalHeader className="flex flex-col gap-1">
//             Arquitectura
//           </ModalHeader>
//           <ModalBody className="bg-stone-300">
//             <Image src="/architecture/architecture.png" />
//           </ModalBody>
//           <ModalFooter className="bg-stone-300">
//             <Button color="danger" variant="light" onPress={onClose}>
//               Close
//             </Button>
//           </ModalFooter>
//         </>
//       )}
//     </ModalContent>
//   </Modal>
//   <a
//     href="https://app.eraser.io/workspace/2zsIHy4kYoNR06OS28Er?elements=6RmopbrhjBPvhifjhFkkJQ"
//     target="_blank"
//   >
//     View on Eraser
//     <br />
//     <img src="https://app.eraser.io/workspace/2zsIHy4kYoNR06OS28Er/preview?elements=6RmopbrhjBPvhifjhFkkJQ&type=embed" />
//   </a>
// </>

<a href="https://app.eraser.io/workspace/D58PzFABY4wKu58IJIUg?elements=jkA_jeuY3_kG_no1zUPq8Q">
  View on Eraser
  <br />
  <img src="https://app.eraser.io/workspace/D58PzFABY4wKu58IJIUg/preview?elements=jkA_jeuY3_kG_no1zUPq8Q&type=embed" />
</a>;
