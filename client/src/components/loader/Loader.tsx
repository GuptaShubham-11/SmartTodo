import './Loader.css';

const Loader = () => {
  return (
    <div className="bar-loader" role="status" aria-label="Loading">
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
    </div>
  );
};

export default Loader;
