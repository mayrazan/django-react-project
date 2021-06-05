import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";
import MyTickets from "../../../components/Users/MyTickets";

const ViewTickets = () => {
  return (
    <>
      <MenuDrawer type />
      <MainContainer>
        <MyTickets />
      </MainContainer>
    </>
  );
};

export default ViewTickets;
