import { actions } from '../actions/wineInfo'


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


export interface smartSearch  {
  searchList : Wine[],
  isSmartSearchPending : boolean,
  isSmartSearchSucceess : boolean,
  isSmartSearchError : string

}
const initialState : smartSearch = { 
    searchList : [],
    isSmartSearchPending : false,
    isSmartSearchSucceess : false,
    isSmartSearchError : ''
}

export default function rootReducer(state = initialState, action : any) {
  switch (action.type) {
    case actions.SET_SMART_SEARCH_PENDING:
      return {...state, 
        isSmartSearchPending: action.isSmartSearchPending
      }

    case actions.SET_SMART_SEARCH_SUCCESS:
      return {...state,
        isSmartSearchSuccess: action.isSmartSearchSuccess,
        searchList : action.searchList
      }

    case actions.SET_SMART_SEARCH_ERROR:
      return {...state,
        isSmartSearchError: action.SmartSearchError
      }
    default:
      return state;
  }
}
