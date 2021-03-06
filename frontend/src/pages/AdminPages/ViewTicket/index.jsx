import ViewCurrentTicket from "../../../components/Admin/ViewCurrentTicket";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const ViewTickets = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <ViewCurrentTicket />
      </MainContainer>
    </>
  );
};

export default ViewTickets;
