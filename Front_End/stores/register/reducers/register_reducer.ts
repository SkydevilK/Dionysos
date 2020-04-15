import { actions } from "../actions/register";

export interface registerState {
  isRegisterPending: boolean;
  isRegisterSuccess: boolean;
  registerError: string;
  emailState: string;
}

const initialState: registerState = {
  isRegisterPending: false,
  isRegisterSuccess: false,
  registerError: "",
  emailState: ""
};

export default function registerReducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.SET_REGISTER_PENDING:
      return Object.assign({}, state, {
        isRegisterPending: action.isRegisterPending
      });

    case actions.SET_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isRegisterSuccess: action.isRegisterSuccess
      });

    case actions.SET_REGISTER_ERROR:
      return Object.assign({}, state, {
        registerError: action.registerError
      });

    case actions.SET_EMAIL_STATE:
      return Object.assign({}, state, {
        emailState: action.emailState
      });

    default:
      return state;
  }
}
