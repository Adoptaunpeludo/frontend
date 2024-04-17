import { Button, Link } from '@nextui-org/react';

export const OurTeamCta = () => {
  return (
    <section className=" w-full  pt-0 pb-16 flex flex-col justify-center mx-auto px-10 bg-[#E4E4E7] ">
      <main className="flex flex-wrap max-w-screen-xl mx-auto justify-center ">
        <Button
          className="font-lobster w-full h-12 bg-primary font-medium text-3xl text-foreground"
          as={Link}
          href="/about"
        >
          Descubre nuestro trabajo
        </Button>
      </main>
    </section>
  );
};
export default OurTeamCta;
