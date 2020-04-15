// created at: 2020-01-21
// created by: JSPark
// about: Review page 중 위쪽 파트, 배경 사진, 프로필 사진, toolbar를 포함하고 있다.

import * as React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import LeftSide from './LeftSide';
import RightSide from './RightSide'
import MyPageList from './MyPageList';
import {RouteComponentProps} from 'react-router-dom';


interface RouterProps { // type for `match.params`]
  uid : string,
}

interface MyComponentProps extends RouteComponentProps<RouterProps> {
  uid : number,
}

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
      width: "900px",
      display: "inline-block",
    },

  }),
);

export default function Timelinesection(props:MyComponentProps) {
  const classes = useStyles();
  
  return (
    <div id="mrMainContents" className={classes.mrMainContents}>
      {/*  */}
      <LeftSide />
      <div className={classes.mrFeed}>
        {/*  */}
  
        {/* <Route path="/friend/:uid" exact component={MyFeed} /> */}
        {/* <Route path="/friend/:uid/:title" component={MyPageList} /> */}

      </div>
      {/* <RightSide /> */}
    </div>

  );
}