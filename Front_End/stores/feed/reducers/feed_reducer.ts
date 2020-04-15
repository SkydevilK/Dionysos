import { actions } from '../actions/feedInfo'
import {Wine} from "../../wine_info/reducers/wine_reducer";

// example consuming code
export interface User {
  uid: number,
  kakaotalkId: string,
  naverId: string,
  googleId: string,
  facebookId: string,
  email: string,
  nickName: string,
}


export interface Feed {
    fid : number,
    title : string,
    content: string,
    // createdTimeAt: string,
    // updateTimeAt: string,
    visit: number,
    likeNum: number,
    rating : number,
    wine : Wine,
    user: User
  }

  export interface feedState {
    feedList : Feed[],
    isFeedPending : boolean,
    isFeedSucceess : boolean,
    isFeedError : string
  }




const initialState : feedState = { 

  feedList : [],
  isFeedPending : false,
  isFeedSucceess : false,
  isFeedError : ''
}


export default function feedReducer(state = initialState, action : any) {
  switch (action.type) {
    case actions.SET_FEED_INFO_PENDING:
      return {...state, 
        isFeedPending: action.isFeedPending
      }

    case actions.SET_FEED_INFO_SUCCESS:
      return {...state,
        isFeedSuccess: action.isFeedSuccess,
        feedList : action.feedList
        // fid: action.feed.fid,
        // content: action.feed.content,
        // // createdTimeAt: string,
        // // updateTimeAt: string,
        // visit: action.feed.visit,
        // likeNum: action.feed.likeNum,
        // rating: action.feed.rating,
        // wine: action.feed.wine,
        // user: action.feed.user,
      }

    case actions.SET_FEED_INFO_ERROR:
      return {...state,
        isFeedError: action.FeedError
      }
    default:
      return state;
  }
}
