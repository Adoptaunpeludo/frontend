import { Button, Link } from '@nextui-org/react';

export const Backend = () => {
  return (
    <section className="w-full min-h-80 bg-black flex flex-col justify-center px-10">
      <section className=" max-w-screen-xl w-full   mx-auto">
        <header className="flex justify-end font-lobster text-5xl  text-primary py-10 ">
          Arquitectura Back-end
        </header>
        <main className=" flex justify-end gap-5 w-full">
          <article className="text-pretty font-poppins leading-6 text-white max-w-screen-md text-right">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            pellentesque tempus lacinia. Sed mattis in magna non malesuada.
            Suspendisse eu nisl sodales purus malesuada lacinia. Aliquam nec
            odio a justo pellentesque semper vitae molestie ipsum. Ut semper
            commodo maximus. Duis egestas sed justo eget molestie. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia curae; Mauris dui augue, finibus et nulla a, ornare congue
            ex. Aenean magna mauris, consequat ac nisl ut, ornare varius mauris.
            Fusce dui diam, maximus eget vestibulum vitae, cursus eu leo.
            Curabitur aliquet dapibus lacus lobortis pharetra. Pellentesque
            lacus massa, varius nec pretium nec, sagittis id massa. Nam id
            ultrices purus, ullamcorper pellentesque dui. Pellentesque ligula
            lorem, auctor consectetur justo id, semper accumsan dolor.
          </article>
        </main>
        <footer className="py-10 flex justify-end">
          <Link href="http://www.google.es" target="_blank">
            <Button className="font-lobster text-3xl bg-primary text-white py-6 px-5 capitalize">
              Ver diagrama
            </Button>
          </Link>
        </footer>
      </section>
    </section>
  );
};
export default Backend;
