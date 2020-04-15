import { actions } from '../actions/userFeed'
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
    fid: number,
    title : string,
    content: string,
    // createdTimeAt: string,
    // updateTimeAt: string,
    visit: number,
    likeNum: number,
    rating: number,
    wine: any,
    user: User
  }

  export interface friendFeedState {
    friendFeed : Feed[],
    isUserFeedPending : boolean,
    isUserFeedSucceess : boolean,
    isUserFeedError : string
  }




const initialState : friendFeedState = { 
  friendFeed : [],
  isUserFeedPending : false,
  isUserFeedSucceess : false,
  isUserFeedError : ''
}


export default function feedReducer(state = initialState, action : any) {
  switch (action.type) {
    case actions.SET_FRIEND_FEED_INFO_PENDING:
      return {...state, 
        isUserFeedPending: action.isUserFeedPending
      }

    case actions.SET_FRIEND_FEED_INFO_SUCCESS:
      return {...state,
        isUserFeedSuccess: action.isUserFeedSuccess,
        friendFeed : action.userFeed
      }

    case actions.SET_FRIEND_FEED_INFO_ERROR:
      return {...state,
        isUserFeedError: action.UserFeedError
      }
    default:
      return state;
  }
}
