import { friendInfoService } from '../services/friendInfo';
import {User} from "../reducers/friendInfo_reducer";

export const actions = {
  SET_FRIEND_INFO_PENDING: 'SET_FRIEND_INFO_PENDING',
  SET_FRIEND_INFO_SUCCESS: 'SET_FRIEND_INFO_SUCCESS',
  SET_FRIEND_INFO_ERROR: 'SET_FRIEND_INFO_ERROR'
}


export function getFriendInfo(uid : number) {
  return async (dispatch: (arg0: { type: string; isFriendInfoPending?: boolean; isFriendInfoSuccess?: boolean; FriendInfoError?: string; }) => void) => {
   dispatch(setFriendInfoPending(true));

   dispatch(setFriendInfoError("not yet"));
 
   
   await friendInfoService.getFriendInfo(uid).then(
     (response : any) => {
      dispatch(setFriendInfoPending(false));


      let friend : User = response;

      dispatch(setFriendInfoSuccess(true, friend));
      
     },
     error => {
       dispatch(setFriendInfoPending(false));
       dispatch(setFriendInfoError("getWineListByType error"));
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

function setFriendInfoSuccess(isFriendInfoSuccess : boolean, friend : User) {
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
