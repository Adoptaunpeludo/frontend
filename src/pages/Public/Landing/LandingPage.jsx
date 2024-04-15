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
import { Skeleton } from '@nextui-org/react';

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
