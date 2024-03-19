import { Spinner } from '@nextui-org/react';

import FeaturedPets from '../components/FeaturedPets';
import { useAnimals } from '../useAnimals';
import { Panel } from '../../../../components';

const FeaturedCats = () => {
  const { data, isLoading } = useAnimals('cats', { limit: 4 });

  return (
    <section
      id="featured-cats"
      className="w-full     bg-black  relative flex justify-center"
    >
      <main
        id="featured-cats-content"
        className="max-w-screen-xl w-full flex gap-3 justify-end max-sm:justify-center  px-5  h-max  bg-left-bottom bg-auto bg-no-repeat bg-[url('/backgrounds/featured-cats.jpg')]"
      >
        <Panel className="max-w-2xl px-4 py-4 mb-80 background-panel-cats">
          {isLoading ? (
            <Spinner />
          ) : (
            <FeaturedPets title={'Gatetes'} pets={data.animals}></FeaturedPets>
          )}
        </Panel>
      </main>

      <div id="vector" className="absolute bottom-0 w-full">
        <img src="/backgrounds/featured-cats-vector.png" className="w-screen" />
      </div>
    </section>
  );
};
export default FeaturedCats;
