import RegisterProblemsType from "../../../components/Admin/RegisterProblemsType";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const Problems = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <RegisterProblemsType />
      </MainContainer>
    </>
  );
};

export default Problems;
