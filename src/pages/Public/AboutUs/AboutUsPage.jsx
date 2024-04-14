import {
  Architecture,
  Backend,
  DatabaseAndOtherServices,
  Frontend,
  OurTeam,
  Technologies,
} from './components';

const AboutUsPage = () => {
  return (
    <>
      <header className="w-full bg-[url('/backgrounds/aboutus.png')] h-96 bg-center bg-cover bg-no-repeat" />

      <main className=" w-full flex  flex-col justify-center  mx-auto flex-grow">
        <OurTeam />
        <Architecture />
        <DatabaseAndOtherServices />
        <Frontend />
        <Backend />

        <Technologies />
      </main>
    </>
  );
};

export default AboutUsPage;
