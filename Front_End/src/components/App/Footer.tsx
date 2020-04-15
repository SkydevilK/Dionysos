import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import brown from "@material-ui/core/colors/brown";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "60px",
      // position: "absolute",
      bottom: "0px",
      right: "0px",
      left: "0px"
    },
    footer: {
      padding: theme.spacing(3, 2),
      flex: 1,
      // marginTop: "auto",
      backgroundColor: "#332f2f",
      height: 200,
      color: "#ffffff",
      marginTop: 100
    }
  })
);

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Grid>
          <Container maxWidth="sm">
            <Typography variant="body1">
              Welcome to Dionysos : Copyright © 2020 ssafy.co.,Ltd. All rights
              reserved.
            </Typography>
          </Container>
        </Grid>
      </footer>
    </div>
  );
}
