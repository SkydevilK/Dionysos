import { userFeedService } from '../services/userFeed';
import { createBrowserHistory } from 'history';
import {friendFeedState} from "../reducers/userFeed_reducer";

export const actions = {
  SET_FRIEND_FEED_INFO_PENDING: 'SET_FRIEND_FEED_INFO_PENDING',
  SET_FRIEND_FEED_INFO_SUCCESS: 'SET_FRIEND_FEED_INFO_SUCCESS',
  SET_FRIEND_FEED_INFO_ERROR: 'SET_FRIEND_FEED_INFO_ERROR'
}
export function getUserFeedList(type: string, uid : number) {
  return async (dispatch: (arg0: { type: string; isFeedPending?: boolean; isFeedSuccess?: boolean; FeedError?: string; }) => void) => {
   dispatch(setUserFeedPending(true));

   dispatch(setUserFeedError("not yet"));
 
   
   await userFeedService.getUserFeedList("REVIEW", uid).then(
     (response : any) => {
      dispatch(setUserFeedPending(false));

      let userFeed : friendFeedState[] = response;


      dispatch(setUserFeedSuccess(true, userFeed));
      
     },
     error => {
       dispatch(setUserFeedPending(false));
       dispatch(setUserFeedError("getWineListByType error"));
     }
   );
 }
}


function setUserFeedPending(isUserFeedPending : boolean) {
  return {
    type: actions.SET_FRIEND_FEED_INFO_PENDING,
    isUserFeedPending
  };
}

function setUserFeedSuccess(isUserFeedSuccess : boolean, userFeed : friendFeedState[]) {
  return {
    type: actions.SET_FRIEND_FEED_INFO_SUCCESS,
    isUserFeedSuccess,
    userFeed
  };
}

function setUserFeedError(UserFeedError : string) {
  return {
    type: actions.SET_FRIEND_FEED_INFO_ERROR,
    UserFeedError
  }
}
