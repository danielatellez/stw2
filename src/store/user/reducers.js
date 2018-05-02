import {
  TOKEN_PENDING,
  TOKEN_SUCCESS,
  TOKEN_FAIL,
  TOKEN_CLEAR,
} from '../constants';

const initialState = {
  pending: false,
  name: '',
  email: '',
  phone: '',
  admin: '',
  token: '',
  error: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_PENDING:
      return {
        ...state,
        error: '',
        pending: true,
      };

    case TOKEN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        pending: false,
      };

    case TOKEN_FAIL:
      return {
        ...state,
        error: action.payload.response.data,
        pending: false,
      };

    case TOKEN_CLEAR:
      return {
        ...state,
        token: '',
      };

    default:
      return state;
  }
};

export default userReducer;
