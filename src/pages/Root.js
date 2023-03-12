import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
const Root = () => {
  return (
    <>
      <Navigation></Navigation>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};
export default Root;
