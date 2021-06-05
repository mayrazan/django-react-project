import MainHome from "../../../components/Users/MainHome";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const UserHome = () => {
  return (
    <>
      <MenuDrawer type />
      <MainContainer>
        <MainHome />
      </MainContainer>
    </>
  );
};

export default UserHome;
