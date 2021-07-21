import { useStyles } from "./Styling";
import { Button, Grid, Typography } from "@material-ui/core";
import { CameraEnhance } from "@material-ui/icons";

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ paddingLeft: "0px" }}
          >
            <CameraEnhance color="primary" />
            <Typography
              variant="h6"
              color="textPrimary"
              style={{ marginLeft: "5px" }}
            >
              Photo Share
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Created by:
            <a
              style={{ fontStyle: "italic" }}
              href="https://github.com/dastrauss83"
            >
              David Strauss
            </a>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};
