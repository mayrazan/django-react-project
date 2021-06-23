import ViewMyTicket from "../../../components/Users/ViewMyTicket";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const ShowCurrentTicket = () => {
  return (
    <>
      <MenuDrawer type />
      <MainContainer>
        <ViewMyTicket />
      </MainContainer>
    </>
  );
};

export default ShowCurrentTicket;
