import { Button, Image, Link } from '@nextui-org/react';

export const DatabaseAndOtherServices = () => {
  return (
    <section className="w-full min-h-80  flex flex-col justify-center mx-auto px-10">
      <section className=" max-w-screen-xl w-full   mx-auto">
        <header className="flex justify-start font-lobster text-5xl  text-secondary py-10 ">
          Diagrama Entidad-Relación de la Base de Datos
        </header>
        <main className="flex justify-end gap-5 w-full flex-col">
          <article className="text-pretty font-poppins leading-6  max-w-screen-md ">
            Explora la estructura y las relaciones de nuestra base de datos
            mediante el diagrama entidad-relación, que ofrece una representación
            visual clara y concisa de su diseño.
          </article>

          <article className=" max-w-screen-xl w-full flex flex-col justify-center mx-auto mb-5">
            <Link
              href="https://app.eraser.io/workspace/2zsIHy4kYoNR06OS28Er?elements=3usosqcYz6oZYbeadIwRVw"
              isExternal
            >
              <figure>
                <figcaption className="border-b-1 border-primary text-lg font-poppins text-foreground mb-5 pb-3 font-semibold">
                  Diagrama entidad relación de la base de datos
                </figcaption>
                <Image src="https://app.eraser.io/workspace/2zsIHy4kYoNR06OS28Er/preview?elements=3usosqcYz6oZYbeadIwRVw&type=embed" />
              </figure>
            </Link>
          </article>
        </main>
        <footer className="py-10 flex justify-end">
          <Link
            href="https://app.eraser.io/workspace/2zsIHy4kYoNR06OS28Er?elements=3usosqcYz6oZYbeadIwRVw"
            isExternal
          >
            <Button className="font-lobster text-2xl bg-primary text-white py-6 px-5 capitalize">
              Explorar Diagrama E-R
            </Button>
          </Link>
        </footer>
      </section>
    </section>
  );
};
export default DatabaseAndOtherServices;
