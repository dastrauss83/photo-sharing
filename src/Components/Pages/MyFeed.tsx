import { Typography, Container, Grid } from "@material-ui/core";
import { group } from "../../App";
import { useStyles } from "../../Styling";
import { PhotoCard } from "../Groups/PhotoCard";

type MyFeedProps = {
  currentUser: any;
  userGroups: group[];
};

export const MyFeed: React.FC<MyFeedProps> = ({ currentUser, userGroups }) => {
  const classes = useStyles();

  return (
    <main className={classes.container}>
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        My Feed
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        paragraph
        gutterBottom
      >
        These are all Photos from the groups you have joined.
      </Typography>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {userGroups.length > 0 &&
            userGroups.map((group) =>
              group.photos.map((photo) => (
                <PhotoCard
                  key={photo.photoUrl}
                  photo={photo}
                  currentUser={currentUser}
                  group={group}
                />
              ))
            )}
        </Grid>
        <div style={{ marginTop: "30px" }}>
          <Typography
            gutterBottom
            variant="h4"
            align="center"
            color="textPrimary"
            paragraph
          >
            Join a group to view photos!
          </Typography>
        </div>
      </Container>
    </main>
  );
};
