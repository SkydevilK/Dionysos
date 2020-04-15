import { feedService } from '../services/feedDetail';
import { createBrowserHistory } from 'history';
import { feedDetail, Comment } from "../reducers/feed_detail_reducer";


export const actions = {
  SET_FEED_DETAIL_PENDING: 'SET_FEED_DETAIL_PENDING',
  SET_FEED_DETAIL_SUCCESS: 'SET_FEED_DETAIL_SUCCESS',
  SET_FEED_DETAIL_ERROR: 'SET_FEED_DETAIL_ERROR',
  SET_POST_COMMENT_SUCCESS : 'SET_POST_COMMENT_SUCCESS',
  SET_COMMENT_UPDATE_SUCCESS : 'SET_COMMENT_UPDATE_SUCCESS'
}
export function getFeedDetailByFID(fid : number) {
  return async (dispatch: (arg0: { type: string; isFeedDetailPending?: boolean; isFeedDetailSuccess?: boolean; FeedDetailError?: string; }) => void) => {
   dispatch(setFeedDetailPending(true));

   dispatch(setFeedDetailError("not yet"));
 
   
   await feedService.getFeedDetailByFID(fid).then(
     async (response : any) => {
      dispatch(setFeedDetailPending(false));

      let feedDetail : feedDetail = response;
       
      let comment  = JSON.stringify(await feedService.getCommentByFID(fid));

      let commentList = JSON.parse(comment || '{}');
      

      dispatch(setFeedDetailSuccess(true, feedDetail, commentList));
      
     },
     error => {
       dispatch(setFeedDetailPending(false));
       dispatch(setFeedDetailError("feedDetail error"));
     }
   );
 }
}



export function postComment(content : string, fid : number) {
  return async (dispatch: (arg0: { type: string; isFeedDetailPending?: boolean; isFeedDetailSuccess?: boolean; FeedDetailError?: string; }) => void) => {
   dispatch(setFeedDetailPending(true));

   await feedService.postComment(content, fid).then(
     async (response : any) => {
      dispatch(setFeedDetailPending(false));
       
      let comment  = JSON.stringify(await feedService.getCommentByFID(fid));

      let commentList = JSON.parse(comment || '{}');
      
      dispatch(setPostCommentSuccess(true, commentList));
      
     },
     error => {
       dispatch(setFeedDetailPending(false));
       dispatch(setFeedDetailError("getWineListByType error"));
     }
   );
 }
}





export function followUserByUID(uid : number) {
  return async (dispatch: (arg0: { type: string; isFeedDetailPending?: boolean; isFeedDetailSuccess?: boolean; FeedDetailError?: string; }) => void) => {
   dispatch(setFeedDetailPending(true));
   await feedService.followUser(uid).then(
     async (response : any) => {
      dispatch(setFeedDetailPending(false));
      feedService.getUserFollowList();
     },
     error => {
      dispatch(setFeedDetailPending(false));
     }
   );
 }
}

export function UnfollowUserByUID(uid : number) {
  return async (dispatch: (arg0: { type: string; isFeedDetailPending?: boolean; isFeedDetailSuccess?: boolean; FeedDetailError?: string; }) => void) => {
   dispatch(setFeedDetailPending(true));
   await feedService.UnfollowUser(uid).then(
     async (response : any) => {
      dispatch(setFeedDetailPending(false));
      feedService.getUserFollowList();
     },
     error => {
      dispatch(setFeedDetailPending(false));
     }
   );
 }
}



export function createFeedLike(fid : number) {
  
  return async (dispatch: (arg0: { type: string; isWineDetailPending?: boolean; isWineDetailSuccess?: boolean; WineDetailError?: string; }) => void) => {
    dispatch(setFeedDetailPending(true));

   await feedService.createFeedLike(fid).then(
     (response : any) => {
      dispatch(setFeedDetailPending(false));
     },
     error => {
      dispatch(setFeedDetailPending(false));
 
     }
   );
 }
}





export function deleteFeedLike(fid : number) {
  
  return async (dispatch: (arg0: { type: string; isWineDetailPending?: boolean; isWineDetailSuccess?: boolean; WineDetailError?: string; }) => void) => {
    dispatch(setFeedDetailPending(true));

   await feedService.deleteFeedLike(fid).then(
     (response : any) => {
      dispatch(setFeedDetailPending(false));
     },
     error => {
      dispatch(setFeedDetailPending(false));
 
     }
   );
 }
}




export function deleteCommentAndUpdate(fid : number, cid : any){
  
  return async (dispatch: (arg0: { type: string; isWineDetailPending?: boolean; isWineDetailSuccess?: boolean; WineDetailError?: string; }) => void) => {
    dispatch(setFeedDetailPending(true));

   await feedService.deleteComment(cid).then(
     (response : any) => {
      dispatch(setFeedDetailPending(false));
      

      // let comment  = JSON.stringify(feedService.getCommentByFID(fid));

      // let commentList = JSON.parse(comment || '{}');
      
      // dispatch(setCommentUpdateSuccess(true, commentList));

     },
     error => {
      dispatch(setFeedDetailPending(false));
 
     }
   );
 }
}


function setFeedDetailPending(isFeedPending : boolean) {
  return {
    type: actions.SET_FEED_DETAIL_PENDING,
    isFeedPending
  };
}

function setFeedDetailSuccess(isFeedSuccess : boolean, feedDetail : feedDetail, commentList : any) {
  return {
    type: actions.SET_FEED_DETAIL_SUCCESS,
    isFeedSuccess,
    feedDetail,
    commentList
  };
}


function setCommentUpdateSuccess(isCommentSuccess : boolean, commentList : any) {
  return {
    type: actions.SET_COMMENT_UPDATE_SUCCESS,
    isCommentSuccess,
    commentList
  };
}


function setPostCommentSuccess(isCommentSuccess : boolean, commentList : any) {
  return {
    type: actions.SET_POST_COMMENT_SUCCESS,
    isCommentSuccess,
    commentList
  };
}


function setFeedDetailError(FeedError : string) {
  return {
    type: actions.SET_FEED_DETAIL_ERROR,
    FeedError
  }
}
