import {
  Button,
  Container,
  Grid,
  Typography,
  Popover,
  Card,
  CardContent,
  TextField,
} from "@material-ui/core";
import { GroupAdd, Publish } from "@material-ui/icons";
import firebase from "firebase";
import { useState } from "react";
import { group } from "../../App";
import { useStyles } from "../../Styling";
import { GroupsCard } from "../Groups/GroupsCard";

type AllGroupsProps = {
  currentUser: any;
  allGroups: group[];
};

type newGroup = {
  name: string;
  description: string;
};

export const AllGroups: React.FC<AllGroupsProps> = ({
  currentUser,
  allGroups,
}) => {
  const classes = useStyles();
  const [newGroupState, setNewGroupState] = useState<boolean>(false);
  const [newGroup, setNewGroup] = useState<newGroup>({
    name: "",
    description: "",
  });

  const handleNewGroup = async () => {
    await firebase.firestore().collection("groups").add({
      name: newGroup.name,
      description: newGroup.description,
      members: [],
      photos: [],
    });
    setNewGroup({
      name: "",
      description: "",
    });
    setNewGroupState(false);
  };

  return (
    <main className={classes.container}>
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        All Groups
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        These are all available groups. Feel free to join a group to add the
        photos to your feed.
      </Typography>
      <Button
        onClick={() => setNewGroupState(true)}
        className={classes.groupMainButton}
      >
        <GroupAdd color="primary" style={{ marginRight: "5px" }} />
        <Typography>New Group</Typography>
      </Button>
      <Popover
        open={newGroupState}
        anchorReference="none"
        onClose={() => setNewGroupState(!true)}
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
            <form className={classes.newGroupForm}>
              <TextField
                required
                style={{ marginBottom: "10px" }}
                label="Name"
                defaultValue="Group Name"
                value={newGroup.name}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, name: e.target.value })
                }
              />
              <TextField
                required
                style={{ marginBottom: "10px" }}
                label="Description"
                defaultValue="Group Description"
                value={newGroup.description}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, description: e.target.value })
                }
              />
              {newGroup.name === "" || newGroup.description === "" ? null : (
                <Button
                  onClick={handleNewGroup}
                  style={{ marginBottom: "10px" }}
                >
                  <Publish color="primary" style={{ marginRight: "5px" }} />
                  <Typography>Create</Typography>
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </Popover>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {allGroups.map((group) => (
            <GroupsCard
              key={group.id}
              currentUser={currentUser}
              group={group}
            />
          ))}
        </Grid>
      </Container>
    </main>
  );
};
