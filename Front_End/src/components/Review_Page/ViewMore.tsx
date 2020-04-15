import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1, 8)
      }
    }
  })
);

export default function OutlinedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to={"/detail"} style={{ textDecoration: "none" }}>
        <Button variant="outlined">View More</Button>
      </Link>
    </div>
  );
}
