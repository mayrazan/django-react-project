import ManagerInfo from "../../../components/Admin/ManagerInfo";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const Manager = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <ManagerInfo />
      </MainContainer>
    </>
  );
};

export default Manager;
