import { Container, Grid, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { group } from "../../App";
import { useStyles } from "../../Styling";
import { GroupsCard } from "./GroupsCard";

type AllGroupsProps = {
  currentUser: any;
};

export const AllGroups: React.FC<AllGroupsProps> = ({ currentUser }) => {
  const classes = useStyles();
  const [allGroups, setAllGroups] = useState<group[]>([]);

  useEffect(() => {
    setAllGroups([
      {
        name: "David's Group",
        description:
          "A group made by David for his friends and enemies yadada I like to write sentences A group made by David for his friends and enemies yadada I like to write sentences",
        users: [],
        photos: [],
      },
      {
        name: "David's Group",
        description:
          "A group made by David for his friends and enemies yadada I like to write sentences A group made by David for his friends and enemies yadada I like to write sentences",
        users: [],
        photos: [],
      },
      {
        name: "David's Group",
        description:
          "A group made by David for his friends and enemies yadada I like to write sentences A group made by David for his friends and enemies yadada I like to write sentences",
        users: [],
        photos: [],
      },
      {
        name: "David's Group",
        description:
          "A group made by David for his friends and enemies yadada I like to write sentences A group made by David for his friends and enemies yadada I like to write sentences",
        users: [],
        photos: [],
      },
      {
        name: "David's Group",
        description:
          "A group made by David for his friends and enemies yadada I like to write sentences A group made by David for his friends and enemies yadada I like to write sentences",
        users: [],
        photos: [],
      },
    ]);
  }, []);

  return (
    <main>
      <div className={classes.container}>
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          All Groups
        </Typography>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {allGroups.map((group) => (
              <GroupsCard currentUser={currentUser} group={group} />
            ))}
          </Grid>
        </Container>
      </div>
    </main>
  );
};
