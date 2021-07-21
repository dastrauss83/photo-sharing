import { AppBar, Grid, Toolbar, Button, Typography } from "@material-ui/core";
import { CameraEnhance } from "@material-ui/icons";
import { useStyles } from "../Styling";

export const Navbar: React.FC = () => {
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
              <CameraEnhance className={classes.navbarIcon} />
              <Typography
                variant="h6"
                className={classes.navbar}
                style={{ marginLeft: "5px" }}
              >
                Photo Share
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
