import { Typography, Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { group } from "../App";
import { useStyles } from "../Styling";
import { PhotoCard } from "./Groups/PhotoCard";

type MyFeedProps = {
  currentUser: any;
  allGroups: group[];
};

export const MyFeed: React.FC<MyFeedProps> = ({ currentUser, allGroups }) => {
  const classes = useStyles();

  const [userGroups, setUserGroups] = useState<group[]>([]);

  const getUserGroups = () => {
    const tempUserGroups = allGroups.filter((group) => {
      return (
        //user  undefined handle if memebrs is empty
        group.members.filter((user) => {
          return user.uid === currentUser.uid;
        }).length > 0
      );
    });
    setUserGroups(tempUserGroups);
  };

  useEffect(() => {
    getUserGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={classes.container}>
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        My Feed
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        These are all Photos from the groups you have joined.
      </Typography>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {userGroups.length > 0 ? (
            userGroups.map((group) =>
              group.photos.map((photo) => (
                <PhotoCard
                  key={photo.photoUrl}
                  photo={photo}
                  currentUser={currentUser}
                  group={group}
                />
              ))
            )
          ) : (
            <Typography style={{ alignSelf: "center" }}>
              Join a group to view photos!
            </Typography>
          )}
        </Grid>
      </Container>
    </main>
  );
};
