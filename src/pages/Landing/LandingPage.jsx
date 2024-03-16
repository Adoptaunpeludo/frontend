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
  const { data: cats } = queryClient.ensureQueryData(
    animalsQuery('cats', { limit: 5 })
  );
  const { data: dogs } = queryClient.ensureQueryData(
    animalsQuery('dogs', { limit: 5 })
  );

  return { cats, dogs };
};

const LandingPage = () => {
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
