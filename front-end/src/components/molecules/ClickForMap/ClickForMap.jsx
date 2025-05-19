import { Link } from 'react-router-dom';
import './ClickForMap.css';

const ClickForMap = ({ to = "/select-map" }) => {
  return (
    <div className="click-for-map">
      <Link to={to} className="click-for-map-link">
        Click here to select your own map
      </Link>
    </div>
  );
};

export default ClickForMap;