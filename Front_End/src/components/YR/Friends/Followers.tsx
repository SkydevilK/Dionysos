import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const useStyles =  makeStyles((theme: Theme) =>
createStyles({
  listContainer: {
    margin: "20px",
  },
  liContainer: {
    padding: "10px",
    borderTop: "solid 1px #ddd",
    
  }
})
);
interface Followers {
  uid: number,
  email: string,
  nickName: string
}


export default function Followers(followers: Followers) {
  const classes = useStyles();
  return (
    <div>
      <li className={classes.liContainer}>
        <Link>{followers.nickName}</Link>
      </li>
    </div>
  )

}

