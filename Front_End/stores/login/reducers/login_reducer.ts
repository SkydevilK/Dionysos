import { actions } from '../actions/login'

export interface loginState {
  isLoginPending: boolean;
  isLoginSuccess: boolean,
  loginError: string
}

const initialState: loginState = {
  isLoginPending: false,
  isLoginSuccess: false,
  loginError: '',
};

export default function loginReducer(state = initialState, action : any) {
  switch (action.type) {
    case actions.SET_LOGIN_PENDING:
      return {...state,
        isLoginPending: action.isLoginPending
      }

    case actions.SET_LOGIN_SUCCESS:
      return {...state,
        isLoginSuccess: action.isLoginSuccess
      }

    case actions.SET_LOGIN_ERROR:
      return {...state,
        loginError: action.loginError
      }

    default:
      return state;
  }
}

