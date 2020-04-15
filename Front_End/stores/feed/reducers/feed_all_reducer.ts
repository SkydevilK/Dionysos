import { actions } from '../actions/feedAll';
import {Feed} from "../../feed/reducers/feed_reducer";



  export interface feedAll {
    feedAll : Feed[],
    isFeedAllPending : boolean,
    isFeedAllSucceess : boolean,
    isFeedAllError : string
  }



const initialState : feedAll = { 
  feedAll : [],
  isFeedAllPending : false,
  isFeedAllSucceess : false,
  isFeedAllError : ''
}


export default function feedAllReducer(state = initialState, action : any) {
  switch (action.type) {
    case actions.SET_FEED_ALL_PENDING:
      return {...state, 
        isFeedPending: action.isFeedAllPending
      }

    case actions.SET_FEED_ALL_SUCCESS:
      return {...state,
        isFeedAllSuccess: action.isFeedAllSuccess,
        feedAll: action.feedAll
      }

    case actions.SET_FEED_ALL_ERROR:
      return {...state,
        isFeedAllError: action.FeedAllError
      }
    default:
      return state;
  }
}
