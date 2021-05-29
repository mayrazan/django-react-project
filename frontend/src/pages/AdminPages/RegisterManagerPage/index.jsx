import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";
import RegisterManager from "../../../components/Admin/RegisterManager";

const RegisterManagerPage = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <RegisterManager />
      </MainContainer>
    </>
  );
};

export default RegisterManagerPage;
