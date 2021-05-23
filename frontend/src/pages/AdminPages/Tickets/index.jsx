import TicketsInfo from "../../../components/Admin/TicketsInfo";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const Tickets = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <TicketsInfo />
      </MainContainer>
    </>
  );
};

export default Tickets;
