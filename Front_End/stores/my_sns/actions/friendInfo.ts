import { friendInfoService } from '../services/friendInfo';
import { createBrowserHistory } from 'history';
import {Friend} from "../reducers/friend_reducer";

export const actions = {
  SET_FRIEND_INFO_PENDING: 'SET_FRIEND_INFO_PENDING',
  SET_FRIEND_INFO_SUCCESS: 'SET_FRIEND_INFO_SUCCESS',
  SET_FRIEND_INFO_ERROR: 'SET_FRIEND_INFO_ERROR'
}
export function getFriendInfo(uid : number) {
  return async (dispatch: (arg0: { type: string; isFeedPending?: boolean; isFeedSuccess?: boolean; FeedError?: string; }) => void) => {
   dispatch(setFriendInfoPending(true));

   dispatch(setFriendInfoError("not yet"));
 
   
   await friendInfoService.getFriendInfo(uid).then(
     (response : any) => {
      dispatch(setFriendInfoPending(false));

      let friend : Friend = response.data;

      dispatch(setFriendInfoSuccess(true, friend));
      
     },
     error => {
       dispatch(setFriendInfoPending(false));
       dispatch(setFriendInfoError("friendInfo error"));
     }
   );
 }
}


function setFriendInfoPending(isFriendInfoPending : boolean) {
  return {
    type: actions.SET_FRIEND_INFO_PENDING,
    isFriendInfoPending
  };
}

function setFriendInfoSuccess(isFriendInfoSuccess : boolean, friend : Friend) {
  return {
    type: actions.SET_FRIEND_INFO_SUCCESS,
    isFriendInfoSuccess,
    friend
  };
}

function setFriendInfoError(FriendInfoError : string) {
  return {
    type: actions.SET_FRIEND_INFO_ERROR,
    FriendInfoError
  }
}
