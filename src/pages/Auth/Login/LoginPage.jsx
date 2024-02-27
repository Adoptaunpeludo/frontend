import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="container">
      <h1>Login Page</h1>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <br />
      <Link to="/">Landing</Link>
    </div>
  );
};

export default LoginPage;
