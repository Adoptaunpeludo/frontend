import { Button, Link } from '@nextui-org/react';

export const FrontendArchitecture = () => {
  return (
    <section className="w-full min-h-80 bg-white flex flex-col justify-center mx-auto px-10">
      <section className=" max-w-screen-xl w-full   mx-auto">
        <header className="flex justify-start font-lobster text-5xl  text-secondary py-10">
          Arquitectura Front-end
        </header>
        <main className="flex justify-start  flex-col gap-5 max-w-screen-md">
          <article className="text-pretty font-poppins leading-6">
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
        <footer className="py-10">
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
export default FrontendArchitecture;
