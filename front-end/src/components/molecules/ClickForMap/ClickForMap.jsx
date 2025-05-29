import './ClickForMap.css';

const ClickForMap = ({ onClick }) => {
  return (
    <div className="click-for-map">
      <a href="#" onClick={(e) => {
        e.preventDefault();
        onClick();
      }} className="click-for-map-link">
        Click here to select your own map
      </a>
    </div>
  );
};

export default ClickForMap;
