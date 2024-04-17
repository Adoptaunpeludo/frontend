import { Skeleton } from '@nextui-org/react';
import { useNavigation } from 'react-router-dom';

import { OurTeam } from '../AboutUs/components/OurTeam';
import {
  AdoptVsBuy,
  FeaturedAnimals,
  FeaturedShelters,
  GetInvolved,
  HeroHome,
  JoinNewsletter,
  OurRescues,
} from './sections';
import OurTeamCta from './sections/OurTeamCta';

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
        <OurTeam />
        <OurTeamCta />
        <FeaturedShelters />
        <JoinNewsletter />
      </main>
    </Skeleton>
  );
};

export default LandingPage;
