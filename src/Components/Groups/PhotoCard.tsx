import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Popover,
} from "@material-ui/core";
import { FavoriteBorder, Delete } from "@material-ui/icons";
import firebase from "firebase";
import { useState } from "react";
import { group, photo } from "../../App";
import { useStyles } from "../../Styling";

type PhotoCardProps = {
  photo: photo;
  currentUser: any;
  group: group;
};

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  currentUser,
  group,
}) => {
  const classes = useStyles();
  const [viewState, setViewState] = useState<boolean>(false);

  const firebasePhoto = firebase
    .firestore()
    .collection("groups")
    .doc(`${group.id}`);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await firebasePhoto.delete();
    }
  };

  const handleLike = async () => {
    if (photo.likedBy.includes(currentUser.uid)) {
      const index = photo.likedBy.indexOf(currentUser.uid);
      const tempLikedBy = [...photo.likedBy];
      tempLikedBy.splice(index, 1);
      await firebasePhoto.update({
        likes: photo.likes - 1,
        likedBy: tempLikedBy,
      });
    } else {
      await firebasePhoto.update({
        likes: photo.likes + 1,
        likedBy: [...photo.likedBy, currentUser.uid],
      });
    }
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.card}>
        <CardMedia
          className={`${classes.cardMedia} cardMedia`}
          image={photo.photoUrl}
          onClick={() => setViewState(true)}
        />
        <Popover
          open={viewState}
          anchorReference="none"
          onClose={() => setViewState(!true)}
          transformOrigin={{
            horizontal: "center",
            vertical: "center",
          }}
          elevation={20}
          PaperProps={{ style: { width: "50%" } }}
          classes={{
            root: classes.popover,
          }}
        >
          <Card className={classes.card}>
            <CardContent>
              <CardMedia
                className={classes.cardMediaPopover}
                image={photo.photoUrl}
              />
            </CardContent>
          </Card>
        </Popover>
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1">{photo.user.displayName}</Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleLike}>
              <FavoriteBorder color="primary" style={{ marginRight: "5px" }} />
              <Typography>{photo.likes}</Typography>
            </Button>
            {currentUser.uid === photo.user.uid ? (
              <Button onClick={handleDelete}>
                <Delete color="primary" />
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};
