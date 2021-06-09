import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import video from "../../../assets/videos/backgroundLogin.mp4";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    width: "50%",
    // margin: "auto",
    paddingTop: theme.spacing(6),
    flexDirection: "column",
    position: "relative",
    "@media (max-width: 445px)": {
      width: "100%",
    },
    "@media (max-width: 350px)": {
      paddingTop: theme.spacing(1),
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "normal",
  },
  button: {
    backgroundColor: "#435a7e",
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
      "@media (max-width: 320px)": {
        marginBottom: 0,
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
    "@media (max-width: 445px)": {
      fontSize: "12px",
    },
  },
  container: {
    height: "100%",
    // backgroundColor: "#162e54",
    color: "white",
    width: "100%",
    // padding: "3rem 1.5rem 1.5rem",
    "&.MuiContainer-maxWidthLg": {
      "@media (min-width: 1280px)": {
        maxWidth: "inherit",
      },
    },
    "@media (max-width: 386px)": {
      padding: 0,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontWeight: 500,
    "@media (max-width: 350px)": {
      fontSize: "1.2rem",
      textAlign: "center",
    },
  },
  containerBtn: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexWrap: "inherit",
    paddingTop: "2rem",
    "@media (max-width: 445px)": {
      flexDirection: "column",
    },
    "@media (max-width: 320px)": {
      paddingTop: "1rem",
    },
  },
  video: {
    position: "absolute",
    height: "95%",
    width: "inherit",
  },
  all: {
    width: "100%",
    height: "100%",
    // opacity: 0.9,
    backgroundColor: "#4c6387",
  },
  text: {
    position: "relative",
    "@media (max-width: 450px)": {
      fontSize: "1.5rem",
    },
    "@media (max-width: 310px)": {
      fontSize: "1.3rem",
      textAlign: "center",
    },
  },
}));

const LoginContainer = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.all}>
      <Container component="main" className={classes.container}>
        <CssBaseline />
        <video className={classes.video} autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          className={classes.text}
        >
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
    </div>
  );
};

export default LoginContainer;
