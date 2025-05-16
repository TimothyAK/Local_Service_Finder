import { Link } from 'react-router-dom';
import './ForgotPass.css';

const ForgotPass = ({ to = "/forgot-password" }) => {
  return (
    <div className="forgot-password">
      <Link to={to} className="forgot-password-link">
        Forgot Password?
      </Link>
    </div>
  );
};

export default ForgotPass;
