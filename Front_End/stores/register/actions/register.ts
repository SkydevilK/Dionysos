import { registerService } from '../services/register';
import { createBrowserHistory } from 'history';

export const actions = {
  SET_REGISTER_PENDING: 'SET_REGISTER_PENDING',
  SET_REGISTER_SUCCESS: 'SET_REGISTER_SUCCESS',
  SET_REGISTER_ERROR: 'SET_REGISTER_ERROR',
  SET_EMAIL_STATE: 'SET_EMAIL_STATE'
}

export function register(nickname : string, email : string, password : string) {
   return async (dispatch: (arg0: { type: string; isRegisterPending?: boolean; isRegisterSuccess?: boolean; registerError?: string; }) => void) => {
    dispatch(setRegisterPending(true));
    dispatch(setRegisterSuccess(false));
    dispatch(setRegisterError("not yet"));
    
    await registerService.register(nickname, email, password).then(

      response => {
        dispatch(setRegisterPending(false));
        dispatch(setRegisterSuccess(true));
    

      },

      error => {
        dispatch(setRegisterPending(false));
        dispatch(setRegisterError("register error"));
      }
    );
  }
}



export function emailCheck(email : string) {

  return async (dispatch: (arg0: { emailState : string}) => void) => {
  
   dispatch(setEmailState("not yet"));
   
   await registerService.emailCheck(email).then(
     response => {
       if(response) {
          dispatch(setEmailState("사용할 수 있는 이메일입니다."));
       } else {
        dispatch(setEmailState("사용할 수 없는  이메일입니다."));
       }

     },

     error => {
       dispatch(setEmailState("사용할 수 없는  이메일입니다."));
     }
   )


 }

}



export function SNSRegister(nickname : string, id : string, provider : string) {

  return async (dispatch: (arg0: { type: string; isRegisterPending?: boolean; isRegisterSuccess?: boolean; registerError?: string; }) => void) => {
    dispatch(setRegisterPending(true));
    dispatch(setRegisterSuccess(false));
    dispatch(setRegisterError("not yet"));
    
    await registerService.register(nickname, id, provider).then(

      response => {
        dispatch(setRegisterPending(false));
        dispatch(setRegisterSuccess(true));

    

      },

      error => {
        dispatch(setRegisterPending(false));
        dispatch(setRegisterError("register error"));
      }
    );
  }
}



function setRegisterPending(isRegisterPending : boolean) {
  return {
    type: actions.SET_REGISTER_PENDING,
    isRegisterPending
  };
}

function setRegisterSuccess(isRegisterSuccess : boolean) {
  return {
    type: actions.SET_REGISTER_SUCCESS,
    isRegisterSuccess
  };
}

function setRegisterError(registerError : string) {
  return {
    type: actions.SET_REGISTER_ERROR,
    registerError
  }
}


function setEmailState(emailState : string) {
  return {
    type: actions.SET_EMAIL_STATE,
    emailState
  }
}

