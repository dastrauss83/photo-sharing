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

  const firebaseGroup = firebase
    .firestore()
    .collection("groups")
    .doc(`${group.id}`);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const index = group.photos
        .map((photoItem: photo) => {
          return photoItem.photoUrl;
        })
        .indexOf(photo.photoUrl);
      const tempGroupPhotos = [...group.photos];
      tempGroupPhotos.splice(index, 1);
      await firebaseGroup.update({
        photos: tempGroupPhotos,
      });
    }
  };

  const handleLike = async () => {
    const photoIndex = group.photos
      .map((photoItem: photo) => {
        return photoItem.photoUrl;
      })
      .indexOf(photo.photoUrl);

    if (
      group.photos[photoIndex].likedBy.map((user) => {
        return user.uid === currentUser.uid;
      }).length > 0
    ) {
      const userIndex = group.photos[photoIndex].likedBy
        .map((user) => {
          return user.uid;
        })
        .indexOf(currentUser.uid);

      const tempLikedBy = [...group.photos[photoIndex].likedBy];
      tempLikedBy.splice(userIndex, 1);
      const tempGroupPhotos = [...group.photos];
      tempGroupPhotos[photoIndex].likedBy = tempLikedBy;
      tempGroupPhotos[photoIndex].likes--;
      await firebaseGroup.update({
        photos: tempGroupPhotos,
      });
    } else {
      let tempLikedBy = [...group.photos[photoIndex].likedBy];
      tempLikedBy = tempLikedBy.concat([currentUser]);
      const tempGroupPhotos = [...group.photos];
      tempGroupPhotos[photoIndex].likedBy = tempLikedBy;
      tempGroupPhotos[photoIndex].likes++;
      await firebaseGroup.update({
        photos: tempGroupPhotos,
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
