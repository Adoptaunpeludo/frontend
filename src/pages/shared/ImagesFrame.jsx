import { H3Title } from './H3Title';

export const ImagesFrame = ({ images }) => {
  return (
    <div id='images' className='flex flex-col gap-5 mx-3'>
      <H3Title title='Imágenes:' />
      <div className='grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-sm:justify-items-center gap-x-5 gap-y-5 '>
        <div className=' imageProfile w-60 h-32 border-solid border-3 border-primary'></div>
        <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
        <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
        <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
        <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
        <div className=' imageProfile w-60 h-32 border-solid border-3 border-secondary'></div>
      </div>
    </div>
  );
};
