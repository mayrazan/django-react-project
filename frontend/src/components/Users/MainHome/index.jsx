import {
  ContainerWelcomeStyled,
  ContainerHomeStyled,
} from "../../shared/StyleComponents/style";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    marginLeft: theme.spacing(4),
  },
}));

const MainHome = () => {
  const classes = useStyles();
  const currentUser = JSON.parse(localStorage.getItem("userLogged"));
  const userName = currentUser.map((el) => el.name);

  return (
    <ContainerHomeStyled>
      <ContainerWelcomeStyled>
        <Typography variant="h4" className={classes.text}>
          Seja bem-vindo(a) {userName}!
        </Typography>
      </ContainerWelcomeStyled>
    </ContainerHomeStyled>
  );
};

export default MainHome;
