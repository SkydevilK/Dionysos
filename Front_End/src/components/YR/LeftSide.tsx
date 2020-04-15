import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

import Profile from './Profile/Profile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mrSide: {
    bottom: "auto",
    left: "auto",
    // zIndex: "0",
    // position: "absolute",
    display: "inline",
    // position: "relative",
    top: "400px", // need to change
    width: "323px",
    fontSize: "14px",
    // fontWeight: "300",
    padding: "6px 0px",
    boxSizing: "border-box",
    marginLeft: "12px",
    marginRight: "12px",
    listStyle: "none",
    },
  }),
);

let User = {
  "code": 0,
  "data": {
    "authorities": [
      {
        "authority": "token"
      }
    ],
    "email": "sysh5656@naver.com",
    "follower": [
      {}
    ],
    "following": [
      {}
    ],
    "likes": [
      {
        "foodMatch": "string",
        "grade": "string",
        "grape": "string",
        "info": "string",
        "likeNum": 0,

        "nameEng": "string",
        "nameKor": "안나 드 코도르뉴 블랑 드 블랑",
        "sparkling": true,
        "sweet": 0,
        "tannin": 0,
        "type": "string",
        "visit": 0,
        "whenUse": "string",
        "wid": 0,
        "winery": "string"
      },

    ],
    "nickName": "pjs",
    "uid": 0,
    "username": "박재성"
  },
  "msg": "string",
  "success": true
}

export default function LeftSide() {
  const classes = useStyles();
  return (
    <div className={classes.mrSide}>
      <Profile
        code={User.code} 
        data={User.data} 
        msg={User.msg} 
        success={User.success}
        />
    </div>
  );
}
