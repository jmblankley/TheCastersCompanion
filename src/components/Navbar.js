import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className="Navbar sticky-top">
        <div>
          <h1 className="fs-4">The Casters Companion</h1>
        </div>
        <div>
          <Link to="/login">
            <i className="bi bi-person accountIcon fs-4"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
