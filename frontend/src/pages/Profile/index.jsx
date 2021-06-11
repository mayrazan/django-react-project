import MainContainer from "../../components/shared/MainContainer";
import MenuDrawer from "../../components/shared/Menu";
import MyProfile from "../../components/shared/MyProfile";

const Profile = () => {
  return (
    <>
      <MenuDrawer />
      <MainContainer>
        <MyProfile />
      </MainContainer>
    </>
  );
};

export default Profile;
