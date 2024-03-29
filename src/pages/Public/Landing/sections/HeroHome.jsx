import { AdoptButton } from '../../../../components';
import { Imago } from '../components/Imago';

const HeroHome = () => {
  return (
    <section
      id="hero-home"
      className="w-full bg-[url('/hero/home-hero.png')] h-screen bg-top bg-cover bg-no-repeat "
    >
      <main className="max-w-screen-xl w-full flex flex-col gap-3 h-full justify-start  mx-auto px-5  max-sm:bg-white max-sm:bg-opacity-25 max-sm:text-lg max-sm:font-semibold max-sm:leading-tight">
        <div
          id="hero-content"
          className="flex flex-col max-w-lg h-max my-auto gap-1"
        >
          <div id="hero-image" className="flex flex-col mx-auto">
            <Imago />
          </div>
          <div id="hero-text" className="flex flex-col justify-start ">
            <div className="font-poppins text-xs">
              NON-PROFIT ANIMAL SHELTER
            </div>
            <div className="font-lobster text-7xl text-secondary">
              Adopta un peludo
            </div>
            <div className="my-4 text-pretty max-w-md">
              <p className="mx-5 font-medium">
                ¡Dale un hogar y amor a un amigo peludo! Encuentra tu compañero
                perfecto en Adopta un Peludo. Adopta hoy y transforma vidas.
              </p>
            </div>
          </div>
          <div id="hero-CTA" className="flex flex-col justify-center mx-auto">
            <AdoptButton />
          </div>
        </div>
      </main>
    </section>
  );
};
export default HeroHome;
