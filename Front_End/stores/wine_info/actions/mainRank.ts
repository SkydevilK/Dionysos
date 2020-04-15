import { wineMainService } from '../services/mainRank';
import { createBrowserHistory } from 'history';
import { Wine } from "../reducers/wine_reducer";
import {Feed } from "../../feed/reducers/feed_detail_reducer";


export const actions = {
  SET_WINE_INFO_PENDING: 'SET_WINE_INFO_PENDING',
  SET_WINE_TOP3_SUCCESS: 'SET_WINE_TOP3_SUCCESS',
  SET_WINE_TOP5_SUCCESS: 'SET_WINE_TOP5_SUCCESS',
  SET_REVIEW_TOP5_SUCCESS: 'SET_REVIEW_TOP5_SUCCESS',
  SET_WINE_INFO_ERROR: 'SET_WINE_INFO_ERROR',

}
export function getWineTop3(type : string) {
  return async (dispatch: (arg0: { type: string; isLoginPending?: boolean; isLoginSuccess?: boolean; loginError?: string; }) => void) => {
   dispatch(setWinePending(true));

   dispatch(setWineError("not yet"));
 
   
   await wineMainService.getWineTop3(type).then(
     (response : any) => {
      dispatch(setWinePending(false));

    
      let wines : Wine[] = response;

      dispatch(setWineTop3Success(true, wines));
      
     },
     error => {
       dispatch(setWinePending(false));
       dispatch(setWineError("get Wine Top 3 error"));
     }
   );
 }
}


export function getWineTop5(type : string) {
    return async (dispatch: (arg0: { type: string; isLoginPending?: boolean; isLoginSuccess?: boolean; loginError?: string; }) => void) => {
     dispatch(setWinePending(true));
  
     dispatch(setWineError("not yet"));
   
     
     await wineMainService.getWineTop5(type).then(
       (response : any) => {
        dispatch(setWinePending(false));
  
      
        let wines : Wine[] = response;
 
        dispatch(setWineTop5Success(true, wines));
        
       },
       error => {
         dispatch(setWinePending(false));
         dispatch(setWineError("get Wine Top 10 error"));
       }
     );
   }
  }

  
export function getReviewTop5(type : string) {
  return async (dispatch: (arg0: { type: string; isLoginPending?: boolean; isLoginSuccess?: boolean; loginError?: string; }) => void) => {
   dispatch(setWinePending(true));

   dispatch(setWineError("not yet"));
 
   
   await wineMainService.getReviewTop5(type).then(
     (response : any) => {
      dispatch(setWinePending(false));

    
      let reviews : Feed[] = response;

      dispatch(setReviewTop5Success(true, reviews));
      
     },
     error => {
       dispatch(setWinePending(false));
       dispatch(setWineError("get Review Top 5 error"));
     }
   );
 }
}

  
function setWinePending(isWinePending : boolean) {
  return {
    type: actions.SET_WINE_INFO_PENDING,
    isWinePending
  };
}

function setWineTop3Success(isWineTop3Success : boolean, wineTop3 : Wine[]) {
  return {
    type: actions.SET_WINE_TOP3_SUCCESS,
    isWineTop3Success,
    wineTop3
  };
}

function setWineTop5Success(isWineTop5Success : boolean, wineTop5 : Wine[]) {
    return {
      type: actions.SET_WINE_TOP5_SUCCESS,
      isWineTop5Success,
      wineTop5
    };
  }

  
function setReviewTop5Success(isReviewTop5Success : boolean, reviewTop5: Feed[]) {
  return {
    type: actions.SET_REVIEW_TOP5_SUCCESS,
    isReviewTop5Success,
    reviewTop5
  };
}


function setWineError(WineError : string) {
  return {
    type: actions.SET_WINE_INFO_ERROR,
    WineError
  }
}
