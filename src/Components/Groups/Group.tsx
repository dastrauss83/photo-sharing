import {
  Button,
  Container,
  Grid,
  Popover,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import {
  AddAPhoto,
  AddCircle,
  AddPhotoAlternate,
  Publish,
} from "@material-ui/icons";
import firebase from "firebase";
import { useState } from "react";
import { group } from "../../App";
import { useStyles } from "../../Styling";
import { PhotoCard } from "./PhotoCard";

type GroupProps = {
  group: group;
  currentUser: any;
};

export const Group: React.FC<GroupProps> = ({ group, currentUser }) => {
  const classes = useStyles();
  const [uploadState, setUploadState] = useState<boolean>(false);
  const [currentUploadPath, setCurrentUploadPath] = useState<any>();

  const uploadFile = (event: any) => {
    const file = event.target.files[0];
    // const fileName = file.name;
    setCurrentUploadPath(file);
  };

  const handleUpload = async () => {
    firebase.storage().ref().child(currentUploadPath.name);
    firebase.storage().ref().child(`/images/${currentUploadPath.name}`);
    const photoURL: string = await firebase
      .storage()
      .ref()
      .child(currentUploadPath.name)
      .getDownloadURL();

    await firebase
      .firestore()
      .collection("groups")
      .doc(`${group.id}`)
      .update({
        photos: [
          ...group.photos,
          {
            likedBy: [],
            likes: 0,
            photoUrl: photoURL,
            user: currentUser,
            time: firebase.firestore.Timestamp.now(),
          },
        ],
      });
    setCurrentUploadPath(null);
  };

  return (
    <main className={classes.container}>
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        {group.name}
      </Typography>
      {group.members.filter((user) => {
        return user.uid === currentUser.uid;
      }).length > 0 ? (
        <Button onClick={() => setUploadState(true)}>
          <AddAPhoto color="primary" style={{ marginRight: "5px" }} />
          <Typography>Upload Photo to Group</Typography>
        </Button>
      ) : (
        <Button>
          <AddCircle color="primary" style={{ marginRight: "5px" }} />
          <Typography>Join Group</Typography>
        </Button>
      )}
      <Popover
        open={uploadState}
        anchorReference="none"
        onClose={() => {
          setUploadState(!uploadState);
          setCurrentUploadPath(null);
        }}
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
          <CardContent className={classes.uploadCard}>
            <Typography gutterBottom variant="h2">
              Upload a Photo
            </Typography>

            <div style={{ position: "relative", marginBottom: "10px" }}>
              <input
                type="file"
                onChange={(e) => uploadFile(e)}
                accept="image/jpeg"
                className="inputFile"
              />
              <div className="fakeFile">
                <AddPhotoAlternate color="primary" />
                <Typography gutterBottom>Choose a Photo</Typography>
              </div>
            </div>
            {currentUploadPath ? (
              <>
                <Typography gutterBottom>{currentUploadPath.name}</Typography>
                <Button onClick={handleUpload}>
                  <Publish color="primary" style={{ marginRight: "5px" }} />
                  <Typography>Upload</Typography>
                </Button>
              </>
            ) : null}
          </CardContent>
        </Card>
      </Popover>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {group.photos.length > 0
            ? group.photos.map((photo) => (
                <PhotoCard
                  key={photo.photoUrl}
                  photo={photo}
                  currentUser={currentUser}
                  group={group}
                />
              ))
            : null}
        </Grid>
      </Container>
    </main>
  );
};
