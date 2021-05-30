import RegisterTicketInfo from "../../../components/shared/RegisterTicketInfo";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const RegisterTicketUser = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <RegisterTicketInfo />
      </MainContainer>
    </>
  );
};

export default RegisterTicketUser;
