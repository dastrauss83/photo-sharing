import { createTheme, makeStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
    secondary: {
      main: purple[500],
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginButton: {
    marginTop: "50px",
  },
  navbar: {
    color: "white",
  },
  navbarIcon: {
    color: "white",
  },
  footer: {
    padding: "50px 0",
  },
}));
