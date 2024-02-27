import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="container">
      <h1>Register Page</h1>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <br />
      <Link to="/">Landing</Link>
    </div>
  );
};

export default RegisterPage;
