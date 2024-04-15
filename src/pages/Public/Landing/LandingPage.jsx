import { useNavigation } from 'react-router-dom';
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
import { Skeleton } from '@nextui-org/react';

export const loader = (queryClient) => () => {
  const { data: cats } = queryClient.ensureQueryData(animalsQuery('cats'));
  const { data: dogs } = queryClient.ensureQueryData(animalsQuery('dogs'));
  const { data: animals } = queryClient.ensureQueryData(animalsQuery('all'));

  return { cats, dogs, animals };
};

const LandingPage = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  return (
    <Skeleton isLoaded={!isLoading}>
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
    </Skeleton>
  );
};

export default LandingPage;
