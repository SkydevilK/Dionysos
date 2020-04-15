import { userFollowService } from '../services/follow';
import { createBrowserHistory } from 'history';
import {friendFollow} from "../reducers/follow_reducer";
import {User} from "../reducers/userFeed_reducer";

export const actions = {
  SET_USER_FOLLOW_PENDING: 'SET_USER_FOLLOW_PENDING',
  SET_USER_FOLLOW_SUCCESS: 'SET_USER_FOLLOW_SUCCESS',
  SET_USER_FOLLOWER_SUCCESS: 'SET_USER_FOLLOWER_SUCCESS',
  SET_USER_FOLLOW_ERROR: 'SET_USER_FOLLOW_ERROR'
}

export function getUserFollowerList(uid : number) {
  return async (dispatch: (arg0: { type: string; isUserFollowPending?: boolean; isUserFollowSuccess?: boolean; UserFollowError?: string; }) => void) => {
   dispatch(setUserFollowPending(true));

//    dispatch(setUserFollowError("not yet"));
 
   
   await userFollowService.getUserFollowerList(uid).then(
     (response : any) => {
      dispatch(setUserFollowPending(false));
  
      let userFollower : User[] = response;


 
      
      dispatch(setUserFollowerSuccess(true, userFollower));

     },
     error => {
       dispatch(setUserFollowPending(false));
       dispatch(setUserFollowError("User Follow error"));
     }
   );
 }
}



export function getUserFollowList(uid : number) {
  return async (dispatch: (arg0: { type: string; isUserFollowPending?: boolean; isUserFollowSuccess?: boolean; UserFollowError?: string; }) => void) => {
   dispatch(setUserFollowPending(true));

//    dispatch(setUserFollowError("not yet"));
 
   
   await userFollowService.getUserFollowList(uid).then(
     (response : any) => {
      dispatch(setUserFollowPending(false));
  
      let userFollow : User[] = response;

      dispatch(setUserFollowSuccess(true, userFollow));

     },
     error => {
       dispatch(setUserFollowPending(false));
       dispatch(setUserFollowError("User Follow error"));
     }
   );
 }
}



  export function UnfollowUserByUID(uid : number) {
    return async (dispatch: (arg0: { type: string; isUserFollowPending?: boolean; isUserFollowSuccess?: boolean; UserFollowError?: string; }) => void) => {
     dispatch(setUserFollowPending(true));
     await userFollowService.UnfollowUser(uid).then(
       async (response : any) => {
        dispatch(setUserFollowPending(true));
 
       },
       error => {
        dispatch(setUserFollowPending(false));
        dispatch(setUserFollowError("user unfollow error"));
       }
     );
   }
  }
  

  
  export function followUserByUID(uid : number) {
    return async (dispatch: (arg0: { type: string; isUserFollowPending?: boolean; isUserFollowSuccess?: boolean; UserFollowError?: string; }) => void) => {
     dispatch(setUserFollowPending(true));
     await userFollowService.followUser(uid).then(
       async (response : any) => {
        dispatch(setUserFollowPending(true));
      
 
       },
       error => {
        dispatch(setUserFollowPending(false));
        dispatch(setUserFollowError("user unfollow error"));
       }
     );
   }
  }
  

export function setUserFollowPending(isUserFollowPending : boolean) {
  return {
    type: actions.SET_USER_FOLLOW_PENDING,
    isUserFollowPending
  }
}

function setUserFollowerSuccess(isUserFollowSuccess : boolean, follower : User[]) {
  return {
    type: actions.SET_USER_FOLLOWER_SUCCESS,
    isUserFollowSuccess,
    follower
  };
}


function setUserFollowSuccess(isUserFollowSuccess : boolean, follow : User[]) {
  return {
    type: actions.SET_USER_FOLLOW_SUCCESS,
    isUserFollowSuccess,
    follow
  };
}


function setUserFollowError(UserFollowError : string) {
  return {
    type: actions.SET_USER_FOLLOW_ERROR,
    UserFollowError
  }
}
