import Panel from '../../shared/Panel';
import FeaturedPets from '../components/FeaturedPets';
const pets = [
  {
    image: 'gatete-01.jpg',
    name: 'Silvester',
    age: 'Cachorro',
    breed: 'Scottish Fold'
  },
  {
    image: 'gatete-01.jpg',
    name: 'Silvester',
    age: 'Cachorro',
    breed: 'Scottish Fold'
  },
  {
    image: 'gatete-01.jpg',
    name: 'Silvester',
    age: 'Cachorro',
    breed: 'Scottish Fold'
  },
  {
    image: 'gatete-01.jpg',
    name: 'Silvester',
    age: 'Cachorro',
    breed: 'Scottish Fold'
  }
];
const FeaturedCats = () => {
  return (
    <section
      id='featured-cats'
      className="w-full   bg-left-bottom bg-auto bg-no-repeat h-max bg-black bg-[url('/backgrounds/featured-cats.jpg')] relative flex justify-center"
    >
      <main
        id='featured-cats-content'
        className='max-w-screen-xl w-full flex gap-3 justify-end max-sm:justify-center  px-5  h-max '
      >
        <Panel className='max-w-2xl px-4 py-4 mb-52 background-panel-cats'>
          <FeaturedPets title={'Gatetes'} pets={pets}></FeaturedPets>
        </Panel>
      </main>
      <div id='vector' className='absolute bottom-0 w-full'>
        <img src='/backgrounds/featured-cats-vector.png' className='w-screen' />
      </div>
    </section>
  );
};
export default FeaturedCats;
