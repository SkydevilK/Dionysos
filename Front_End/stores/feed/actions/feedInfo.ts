import { feedService } from '../services/feed';
import { createBrowserHistory } from 'history';
import {feedState} from "../reducers/feed_reducer";


export const actions = {
  SET_FEED_INFO_PENDING: 'SET_FEED_INFO_PENDING',
  SET_FEED_INFO_SUCCESS: 'SET_FEED_INFO_SUCCESS',
  SET_FEED_INFO_ERROR: 'SET_FEED_INFO_ERROR'
}
export function getFeedListByWID(wid : number, type : string) {
  return async (dispatch: (arg0: { type: string; isFeedPending?: boolean; isFeedSuccess?: boolean; FeedError?: string; }) => void) => {
   dispatch(setFeedPending(true));

   dispatch(setFeedError("not yet"));
 
   
   await feedService.getFeedListByWID(wid, type).then(
     (response : any) => {
      dispatch(setFeedPending(false));

      let feedList : feedState[] = response;

      dispatch(setFeedSuccess(true, feedList));
      
     },
     error => {
       dispatch(setFeedPending(false));
       dispatch(setFeedError("getWineListByType error"));
     }
   );
 }
}


function setFeedPending(isFeedPending : boolean) {
  return {
    type: actions.SET_FEED_INFO_PENDING,
    isFeedPending
  };
}

function setFeedSuccess(isFeedSuccess : boolean, feedList : feedState[]) {
  return {
    type: actions.SET_FEED_INFO_SUCCESS,
    isFeedSuccess,
    feedList
  };
}

function setFeedError(FeedError : string) {
  return {
    type: actions.SET_FEED_INFO_ERROR,
    FeedError
  }
}
