import { wineService } from '../services/wine';
import { Wine } from "../reducers/wine_reducer";


export const actions = {
  SET_SMART_SEARCH_PENDING: 'SET_SMART_SEARCH_PENDING',
  SET_SMART_SEARCH_SUCCESS: 'SET_SMART_SEARCH_SUCCESS',
  SET_SMART_SEARCH_ERROR: 'SET_SMART_SEARCH_ERROR'
}


export function getSmartSearch(alcohol : number, country : string, sparkling : boolean, sweet : number, type: string) {
  return async (dispatch: (arg0: { type: string; isSmartSearchPending?: boolean; isSmartSearchSuccess?: boolean; SmartSearchError?: string; }) => void) => {
   dispatch(setSmartSearchPending(true));

   dispatch(setSmartSearchError("not yet"));
 
   
   await wineService.getSmartSearch(alcohol, country, sparkling, sweet, type).then(
     (response : any) => {
      dispatch(setSmartSearchPending(false));

    
      let wines : Wine[] = response;
      dispatch(setSmartSearchSuccess(true, wines));
      
     },
     error => {
       dispatch(setSmartSearchPending(false));
       dispatch(setSmartSearchError("smart Search error"));
     }
   );
 }
}




export function getSmartSearchByName(name : string) {
  return async (dispatch: (arg0: { type: string; isSmartSearchPending?: boolean; isSmartSearchSuccess?: boolean; SmartSearchError?: string; }) => void) => {
   dispatch(setSmartSearchPending(true));

   dispatch(setSmartSearchError("not yet"));
 
   
   await wineService.getSmartSearchByName(name).then(
     (response : any) => {
      dispatch(setSmartSearchPending(false));

      let wines : Wine[] = response;

      dispatch(setSmartSearchSuccess(true, wines));
      
     },
     error => {
       dispatch(setSmartSearchPending(false));
       dispatch(setSmartSearchError("smart Search error"));
     }
   );
 }
}


function setSmartSearchPending(isWinePending : boolean) {
  return {
    type: actions.SET_SMART_SEARCH_PENDING,
    isWinePending
  };
}

function setSmartSearchSuccess(isWineSuccess : boolean, searchList : Wine[]) {
  return {
    type: actions.SET_SMART_SEARCH_SUCCESS,
    isWineSuccess,
    searchList
  };
}

function setSmartSearchError(SmartSearchError : string) {
  return {
    type: actions.SET_SMART_SEARCH_ERROR,
    SmartSearchError
  }
}
