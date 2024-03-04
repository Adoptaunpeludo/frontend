
import { Panel } from '../../shared';
import FeaturedPets from '../components/FeaturedPets';
const pets = [
  { image: 'perrete-01.jpg', name: 'Max', age: 'Cachorro', breed: 'Lebrel' },
  { image: 'perrete-01.jpg', name: 'Max', age: 'Cachorro', breed: 'Lebrel' },
  { image: 'perrete-01.jpg', name: 'Max', age: 'Cachorro', breed: 'Lebrel' },
  { image: 'perrete-01.jpg', name: 'Max', age: 'Cachorro', breed: 'Lebrel' }
];

const FeaturedDogs = () => {
  return (
    <section
      id='featured-dogs'
      className="w-full  max-h-screen  bg-right-bottom bg-auto bg-no-repeat h-screen bg-white bg-[url('/backgrounds/featured-dogs.jpg')] relative"
    >
      <main
        id='featured-dogs-content'

        className='max-w-screen-xl w-full flex gap-3 justify-start max-sm:justify-center  px-5  h-max '
      >
        <Panel className='max-w-2xl px-4 py-4 mb-72 '>
          <FeaturedPets title={'Perretes'} pets={pets}></FeaturedPets>
        </Panel>
      </main>

      <div id='vector' className='absolute bottom-0 w-full'>
        <img
          src='/backgrounds/featured-dogs-vector.png'
          className='w-screen'
        ></img>
      </div>
    </section>
  );
};
export default FeaturedDogs;
