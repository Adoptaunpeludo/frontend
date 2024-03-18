import { Spinner } from '@nextui-org/react';
import { Panel } from '../../../components';
import FeaturedPets from '../components/FeaturedPets';
import { useAnimals } from '../useAnimals';

const FeaturedAnimals = ({ page }) => {
  const { data, isLoading } = useAnimals(page, { limit: 4 });

  const background =
    page === 'cats'
      ? "max-w-screen-xl w-full flex gap-3 justify-end max-sm:justify-center  px-5  h-max  bg-left-bottom bg-auto bg-no-repeat bg-[url('/backgrounds/featured-cats.jpg')]"
      : "max-w-screen-xl w-full flex gap-3 justify-start bg-[url('/backgrounds/featured-dogs.jpg')] bg-no-repeat bg-right-bottom max-sm:justify-center  px-5  h-max ";

  return (
    <section
      id='featured-cats'
      className={`w-full bg-${
        page === 'cats' ? 'black' : 'white'
      } relative flex justify-center`}
    >
      <main id={`featured-${page}-content`} className={background}>
        <Panel className={`max-w-2xl px-4 py-4 mb-80 background-panel-${page}`}>
          {isLoading ? (
            <Spinner />
          ) : (
            <FeaturedPets
              title={page === 'cats' ? 'Gatetes' : 'Perretes'}
              pets={data.animals}
            ></FeaturedPets>
          )}
        </Panel>
      </main>

      <div id='vector' className='absolute bottom-0 w-full'>
        <img
          src={`/backgrounds/featured-${page}-vector.png`}
          className='w-screen'
        />
      </div>
    </section>
  );
};
export default FeaturedAnimals;
