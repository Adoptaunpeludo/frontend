import {
  Architecture,
  Backend,
  DatabaseAndOtherServices,
  DevOps,
  Frontend,
  Management,
  OurTeam,
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
        <DevOps />
        <Management />
      </main>
    </>
  );
};

export default AboutUsPage;
