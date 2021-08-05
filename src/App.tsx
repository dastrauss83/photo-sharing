import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { theme } from "./Styling";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { AllGroups } from "./Components/Pages/AllGroups";
import { LogIn } from "./Components/Pages/LogIn";
import { Group } from "./Components/Pages/Group";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MyFeed } from "./Components/Pages/MyFeed";
import { ProtectedRoute } from "./ProtectedRoute";

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
  user: any;
  time: any;
  likedBy: any[];
  uploadPath: string;
};
export type group = {
  name: string;
  description: string;
  members: any[];
  photos: photo[];
  id: string;
};

export const currentUserInList = (list: any[], currentUser: any) => {
  return (
    list.filter((user: any) => {
      return user.uid === currentUser.uid;
    }).length > 0
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>("noUser");
  const query = firebase.firestore().collection("groups");
  const [groups] = useCollectionData(query, { idField: "id" });
  const [allGroups, setAllGroups] = useState<group[]>([]);
  const [loadingUserGroups, setLoadingUserGroups] = useState<boolean>(false);
  const [userGroups, setUserGroups] = useState<group[]>([]);

  useEffect(() => {
    if (localStorage.getItem("currentUser") !== "noUser") {
      setCurrentUser(
        JSON.parse(localStorage.getItem("currentUser") || "empty")
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (groups) {
      setAllGroups(groups as unknown as group[]);
    }
  }, [groups]);

  const getUserGroups = () => {
    if (currentUser !== "noUser") {
      const tempUserGroups = allGroups.filter((group) => {
        if (group.members.length > 0) {
          return currentUserInList(group.members, currentUser);
        } else {
          return false;
        }
      });
      setUserGroups(tempUserGroups);
    }
  };

  useEffect(() => {
    setLoadingUserGroups(true);
    getUserGroups();
    setTimeout(() => setLoadingUserGroups(false), 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allGroups]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Switch>
          <Route exact path="/my-feed">
            {loadingUserGroups ? (
              <div
                style={{
                  marginTop: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </div>
            ) : currentUser === "noUser" ? (
              <Redirect to="/" />
            ) : (
              <MyFeed currentUser={currentUser} userGroups={userGroups} />
            )}
          </Route>
          <ProtectedRoute
            exact
            path="/all-groups"
            currentUser={currentUser}
            render={() => (
              <AllGroups currentUser={currentUser} allGroups={allGroups} />
            )}
          />
          {allGroups.map((group) => {
            return (
              <ProtectedRoute
                exact
                path={`/groups/${group.name}`}
                key={group.id}
                currentUser={currentUser}
                render={() => <Group currentUser={currentUser} group={group} />}
              />
            );
          })}
          <Route path="/">
            {currentUser === "noUser" ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/my-feed" />
            )}
            <LogIn
              setCurrentUser={setCurrentUser}
              setLoadingUserGroups={setLoadingUserGroups}
            />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
