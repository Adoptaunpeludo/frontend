import { Spinner } from '@nextui-org/react';
import { Panel } from '../../../components';
import FeaturedPets from '../components/FeaturedPets';
import { useAnimals } from '../useAnimals';

const FeaturedDogs = () => {
  const { data, isLoading } = useAnimals('dogs', { limit: 5 });

  return (
    <section
      id="featured-dogs"
      className="w-full bg-white  relative flex justify-center"
    >
      <main
        id="featured-dogs-content"
        className="max-w-screen-xl w-full flex gap-3 justify-start bg-[url('/backgrounds/featured-dogs.jpg')] bg-no-repeat bg-right-bottom max-sm:justify-center  px-5  h-max "
      >
        <Panel className="max-w-2xl px-4 py-4 mb-72 ">
          {isLoading ? (
            <Spinner />
          ) : (
            <FeaturedPets title={'Perretes'} pets={data.animals} />
          )}
        </Panel>
      </main>

      <div id="vector" className="absolute bottom-0 w-full">
        <img
          src="/backgrounds/featured-dogs-vector.png"
          className="w-screen"
        ></img>
      </div>
    </section>
  );
};
export default FeaturedDogs;
