import RenterInfo from "../../../components/Admin/RenterInfo";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const Renter = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <RenterInfo />
      </MainContainer>
    </>
  );
};

export default Renter;
