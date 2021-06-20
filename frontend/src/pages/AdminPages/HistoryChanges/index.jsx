import TicketsHistory from "../../../components/Admin/TicketsHistory";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const HistoryChanges = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <TicketsHistory />
      </MainContainer>
    </>
  );
};

export default HistoryChanges;
