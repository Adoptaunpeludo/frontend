import { Link } from 'react-router-dom';
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
    <>
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

      <div className='container h-max'>
        <h1>Landing Page</h1>
        <br />
        <Link to='/register'>Register</Link>
        <br />
        <br />
        <Link to='/login'>Login</Link>
      </div>
    </>
  );
};

export default LandingPage;
