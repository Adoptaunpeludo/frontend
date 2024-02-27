import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container">
      <h1>Landing Page</h1>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default LandingPage;
