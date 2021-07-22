import {
  Button,
  Container,
  Grid,
  Popover,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { AddAPhoto, AddCircle, Publish } from "@material-ui/icons";
import firebase from "firebase";
import { useState } from "react";
import { group, photo } from "../../App";
import { useStyles } from "../../Styling";
import { PhotoCard } from "./PhotoCard";

type GroupProps = {
  group: group;
  currentUser: any;
};

export const Group: React.FC<GroupProps> = ({ group, currentUser }) => {
  const classes = useStyles();
  const [uploadState, setUploadState] = useState<boolean>(false);
  const [currentUploadPath, setCurrentUploadPath] = useState<string>("");

  const uploadFile = (event: any) => {
    setCurrentUploadPath(event.target.files[0]);
    // if (file) {
    //   let data = new FormData();
    //   data.append("file", file);
    //   console.log(data);
    //   // axios.post('/files', data)...
    // }
  };

  const getPhotoUrl = async (photo: photo) => {
    return await firebase
      .storage()
      .ref()
      .child(photo.photoUrl)
      .getDownloadURL();
  };

  const handleUpload = async () => {
    firebase.storage().ref().child(currentUploadPath);
    await firebase
      .firestore()
      .collection("groups")
      .doc(`${group.id}`)
      .update({});
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
        onClose={() => setUploadState(!uploadState)}
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
            <input type="file" onChange={(e) => uploadFile(e)} />
            <Button onClick={handleUpload}>
              <Publish color="primary" style={{ marginRight: "5px" }} />
              <Typography>Upload</Typography>
            </Button>
          </CardContent>
        </Card>
      </Popover>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {group.photos.map((photo) => (
            <PhotoCard photo={photo} currentUser={currentUser} group={group} />
          ))}
        </Grid>
      </Container>
    </main>
  );
};
