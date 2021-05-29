import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";
import RegisterTicketInfo from "../../../components/shared/RegisterTicketInfo";

const RegisterTicket = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <RegisterTicketInfo />
      </MainContainer>
    </>
  );
};

export default RegisterTicket;
