import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    width: "70%",
    margin: "auto",
    paddingTop: theme.spacing(6),
    flexDirection: "column",
  },
  link: {
    textDecoration: "none",
    color: "white",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "normal",
  },
  button: {
    backgroundColor: "#193a6e",
    border: "1px solid white",
    padding: "0.5rem 3.5rem",
    flexGrow: 1,
    "&:first-child ": {
      marginRight: "10px",
      "@media (max-width: 771px)": {
        marginRight: 0,
      },
      "@media (max-width: 565px)": {
        marginBottom: "1rem",
      },
    },
    "&:last-child ": {
      marginLeft: "10px",
      "@media (max-width: 880px)": {
        marginLeft: 0,
      },
      "@media (max-width: 740px)": {
        marginTop: "1rem",
      },
    },
    color: "white",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "normal",
  },
  container: {
    height: "100%",
    backgroundColor: "#162e54",
    color: "white",
    width: "100%",
    padding: "3rem 1.5rem 1.5rem",
    "&.MuiContainer-maxWidthLg": {
      "@media (min-width: 1280px)": {
        maxWidth: "inherit",
      },
    },
  },
  title: {
    fontWeight: 500,
  },
  containerBtn: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexWrap: "inherit",
    paddingTop: "2rem",
  },
}));

const LoginContainer = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" className={classes.container}>
      <CssBaseline />

      <Typography component="h2" variant="h4" align="center">
        Condomínio Quintas das Flores
      </Typography>

      <div className={classes.paper}>
        <div>
          <Typography component="h3" variant="h5" className={classes.title}>
            Login
          </Typography>
        </div>

        <div className={classes.containerBtn}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
          {/* 
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => history.push("/login-usuario")}
          >
            Moradores
          </Button> */}
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => history.push("/cadastro")}
          >
            Registre-se
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default LoginContainer;
