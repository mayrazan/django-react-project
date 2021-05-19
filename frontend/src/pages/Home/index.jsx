import Typography from "@material-ui/core/Typography";
import MainContainer from "../../components/MainContainer";
import MenuDrawer from "../../components/Menu";

const Home = () => {
  return (
    <>
      <MenuDrawer></MenuDrawer>
      <MainContainer>
        <Typography variant="h4">Seja bem-vindo(a)!</Typography>
      </MainContainer>
    </>
  );
};

export default Home;
