import { Link } from 'react-router-dom';
import './SignUpLogin.css';

const SignupRedirect = ({ to = "/signup" }) => {
  return (
    <div className="signup-redirect">
      Don’t have an account? <Link to={to} className="signup-link">Sign up</Link>
    </div>
  );
};

export default SignupRedirect;
