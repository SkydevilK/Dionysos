import { feedAllService } from '../services/feedAll';
import { createBrowserHistory } from 'history';
import {feedState} from "../reducers/feed_reducer";


export const actions = {
  SET_FEED_ALL_PENDING: 'SET_FEED_ALL_PENDING',
  SET_FEED_ALL_SUCCESS: 'SET_FEED_ALL_SUCCESS',
  SET_FEED_ALL_ERROR: 'SET_FEED_ALL_ERROR'
}
export function getFeedAll() {
  return async (dispatch: (arg0: { type: string; isFeedPending?: boolean; isFeedSuccess?: boolean; FeedError?: string; }) => void) => {
   dispatch(setFeedAllPending(true));

   dispatch(setFeedAllError("not yet"));
 
   
   await feedAllService.getFeedAll().then(
     (response : any) => {
      dispatch(setFeedAllPending(false));

      let feedList : feedState[] = response;

      dispatch(setFeedAllSuccess(true, feedList));
      
     },
     error => {
       dispatch(setFeedAllPending(false));
       dispatch(setFeedAllError("getWineListByType error"));
     }
   );
 }
}


function setFeedAllPending(isFeedAllPending : boolean) {
  return {
    type: actions.SET_FEED_ALL_PENDING,
    isFeedAllPending
  };
}

function setFeedAllSuccess(isFeedAllSuccess : boolean, feedAll : feedState[]) {
  return {
    type: actions.SET_FEED_ALL_SUCCESS,
    isFeedAllSuccess,
    feedAll
  };
}

function setFeedAllError(FeedAllError : string) {
  return {
    type: actions.SET_FEED_ALL_ERROR,
    FeedAllError
  }
}
