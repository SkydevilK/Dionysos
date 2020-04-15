import { actions } from '../actions/feedDetail'
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


export interface Comment {
    cid : number,
    content : string,
    user: User,
  }

export interface Feed {
    fid : number,
    title : string,
    content: string,
    createdTimeAt: string,
    updateTimeAt: string,
    visit: number,
    likeNum: number,
    rating : number,
    wine : Wine,
    user: User
  }

  export interface feedDetail {
    feedDetail : Feed,
    commentList : any,
    isFeedDetailPending : boolean,
    isFeedDetailSucceess : boolean,
    isFeedDetailError : string,
    isCommentSuccess : boolean
  }




const initialState : feedDetail = { 

  feedDetail : {
        fid: 0,
        title : '',
  content: '',
  createdTimeAt: '',
  updateTimeAt: '',
  visit: 0,
  likeNum: 0,
  rating: 0,
  wine: {
    wid: 0,
    nameKor : '',
    nameEng: '',
    type: '',
    sparkling: false,
    grape: '',  
    country: '',
    countrySub: '',
    winery: '',
    alcohol: 0,
    whenUse: '',
    grade: '',
    sweet: 0,
    body: 0,
    acid: 0,
    tannin: 0,
    foodMatch: '',
    info: '',
    visit : 0,
    likeNum: 0
  },
  user: {
    uid: 0,
    kakaotalkId: '',
    naverId: '',
    googleId: '',
    facebookId: '',
    email: '',
    nickName: ''
  }
  },
  commentList : [],
  isFeedDetailPending : false,
  isFeedDetailSucceess : false,
  isFeedDetailError : '',
  isCommentSuccess : false
}


export default function feedReducer(state = initialState, action : any) {
  switch (action.type) {
    case actions.SET_FEED_DETAIL_PENDING:
      return {...state, 
        isFeedDetailPending: action.isFeedDetailPending
      }

    case actions.SET_FEED_DETAIL_SUCCESS:
      return {...state,
        isFeedDetailSuccess: action.isFeedDetailSuccess,
        feedDetail : action.feedDetail,
        commentList : action.commentList
      }

    case actions.SET_FEED_DETAIL_ERROR:
      return {...state,
        isFeedDetailError: action.FeedDetailError
      }

      case actions.SET_POST_COMMENT_SUCCESS:
        return {...state,
          isCommentSuccess : action.isCommentSuccess,
          commentList : action.commentList
        }
      case actions.SET_COMMENT_UPDATE_SUCCESS:
        return {...state,
          isCommentSuccess : action.isCommentSuccess,
          commentList : action.commentList
        }
    default:
      return state;
  }
}
