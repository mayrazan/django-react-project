import MainHome from "../../../components/Admin/MainHome";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const Home = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <MainHome />
      </MainContainer>
    </>
  );
};

export default Home;
