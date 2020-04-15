import { actions } from '../actions/wineDetail'

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

export interface wineDetailState  {
  wine: Wine,
  isWineDetailPending : boolean,
  isWineDetailSucceess : boolean,
  WineDetailError : string

}
const initialState : wineDetailState = { 
  wine : {
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
    isWineDetailPending : false,
    isWineDetailSucceess : false,
    WineDetailError : ''
}


export default function wineDetailReducer(state = initialState, action : any) {
  switch (action.type) {
    case actions.SET_WINE_DETAIL_PENDING:
      return {...state, 
        isWineDetailPending : action.isWineDetailPending
      }

    case actions.SET_WINE_DETAIL_SUCCESS:
      return {...state,
        isWineDetailSucceess: action.isWineDetailSuccess,
        wine : action.wine
      }
      
    case actions.SET_WINE_DETAIL_ERROR:
      return {...state,
        WineDetailError : action.WineDetailError
      }
    default:
      return state;
  }
}
