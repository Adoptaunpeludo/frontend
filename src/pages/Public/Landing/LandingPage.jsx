import {
  AdoptVsBuy,
  FeaturedAnimals,
  // FeaturedCats,
  // FeaturedDogs,
  FeaturedShelters,
  GetInvolved,
  HeroHome,
  JoinNewsletter,
  OurRescues,
} from './sections';
import { animalsQuery } from './useAnimals';

export const loader = (queryClient) => () => {
  const { data: cats } = queryClient.ensureQueryData(
    animalsQuery('cats', { limit: 4 })
  );
  const { data: dogs } = queryClient.ensureQueryData(
    animalsQuery('dogs', { limit: 4 })
  );
  const { data: animals } = queryClient.ensureQueryData(animalsQuery('all'));

  return { cats, dogs, animals };
};

const LandingPage = () => {
  return (
    <main className="flex-grow">
      <HeroHome />
      <GetInvolved />
      {/* <FeaturedDogs /> */}
      <FeaturedAnimals page="dogs" />
      <AdoptVsBuy />
      {/* <FeaturedCats /> */}
      <FeaturedAnimals page="cats" />
      <OurRescues />
      <FeaturedShelters />
      <JoinNewsletter />
    </main>
  );
};

export default LandingPage;
