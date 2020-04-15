import { actions } from '../actions/mainRank';
import {Feed} from "../../feed/reducers/feed_detail_reducer";

// example consuming code
export interface Wine {
  wid: number;
  nameKor : string;
  nameEng: string;
  type: string;
  sparkling: boolean,
  grape: string;
  country: string;
  countrySub: string;
  winery: string;
  alcohol: number,
  whenUse: string;
  grade: string,
  sweet: number,
  body: number,
  acid: number,
  tannin: number,
  foodMatch: string;
  info: string;
  visit : number;
  likeNum: number
}


export interface wineRankState  {
  wineTop3 : Wine[],
  wineTop5 : Wine[],
  reviewTop5 : Feed[],
  isWinePending : boolean,
  isWineTop3Success : boolean,
  isReviewTop5Success : boolean,
  isWineTop5Success : boolean,
  isWineError : string

}
const initialState : wineRankState = { 
  wineTop3 : [],
    wineTop5 : [],
    reviewTop5 : [],
    isWinePending : false,
    isWineTop3Success : false,
    isWineTop5Success : false,
    isReviewTop5Success : false,
    isWineError : ''
}

export default function rootReducer(state = initialState, action : any) {
  switch (action.type) {
    case actions.SET_WINE_INFO_PENDING:
      return {...state, 
        isWinePending: action.isWinePending
      }

    case actions.SET_WINE_TOP3_SUCCESS:
      return {...state,
        isWineTop3Success: action.isWineTop3Success,
        wineTop3 : action.wineTop3
      }

      case actions.SET_WINE_TOP5_SUCCESS:
        return {...state,
          isWineTop5Success: action.isWineTop5Succeess,
          wineTop5 : action.wineTop5
        }

      case actions.SET_REVIEW_TOP5_SUCCESS:
        return {...state,
          isReviewTop5Success: action.isReviewTop5Success,
          reviewTop5 : action.reviewTop5
        }

    case actions.SET_WINE_INFO_ERROR:
      return {...state,
        isWineError: action.WineError
      }
    default:
      return state;
  }
}
