import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Followers from './Followers';
import Followings from './Followings';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../../../stores/login/store';
import {UnfollowUserByUID, getUserFollowList, getUserFollowerList, setUserFollowPending } from '../../../../stores/your_sns/actions/follow';
import { Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withRouter, RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mrFriendsContainer:{
      display: "flex",
      paddingTop: "5px",
      // paddingLeft: "24px",
      paddingRight: "24px",
      paddingBottom: "96px",
      marginLeft: "100px",
      
    },
    mrFriends: {
      width: "365px",
      marginRight: "150px",
      // borderRadius: "5px",
      // width: "331px",
      // boxSizing: "border-box",
      // background: "#fff",
      // borderRadius: "3px",
      // border: "solid 1px #ddd",
      fontSize: "12px",
    },
    mrFriendsHeader: {
      
      marginBottom: "0px",
      textAlign: "center",

    },
    ulCommon: {
      borderRadius: "5px",
      // width: "331px",
      boxSizing: "border-box",
      background: "#fff",
      // borderRadius: "3px",
      border: "solid 1px #ddd",
      fontSize: "15px",
      listStyle: "none",
      paddingLeft: "0px"
    },
    listContainer: {
      margin: "20px",
    },
    liContainer: {
      padding: "10px",
      borderTop: "solid 1px #ddd",
    },
    follow: {
      display: "inline-block",
      float: "right",
    },
  })
);


// interface RouterProps {
//   // type for `match.params`
//   uid: string; // must be type `string` since value comes from the URL
// }
// interface MyComponentProps extends RouteComponentProps<RouterProps> {
//   uid: number;
// }

interface IProps {
  uid : string;
}
export default function MyFriend({uid} : {uid : number}) {
  const classes = useStyles();
  // const uid = +props.match.params.uid;
  // let uid : number = +(props.uid);
  const dispatch = useDispatch();
  //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
  const {follow, follower,isUserFollowError, isUserFollowSucceess, isUserFoolowPending } = useSelector(
    (state: rootState) => state.FriendFollowReducer
  );
​
const [followState, setFollowState] = React.useState(false);

const loadFollowList = async () => {
  await dispatch(getUserFollowList(uid));
  await dispatch(getUserFollowerList(uid));
  
};

if (!followState) {
  loadFollowList();
  setFollowState(true);
} else {
 
}

  return (
    <div className={classes.mrFriendsContainer}>
      <div className={classes.mrFriends}>
      {(function() {
        
                if (follower.length > 0) {
                  return (
                    <ul className={classes.ulCommon}>
      
                    <h1 className={classes.mrFriendsHeader}>Followers</h1>
                    {follower.map(follower => (<Followers
                      key={follower.uid}
                      uid={follower.uid}
                      email={follower.email}
                      nickName={follower.nickName}
                    />))}
                    </ul>
                  );
                } else {
                  return(
                    <ul>
                      <h1 className={classes.mrFriendsHeader}>Followers</h1>
                    <div>팔로우한 유저가 없습니다.</div>
                    </ul>
                  );
                }
              })()}

        

    
      </div>
      <div className={classes.mrFriends}>
      {(function() {
        
        if (follow.length > 0) {
          return (
            <ul className={classes.ulCommon}>
            <h1 className={classes.mrFriendsHeader}>Followings</h1>
            {follow.map(following => (
               <div>
               <li className={classes.liContainer}>
                 <Link>{following.nickName}</Link>
            
                
               </li>
             </div>
            ))}
            </ul>
          );
        } else {
          return(
            <ul>
              <h1 className={classes.mrFriendsHeader}>Followers</h1>
            <div>팔로잉한 유저가 없습니다.</div>
            </ul>
          );
        }
      })()}
      
      </div>
    </div>
  );
}