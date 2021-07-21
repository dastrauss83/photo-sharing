import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  Button,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { theme, useStyles } from "./Styling";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import { AccountCircle } from "@material-ui/icons";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

firebase.initializeApp({
  apiKey: "AIzaSyDvzOrnfzT_p9ntckvHxSJrO0AM6W9TEGY",
  authDomain: "photo-sharing-433e8.firebaseapp.com",
  projectId: "photo-sharing-433e8",
  storageBucket: "photo-sharing-433e8.appspot.com",
  messagingSenderId: "1046485585302",
  appId: "1:1046485585302:web:9cc71232a65e7fad7fe1b7",
});

const App: React.FC = () => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setCurrentUser(result.user);
      });
  };

  if (!currentUser) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
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
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Log In to start sharing photos, creating groups, adding friends,
                and more!
              </Typography>
              <Button
                className={classes.loginButton}
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                <AccountCircle style={{ marginRight: "8px" }} />
                <Typography variant="h6">Log In</Typography>
              </Button>
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
