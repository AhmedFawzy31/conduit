import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useNavigation } from "react-router-dom";
import { HashLoader } from "react-spinners";
const Root = () => {
  const navigation = useNavigation();
  return (
    <>
      <Navigation></Navigation>
      <Outlet></Outlet>
      <Footer></Footer>
      {navigation.state === "loading" && (
        <div id="fullScreenLoader">
          <HashLoader
            speedMultiplier={2}
            color="#5cb85c"
            size={70}
          ></HashLoader>
        </div>
      )}
    </>
  );
};
export default Root;
