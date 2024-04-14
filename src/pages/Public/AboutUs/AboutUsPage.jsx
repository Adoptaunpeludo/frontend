import Architecture from './components/Architecture';
import BackendArchitecture from './components/BackendArchitecture';
import DatabaseAndOtherServices from './components/DatabaseAndOtherServices';
import { FrontendArchitecture } from './components/FrontendArchitecture';
import OurTeam from './components/OurTeam';
import Technologies from './components/Technologies';

const AboutUsPage = () => {
  return (
    <>
      <header className="w-full bg-[url('/backgrounds/aboutus.png')] h-96 bg-center bg-cover bg-no-repeat" />

      <main className=" w-full flex  flex-col justify-center  mx-auto flex-grow">
        <OurTeam />
        <Architecture />
        <FrontendArchitecture />
        <BackendArchitecture />
        <DatabaseAndOtherServices />
        <Technologies />
      </main>
    </>
  );
};

export default AboutUsPage;
