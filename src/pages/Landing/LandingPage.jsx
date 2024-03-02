import {
  AdoptVsBuy,
  FeaturedCats,
  FeaturedDogs,
  FeaturedShelters,
  GetInvolved,
  HeroHome,
  JoinNewsletter,
  OurRescues
} from './sections';

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
