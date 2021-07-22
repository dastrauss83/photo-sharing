import { Container, Grid, Typography } from "@material-ui/core";
import { group } from "../../App";
import { useStyles } from "../../Styling";
import { PhotoCard } from "./PhotoCard";

type GroupProps = {
  group: group;
  currentUser: any;
};

export const Group: React.FC<GroupProps> = ({ group, currentUser }) => {
  const classes = useStyles();

  return (
    <main className={classes.container}>
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        {group.name}
      </Typography>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {group.photos.map((photo) => (
            <PhotoCard photo={photo} currentUser={currentUser} />
          ))}
        </Grid>
      </Container>
    </main>
  );
};
