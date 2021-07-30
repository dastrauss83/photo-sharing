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
  ExitToApp,
  Publish,
} from "@material-ui/icons";
import firebase from "firebase";
import "firebase/storage";
import { useState } from "react";
import { group } from "../../App";
import { useStyles } from "../../Styling";
import { PhotoCard } from "../Groups/PhotoCard";

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
    await firebase
      .storage()
      .ref(`${currentUploadPath.name}`)
      .put(currentUploadPath);

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
            photoUrl: photoURL,
            user: {
              displayName: currentUser.displayName,
              uid: currentUser.uid,
            },
            time: firebase.firestore.Timestamp.now(),
            uploadPath: currentUploadPath.name,
          },
        ],
      });
    setCurrentUploadPath(null);
    setUploadState(false);
  };

  const handleJoin = async () => {
    await firebase
      .firestore()
      .collection("groups")
      .doc(`${group.id}`)
      .update({
        members: [
          ...group.members,
          { displayName: currentUser.displayName, uid: currentUser.uid },
        ],
      });
  };

  const handleLeave = async () => {
    const memberIndex = group.members
      .filter((user) => {
        return user.uid;
      })
      .indexOf(currentUser.uid);
    const tempMembers = [...group.members];
    tempMembers.splice(memberIndex, 1);
    await firebase.firestore().collection("groups").doc(`${group.id}`).update({
      members: tempMembers,
    });
  };

  return (
    <main className={classes.container}>
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        {group.name}
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        {group.description}
      </Typography>
      {group.members.filter((user) => {
        return user.uid === currentUser.uid;
      }).length > 0 ? (
        <Button
          onClick={() => setUploadState(true)}
          className={classes.groupMainButton}
        >
          <AddAPhoto color="primary" style={{ marginRight: "5px" }} />
          <Typography>Upload Photo to Group</Typography>
        </Button>
      ) : (
        <Button onClick={handleJoin} className={classes.groupMainButton}>
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
                accept="image/*"
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
            ? group.photos
                .sort((a, b) => {
                  return b.time - a.time;
                })
                .map((photo) => (
                  <PhotoCard
                    key={photo.photoUrl}
                    photo={photo}
                    currentUser={currentUser}
                    group={group}
                  />
                ))
            : null}
        </Grid>
        <div className={classes.members}>
          {group.members.filter((user) => {
            return user.uid === currentUser.uid;
          }).length > 0 ? (
            <Button onClick={handleLeave}>
              <ExitToApp color="primary" style={{ marginRight: "5px" }} />
              <Typography>Leave</Typography>
            </Button>
          ) : null}
          <Typography>Group Members:</Typography>
          <div className={classes.membersList}>
            {group.members.map((user) => {
              return (
                <Typography key={user.uid} style={{ marginRight: "5px" }}>
                  {user.displayName}
                </Typography>
              );
            })}
          </div>
        </div>
      </Container>
    </main>
  );
};
