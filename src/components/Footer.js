import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <Link to="/" className="logo-font">
          conduit
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
