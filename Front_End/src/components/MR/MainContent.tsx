// created at: 2020-01-21
// created by: JSPark
// about: Review page 중 위쪽 파트, 배경 사진, 프로필 사진, toolbar를 포함하고 있다.

import * as React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import LeftSide from './LeftSide';
import MyFeed from './MyFeed/MyFeed';
import MyPageList from './MyPageList';
import MyLikes from './Like/MyLikes';
import MyFriends from './Friends/MyFriends';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mrMainContents: {
      display: "flex",
      paddingTop: "42px",

      margin: "0",
      marginRight: "0",
    },

    mrFeed: {
      marginLeft: "20px",
      width: "3000px",
      display: "inline-block",
    },

  }),
);

export default function Timelinesection() {
  const classes = useStyles();

  return (
    <div id="mrMainContents" className={classes.mrMainContents}>

      <LeftSide />
      <div className={classes.mrFeed}>
        <Route path="/mypage" exact component={MyFeed} />
        <Route path="/mypage/" component={MyPageList} />
        <Route path="/mypage/" component={MyLikes} />
        <Route path="/mypage/" component={MyFriends} />
      </div>
      {/* <RightSide /> */}
    </div>

  );
}