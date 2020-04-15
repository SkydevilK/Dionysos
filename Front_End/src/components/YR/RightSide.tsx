import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

import Friends from './Friends/MyFriends'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mrSide: {
    bottom: "auto",
    left: "auto",
    // float: "left",
    // zIndex: "0",
    position: "absolute",
    // position: "relative",
    top: "400px", // need to change
    width: "323px",
    fontSize: "14px",
    // fontWeight: "300",
    padding: "6px 0px",
    boxSizing: "border-box",
    // display: "flex",
    },
  }),
);

export default function RightSide() {
  const classes = useStyles();
  return (
    <div className={classes.mrSide}>
      {/* <Friends /> */}
    </div>
  );
}
