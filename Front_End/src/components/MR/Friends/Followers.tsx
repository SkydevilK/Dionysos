import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import { Link } from "react-router-dom";

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
    <div  key={followers.uid}>
      <li key={followers.uid} className={classes.liContainer}>
      <Link
                    to={`/friend/${followers.uid}`}
                    style={{ textDecoration: "none" }}
                  >  {followers.nickName}</Link>
      </li>
    </div>
  )

}

