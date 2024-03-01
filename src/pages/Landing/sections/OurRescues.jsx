import AdoptedIcon from '../../../assets/adopted.svg?react';
import FosterIcon from '../../../assets/foster.svg?react';
import WaitingIcon from '../../../assets/waiting.svg?react';
const OurRescues = () => {
  return (
    <section id='our-rescues' className='bg-[#E4E4E7] '>
      <main className='max-w-screen-xl w-screen-xl flex flex-col gap-3 h-full items-center  mx-auto px-5 '>
        <div
          id='our-rescues-content'
          className='flex flex-col max-w-screen-xl w-screen h-max my-auto gap-1 '
        >
          <div
            id='our-rescues-title'
            className='font-lobster text-7xl text-secondary flex justify-center text-center '
          >
            Nuestros rescatados
          </div>
          <div className='font-poppins text-2xl flex justify-center font-bold '>
            Adopción y cuidado continuo
          </div>

          <div
            id='goals'
            className='my-4 max-w-screen-xl w-full flex max-lg:flex-col  justify-evenly px-12 py-12 gap-5'
          >
            <div id='adopted-frame' className='flex flex-col items-center'>
              <div id='adopted-icon'>
                <AdoptedIcon />
              </div>
              <div id='adopted-text' className='flex flex-col items-center'>
                <div className='font-lobster text-8xl'>99</div>
                <div className='text-1xl font-bold'>Adoptados</div>
              </div>
            </div>
            <div id='foster-frame' className='flex flex-col items-center'>
              <div id='foster-icon'>
                <FosterIcon />
              </div>
              <div id='foster-text' className='flex flex-col items-center'>
                <div className='font-lobster text-8xl'>99</div>
                <div className='text-1xl font-bold'>En acogida</div>
              </div>
            </div>
            <div id='waiting-frame' className='flex flex-col items-center'>
              <div id='waiting-icon'>
                <WaitingIcon />
              </div>
              <div id='waiting-text' className='flex flex-col items-center'>
                <div className='font-lobster text-8xl'>99</div>
                <div className='text-1xl font-bold'>Esperando un hogar</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
export default OurRescues;
