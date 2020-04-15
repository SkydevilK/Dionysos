import { wineDetailService } from '../services/wineDetail';
import { Wine } from "../reducers/wineDetail_reducer";

export const actions = {
  SET_WINE_DETAIL_PENDING: 'SET_WINE_DETAIL_PENDING',
  SET_WINE_DETAIL_SUCCESS: 'SET_WINE_DETAIL_SUCCESS',
  SET_WINE_DETAIL_ERROR: 'SET_WINE_DETAIL_ERROR'
}


export function getWineDetail(wid : number) {
  
  return async (dispatch: (arg0: { type: string; isWineDetailPending?: boolean; isWineDetailSuccess?: boolean; WineDetailError?: string; }) => void) => {
   dispatch(setWineDetailPending(true));

   dispatch(setWineDetailError("not yet"));

   await wineDetailService.getWineDetail(wid).then(
     (response : any) => {
      dispatch(setWineDetailPending(false));

      let wine : Wine = response;

      dispatch(setWineDetailSuccess(true, wine));
      
     },
     error => {
       dispatch(setWineDetailPending(false));
       dispatch(setWineDetailError("getWineDetail error"));
     }
   );
 }
}


export function createWineLike(wid : number) {
  
  return async (dispatch: (arg0: { type: string; isWineDetailPending?: boolean; isWineDetailSuccess?: boolean; WineDetailError?: string; }) => void) => {
   dispatch(setWineDetailPending(true));

   dispatch(setWineDetailError("not yet"));

   await wineDetailService.createWineLike(wid).then(
     (response : any) => {

     },
     error => {
       dispatch(setWineDetailPending(false));
       dispatch(setWineDetailError("create Wine Like error"));
     }
   );
 }
}




export function deleteWineLike(wid : number) {
  
  return async (dispatch: (arg0: { type: string; isWineDetailPending?: boolean; isWineDetailSuccess?: boolean; WineDetailError?: string; }) => void) => {
   dispatch(setWineDetailPending(true));

   dispatch(setWineDetailError("not yet"));

   await wineDetailService.deleteWineLike(wid).then(
     (response : any) => {

     },
     error => {
       dispatch(setWineDetailPending(false));
       dispatch(setWineDetailError("delete Wine Like error"));
     }
   );
 }
}




function setWineDetailPending(isWineDetailPending : boolean) {
  return {
    type: actions.SET_WINE_DETAIL_PENDING,
    isWineDetailPending
  };
}

function setWineDetailSuccess(isWineDetailSuccess : boolean, wine : Wine) {
  return {
    type: actions.SET_WINE_DETAIL_SUCCESS,
    isWineDetailSuccess,
    wine
  };
}

function setWineDetailError(WineDetailError : string) {
  return {
    type: actions.SET_WINE_DETAIL_ERROR,
    WineDetailError
  }
}
