import {
  AppBar,
  Button,
  Card,
  CardContent,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { group } from "../../App";

type GroupsCardProps = {
  group: group;
};

export const GroupsCard: React.FC<GroupsCardProps> = ({ group }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item>
              <AppBar
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Toolbar>
                  <Typography>{group.name}</Typography>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item>
              <Typography>{group.description}</Typography>
            </Grid>
            <Grid item style={{ width: "100%" }}>
              <Button>
                <AddCircle color="primary" />
                <Typography>Join Group</Typography>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
