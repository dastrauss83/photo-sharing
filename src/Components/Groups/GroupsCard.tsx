import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { AddCircle, ExitToApp, Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { group } from "../../App";
import { useStyles } from "../../Styling";

type GroupsCardProps = {
  group: group;
  currentUser: any;
};

export const GroupsCard: React.FC<GroupsCardProps> = ({
  group,
  currentUser,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Grid container className={classes.groupCard}>
            <Grid item>
              <Typography gutterBottom variant="h5">
                {group.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{group.description}</Typography>
            </Grid>
            <Grid item>
              <div className={classes.gridCardButtons}>
                {
                  //group.users.indexOf(currentUser.uid) === -1
                  true ? (
                    <Button>
                      <AddCircle
                        color="primary"
                        style={{ marginRight: "5px" }}
                      />
                      <Typography>Join</Typography>
                    </Button>
                  ) : (
                    <Button>
                      <ExitToApp
                        color="primary"
                        style={{ marginRight: "5px" }}
                      />
                      <Typography>Leave</Typography>
                    </Button>
                  )
                }
                <Button>
                  <Link to={`/groups/${group.name}`} className={classes.link}>
                    <Visibility
                      color="primary"
                      style={{ marginRight: "5px" }}
                    />
                    <Typography>View</Typography>
                  </Link>
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
