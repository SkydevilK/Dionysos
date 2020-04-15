import { actions } from '../actions/friendInfo';

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

export interface Friend {
    friend : User,
    isFriendInfoPending : boolean,
    isFriendInfoSuccess : boolean,
    isFriendInfoError : string
}
const initialState : Friend = { 
    friend : {
        uid: 0,
        kakaotalkId: '',
        naverId: '',
        googleId: '',
        facebookId: '',
        email: '',
        nickName: '',
    },
    isFriendInfoPending : false,
    isFriendInfoSuccess : false,
    isFriendInfoError : ''

}


export default function friendReducer(state = initialState, action : any) {
  switch (action.type) {
    case actions.SET_FRIEND_INFO_PENDING:
      return {...state, 
        isFriendInfoPending: action.isUserFeedPending
      }

    case actions.SET_FRIEND_INFO_SUCCESS:
      return {...state,
        isFriendInfoSuccess: action.isUserFeedSuccess,
        friend : action.friend
      }

    case actions.SET_FRIEND_INFO_ERROR:
      return {...state,
        isFriendInfoError: action.UserFeedError
      }
    default:
      return state;
  }
}
