import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "./Styling";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { AllGroups } from "./Components/Groups/AllGroups";
import { LogIn } from "./Components/LogIn";
import { Group } from "./Components/Groups/Group";

firebase.initializeApp({
  apiKey: "AIzaSyDvzOrnfzT_p9ntckvHxSJrO0AM6W9TEGY",
  authDomain: "photo-sharing-433e8.firebaseapp.com",
  projectId: "photo-sharing-433e8",
  storageBucket: "photo-sharing-433e8.appspot.com",
  messagingSenderId: "1046485585302",
  appId: "1:1046485585302:web:9cc71232a65e7fad7fe1b7",
});

export type photo = {
  photoUrl: string;
  user: string;
  time: any;
};
export type group = {
  name: string;
  description: string;
  users: string[];
  photos: photo[];
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [allGroups, setAllGroups] = useState<group[]>([]);

  const handleGetAllGroups = async () => {
    const tempGroups: group[] = [];
    await firebase
      .firestore()
      .collection("groups")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tempGroups.push(doc.data() as group);
        });
      });
    setAllGroups(tempGroups);
  };

  useEffect(() => {
    handleGetAllGroups();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Switch>
          <Route path="/my-feed">
            <div style={{ marginTop: "400px" }}>This is My Feed</div>
          </Route>
          <Route path="/all-groups">
            <AllGroups currentUser={currentUser} allGroups={allGroups} />
          </Route>
          {allGroups.map((group) => {
            return (
              <Route path={`/groups/${group.name}`}>
                <Group currentUser={currentUser} group={group} />
              </Route>
            );
          })}
          <Route path="/">
            <LogIn setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
