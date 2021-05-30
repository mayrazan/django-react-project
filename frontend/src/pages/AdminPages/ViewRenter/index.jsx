import ViewCurrentRenter from "../../../components/Admin/ViewCurrentRenter";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const ViewRenter = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <ViewCurrentRenter />
      </MainContainer>
    </>
  );
};

export default ViewRenter;
