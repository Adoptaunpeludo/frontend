import { useLoaderData } from 'react-router-dom';
import {
  AdoptVsBuy,
  FeaturedCats,
  FeaturedDogs,
  FeaturedShelters,
  GetInvolved,
  HeroHome,
  JoinNewsletter,
  OurRescues,
} from './sections';
import { animalsQuery } from './useAnimals';

export const loader = (queryClient) => () => {
  const { data: cats } = queryClient.ensureQueryData(animalsQuery('cats'));
  const { data: dogs } = queryClient.ensureQueryData(animalsQuery('dogs'));

  return { cats, dogs };
};

const LandingPage = () => {
  const { cats, dogs } = useLoaderData();

  console.log({ cats, dogs });

  return (
    <main>
      <HeroHome />
      <GetInvolved />
      <FeaturedDogs />
      <AdoptVsBuy />
      <FeaturedCats />
      <OurRescues />
      <FeaturedShelters />
      <JoinNewsletter />
    </main>
  );
};

export default LandingPage;
