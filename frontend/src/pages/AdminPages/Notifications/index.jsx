import RegisterNotifications from "../../../components/Admin/RegisterNotifications";
import MainContainer from "../../../components/shared/MainContainer";
import MenuDrawer from "../../../components/shared/Menu";

const Notifications = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <RegisterNotifications />
      </MainContainer>
    </>
  );
};

export default Notifications;
