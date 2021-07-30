import { useStyles } from "../Styling";
import { Button, Grid, Typography } from "@material-ui/core";
import { CameraEnhance } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
            <Link to="/" className={classes.link}>
              <CameraEnhance color="primary" />
              <Typography
                variant="h6"
                color="textPrimary"
                style={{ marginLeft: "5px" }}
              >
                Photo Share
              </Typography>
            </Link>
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
              style={{
                fontStyle: "italic",
                marginLeft: "3px",
                textDecoration: "none",
              }}
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
