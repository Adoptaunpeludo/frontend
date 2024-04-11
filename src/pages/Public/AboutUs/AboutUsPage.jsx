import { TitleSection } from '../../../components';

const AboutUsPage = () => {
  return (
    <main className="max-w-screen-xl w-full flex  flex-col justify-center  gap-12 h-full  py-12  mx-auto flex-grow">
      <header>
        <TitleSection title={'data?.name'} />
      </header>

      <section className="flex gap-12 max-xl:flex-col mx-auto">
        <section id="central-column" className="flex flex-col flex-1">
          <div className="relative container lg:w-164 rounded-lg bg-detail bg-cover bg-center"></div>
        </section>
        <section></section>
      </section>
    </main>
  );
};

export default AboutUsPage;
