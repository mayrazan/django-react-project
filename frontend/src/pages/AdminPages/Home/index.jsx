import MainHome from "../../../components/Admin/MainHome";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const Home = () => {
  return (
    <>
      <MenuDrawer></MenuDrawer>
      <MainContainer>
        <MainHome />
      </MainContainer>
    </>
  );
};

export default Home;
