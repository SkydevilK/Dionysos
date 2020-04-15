import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import TimelineSection from './MR/TimelineSection';
import MainContent from './MR/MainContent';
import MyFeed from './YR/FriendFeed/FriendFeed';
import MyFriends from "./YR/Friends/MyFriends";
import LeftSide from "./YR/LeftSide";
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { Container } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { ButtonGroup } from "@material-ui/core";
// import Link from '@material-ui/core/Link';
import { withRouter, RouteComponentProps } from "react-router-dom";

// Redux

import { rootState } from '../../stores/login/store';
import {getFriendInfo } from '../../stores/my_sns/actions/friendInfo';
import { useSelector, useDispatch } from 'react-redux';

const buttons = [
  { title: "Review", url: "/friend" },
  { title: "Likes", url: "/friend/mylikes" },
  { title: "Friends", url: "/friend/myfriends" }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mrNavbar: {
      minHeight: "41px",
      width: "100%"
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbar: {
      minHeight: "41px",
      flexWrap: "wrap"
    },
    mrTimelineButton: {}
  })
);
interface RouterProps {
  // type for `match.params`
  uid: string; // must be type `string` since value comes from the URL
}
interface MyComponentProps extends RouteComponentProps<RouterProps> {
  uid: number;
}
export default function YourPage(props: MyComponentProps) {
  const classes = useStyles();
  const uid = +props.match.params.uid;
  const [infoState, setInfoState] = React.useState(false);
  const dispatch = useDispatch();
    //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
    const { isFriendInfoError, isFriendInfoPending, isFriendInfoSuccess, friend} = useSelector(
      (state: rootState) => state.FriendInfoReducer
    );


    if(!infoState) {
      dispatch(getFriendInfo(uid));
      setInfoState(true);
    } else {
  
    }


  return (
    <div id="globalContainer">
      <div>
      {/* 프로필 사진 단 */}
        

      {/* main contents 단 */}
      <TimelineSection />

    <div>

      <span style={{ fontSize : '32px',marginTop : '100px', display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'}}>Welcome To {friend.nickName} 's SNS</span>
    </div>
    <div>

<span style={{ fontSize : '28px',marginTop : '100px', display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}>{friend.nickName} 's Feed</span>
</div>
    <div>
      

      {/* <MainContent /> */}
      <MyFeed uid={uid}/>
      </div>
      <div style={{ marginTop : '100px', display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}} >  

<span style={{ fontSize : '28px'}}>{friend.nickName} 's Follow</span>
                   
</div>
<div style={{ marginTop : '100px', display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}} >  
  <MyFriends uid={uid}/>
  </div>
      </div>
    </div>
  );
}
