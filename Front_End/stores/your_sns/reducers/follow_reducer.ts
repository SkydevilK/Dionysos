import { actions } from '../actions/follow'
import {User} from "../reducers/userFeed_reducer";


  export interface friendFollow {
    follow : User[],
    follower : User[],
    isUserFoolowPending : boolean,
    isUserFollowSucceess : boolean,
    isUserFollowError : string
  }


const initialState : friendFollow = { 

    follow : [],
    follower :[],
    isUserFoolowPending : false,
    isUserFollowSucceess : false,
    isUserFollowError : ''
}


export default function followReducer(state = initialState, action : any) {
  switch (action.type) {
    case actions.SET_USER_FOLLOW_PENDING:
      return {...state, 
        isUserFollowPending: action.isUserFollowPending
      }

    case actions.SET_USER_FOLLOW_SUCCESS:
      return {...state,
        isUserFollowSuccess: action.isUserFollowSuccess,
        follow : action.follow,
      }

      case actions.SET_USER_FOLLOWER_SUCCESS:
        return {...state,
          isUserFollowSuccess: action.isUserFollowSuccess,
          follower : action.follower
        }

    case actions.SET_USER_FOLLOW_ERROR:
      return {...state,
        isUserFollowError: action.UserFollowError
      }
    default:
      return state;
  }
}
