import { wineService } from '../services/wine';
import { createBrowserHistory } from 'history';
import { Wine } from "../reducers/wine_reducer";

export const actions = {
  SET_WINE_INFO_PENDING: 'SET_WINE_INFO_PENDING',
  SET_WINE_INFO_SUCCESS: 'SET_WINE_INFO_SUCCESS',
  SET_WINE_INFO_ERROR: 'SET_WINE_INFO_ERROR'
}


export function getWineListByType(type : string) {
  return async (dispatch: (arg0: { type: string; isLoginPending?: boolean; isLoginSuccess?: boolean; loginError?: string; }) => void) => {
   dispatch(setWinePending(true));

   dispatch(setWineError("not yet"));
  
   
   await wineService.getWineListByType(type).then(
     (response : any) => {
      dispatch(setWinePending(false));
  
    
      let wines : Wine[] = response;

      dispatch(setWineSuccess(true, wines));
      
     },
     error => {
       dispatch(setWinePending(false));
       dispatch(setWineError("getWineListByType error"));
     }
   );
 }
}


export function getWineListByNameList(names : string[]) {

  return async (dispatch: (arg0: { type: string; isLoginPending?: boolean; isLoginSuccess?: boolean; loginError?: string; }) => void) => {
   dispatch(setWinePending(true));

   dispatch(setWineError("not yet"));
 
   
   await wineService.getWineListByNameList(names).then(
     (response : any) => {
      dispatch(setWinePending(false));

      let wines : Wine[] = response;

      dispatch(setWineSuccess(true, wines));
      
     },
     error => {
       dispatch(setWinePending(false));
       dispatch(setWineError("getWineListByType error"));
     }
   );
 }
}



export function getWineUseList(countries : string[], names : string[]) {
  return async (dispatch: (arg0: { type: string; isLoginPending?: boolean; isLoginSuccess?: boolean; loginError?: string; }) => void) => {
   dispatch(setWinePending(true));

   dispatch(setWineError("not yet"));
 
   
   await wineService.getWineUseList(countries, names).then(
     (response : any) => {
      dispatch(setWinePending(false));

      let wines : Wine[] = response;

      dispatch(setWineSuccess(true, wines));
      
     },
     error => {
       dispatch(setWinePending(false));
       dispatch(setWineError("getWineListByType error"));
     }
   );
 }
}





export function searchWineByName(name : string) {
  return async (dispatch: (arg0: { type: string; isLoginPending?: boolean; isLoginSuccess?: boolean; loginError?: string; }) => void) => {
   dispatch(setWinePending(true));

   dispatch(setWineError("not yet"));
 
   
   await wineService.searchWineByName(name).then(
     (response : any) => {
      dispatch(setWinePending(false));
    
      let wines : Wine[] = response;
      dispatch(setWineSuccess(true, wines));
      
     },
     error => {
       dispatch(setWinePending(false));
       dispatch(setWineError("searchWineByName  error"));
     }
   );
 }
}






export function searchWineByFood(name : string) {
  return async (dispatch: (arg0: { type: string; isLoginPending?: boolean; isLoginSuccess?: boolean; loginError?: string; }) => void) => {
   dispatch(setWinePending(true));

   dispatch(setWineError("not yet"));
 
   
   await wineService.searchWineByFood(name).then(
     (response : any) => {
      dispatch(setWinePending(false));
    
      let wines : Wine[] = response;
      dispatch(setWineSuccess(true, wines));
      
     },
     error => {
       dispatch(setWinePending(false));
       dispatch(setWineError("searchWineByName  error"));
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

function setWineSuccess(isWineSuccess : boolean, wineList : Wine[]) {
  return {
    type: actions.SET_WINE_INFO_SUCCESS,
    isWineSuccess,
    wineList
  };
}

function setWineError(WineError : string) {
  return {
    type: actions.SET_WINE_INFO_ERROR,
    WineError
  }
}
