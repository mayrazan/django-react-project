import {
  ContainerWelcomeStyled,
  ContainerDisplayStyled,
  ContainerHomeStyled,
} from "./style";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import EqualizerOutlinedIcon from "@material-ui/icons/EqualizerOutlined";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useHistory } from "react-router";

const themeBreak = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  text: {
    marginLeft: theme.spacing(4),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    // maxWidth: 500,
    width: "48%",
    [themeBreak.breakpoints.between("xs", "sm")]: {
      width: "100%",
    },
  },
  image: {
    // width: 128,
    // height: 128,
    color: "white",
    maxWidth: 128,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  grid: {
    margin: 0,
    flexWrap: "nowrap",
  },
  container: {
    backgroundColor: "#3d4b8a",
    width: "80%",
    maxWidth: "fit-content",
  },
}));

const MainHome = () => {
  const classes = useStyles();
  const history = useHistory();

  const redirectTo = (location) => {
    history.push(`/admin/${location}/`);
  };

  return (
    <ContainerHomeStyled>
      <ContainerWelcomeStyled>
        <Typography variant="h4" className={classes.text}>
          Seja bem-vindo(a)!
        </Typography>
      </ContainerWelcomeStyled>
      <ContainerDisplayStyled>
        <Paper className={classes.paper}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item className={classes.container}>
              <ButtonBase
                className={classes.image}
                onClick={() => redirectTo("condominos")}
              >
                <EqualizerOutlinedIcon className={classes.img} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    0
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Condôminos
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item className={classes.container}>
              <ButtonBase
                className={classes.image}
                onClick={() => redirectTo("sindicos")}
              >
                <EqualizerOutlinedIcon className={classes.img} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    0
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Síndicos
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </ContainerDisplayStyled>
    </ContainerHomeStyled>
  );
};

export default MainHome;
