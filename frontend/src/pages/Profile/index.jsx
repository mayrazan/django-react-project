import MainContainer from "../../components/shared/MainContainer";
import MenuDrawer from "../../components/shared/Menu";
import MyProfile from "../../components/shared/MyProfile";
import { useUserContext } from "../../context/ContextUser";

const Profile = () => {
  const { isAdmin } = useUserContext();
  return (
    <>
      {isAdmin ? <MenuDrawer /> : <MenuDrawer type />}

      <MainContainer>
        <MyProfile />
      </MainContainer>
    </>
  );
};

export default Profile;
