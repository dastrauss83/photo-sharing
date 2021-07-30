import { AppBar, Grid, Toolbar, Button, Typography } from "@material-ui/core";
import { CameraEnhance, Group, AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStyles } from "../Styling";

type NavbarProps = {
  currentUser: any;
  setCurrentUser: any;
  setLoadingUserGroups: any;
};

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  setCurrentUser,
  setLoadingUserGroups,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Link to="/my-feed" className={classes.link}>
                <CameraEnhance className={classes.navbarIcon} />
                <Typography
                  variant="h6"
                  className={classes.navbar}
                  style={{ marginLeft: "5px" }}
                >
                  Photo Share
                </Typography>
              </Link>
            </Button>
          </Grid>
          {currentUser !== "noUser" ? (
            <>
              <Grid item>
                <Button>
                  <Link to="/all-groups" className={classes.link}>
                    <Group className={classes.navbarIcon} />
                    <Typography
                      variant="h6"
                      className={classes.navbar}
                      style={{ marginLeft: "5px" }}
                    >
                      All Groups
                    </Typography>
                  </Link>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    setCurrentUser("noUser");
                    setLoadingUserGroups(true);
                  }}
                >
                  <Link to="/" className={classes.link}>
                    <AccountCircle className={classes.navbarIcon} />
                    <Typography
                      variant="h6"
                      className={classes.navbar}
                      style={{ marginLeft: "5px" }}
                    >
                      Log Out
                    </Typography>
                  </Link>
                </Button>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
