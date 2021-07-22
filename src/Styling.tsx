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
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(8, 0, 6),
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
    height: "150px",
  },
  groupCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridCardButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    color: "inherit",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardMediaPopover: {
    paddingTop: "100%",
  },
  cardContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popover: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
