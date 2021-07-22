import { Container, Grid, Typography } from "@material-ui/core";
import { group } from "../../App";
import { useStyles } from "../../Styling";
import { GroupsCard } from "./GroupsCard";

type AllGroupsProps = {
  currentUser: any;
  allGroups: group[];
};

export const AllGroups: React.FC<AllGroupsProps> = ({
  currentUser,
  allGroups,
}) => {
  const classes = useStyles();

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
              <GroupsCard
                key={group.id}
                currentUser={currentUser}
                group={group}
              />
            ))}
          </Grid>
        </Container>
      </div>
    </main>
  );
};
