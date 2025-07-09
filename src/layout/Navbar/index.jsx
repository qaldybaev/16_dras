import "./navbar.scss";

const Navbar = ({count}) => {
  return (
    <div className="navbar">
      Navbar
      <div className="count-box">Count: {count}</div>
    </div>
  );
};

export default Navbar;
