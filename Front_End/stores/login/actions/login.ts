import { loginService } from '../services/login';
import { createBrowserHistory } from 'history';
export const actions = {
  SET_LOGIN_PENDING: 'SET_LOGIN_PENDING',
  SET_LOGIN_SUCCESS: 'SET_LOGIN_SUCCESS',
  SET_LOGIN_ERROR: 'SET_LOGIN_ERROR'
}
export function login(email : string, password : string) {
   return async (dispatch: (arg0: { type: string; isLoginPending?: boolean; isLoginSuccess?: boolean; loginError?: string; }) => void) => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError("not yet"));
  
    
    await loginService.login(email, password).then(
      
      response => {

        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(true));
    
      //  const history = createBrowserHistory();
      //   history.push('/ranking');
       
      
       
      },
      error => {
        dispatch(setLoginPending(false));
        dispatch(setLoginError("login error"));
      }
    );
  }
}


export function SNSLogin(id : string, nickname: string, provider : string) {
  return async (dispatch: (arg0: { type: string; isLoginPending?: boolean; isLoginSuccess?: boolean; loginError?: string; }) => void) => {
   dispatch(setLoginPending(true));
   dispatch(setLoginSuccess(false));
   dispatch(setLoginError("not yet"));

   await loginService.SNSLogin(id, nickname, provider).then(
     
    response => {
 
       dispatch(setLoginPending(false));
       dispatch(setLoginSuccess(true));


     },
     error => {
    
       dispatch(setLoginPending(false));
       dispatch(setLoginError("login error"));
     }
   );
 }
}


export function logout() {
  return async (dispatch: (arg0: { isLoginSuccess?: boolean;}) => void) => {
    dispatch(setLoginSuccess(false));
  }
}


function setLoginPending(isLoginPending : boolean) {
  return {
    type: actions.SET_LOGIN_PENDING,
    isLoginPending
  };
}
function setLoginSuccess(isLoginSuccess : boolean) {
  return {
    type: actions.SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}
function setLoginError(loginError : string) {
  return {
    type: actions.SET_LOGIN_ERROR,
    loginError
  }
}
