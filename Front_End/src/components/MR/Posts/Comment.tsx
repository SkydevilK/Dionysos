import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    comments: {
      margin: "0px -15px -25px -15px",
      padding: "15px",
      borderTop: "solid 1px #dddfe2",
      marginTop: "20px",
  }
})
);

export default function Comment() {
  const classes = useStyles();

  return (
    <div className={classes.comments}>
      
    </div>
  );
}