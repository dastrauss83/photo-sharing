import { Button, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { useStyles } from "../../Styling";

type LogInProps = {
  setCurrentUser: any;
};

export const LogIn: React.FC<LogInProps> = ({ setCurrentUser }) => {
  const classes = useStyles();

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setCurrentUser(result.user);
      });
  };

  return (
    <main>
      <div className={classes.container}>
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Photo Share
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Log In to start sharing photos, creating groups, adding friends, and
          more!
        </Typography>
        <Button
          className={classes.loginButton}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          <Link to="/my-feed" className={classes.link}>
            <AccountCircle style={{ marginRight: "8px" }} />
            <Typography variant="h6">Log In</Typography>
          </Link>
        </Button>
      </div>
    </main>
  );
};
