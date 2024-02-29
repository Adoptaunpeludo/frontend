import { Button } from '@nextui-org/react';
import Imago from '../../../assets/logos/imago.svg?react';
const HeroHome = () => {
  return (
    <section
      id='hero-home'
      className="w-full bg-[url('/hero/home-hero.png')] h-screen bg-top bg-cover bg-no-repeat"
    >
      <main className='max-w-screen-xl w-full flex flex-col gap-3 h-full justify-start  mx-auto px-5'>
        <div
          id='hero-content'
          className='flex flex-col max-w-lg h-max my-auto gap-1'
        >
          <div id='hero-image' className='flex flex-col mx-auto'>
            <Imago />
          </div>
          <div id='hero-text' className='flex flex-col justify-start '>
            <div className='font-poppins text-xs'>
              NON-PROFIT ANIMAL SHELTER
            </div>
            <div className='font-lobster text-7xl text-secondary'>
              Adopta un peludo
            </div>
            <div className='my-4 text-pretty max-w-md'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur
              </p>
            </div>
          </div>
          <div id='hero-CTA' className='flex flex-col justify-center mx-auto'>
            <Button size='md' color='primary' className='w-32'>
              <span className='font-lobster text-xl text-white'>Adopta</span>
            </Button>
          </div>
        </div>
      </main>
    </section>
  );
};
export default HeroHome;
