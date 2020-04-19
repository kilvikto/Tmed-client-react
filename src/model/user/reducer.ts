import { authenticateUser, registerUser } from './api';
import { setAuthorizationToken } from 'utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import cookies from '../cookie';

const USER_LOADED = '@@user/SET_AUTHENTICATED';
const USER_LOGOUT = '@@user/LOG_OUT';
const TOGGLE_REQUEST = '@@user/FORM_REQUEST_TOGGLE';


export const AuthAction = {
  authenticate: (credentials: { email: string, password: string }) => 
    (dispatch) => {
      dispatch(toggleRequest());
      return authenticateUser(credentials)
        .then(({ data }) => {
          const { token } = data;
          const { nameid, typ: role } = jwtDecode(token);
          
          cookies.set('user', token);
          setAuthorizationToken(token);
          
          return dispatch(loadedUser({
            nameId: nameid,
            role
          }));
        })
        .catch((err) => {
          return dispatch(toggleRequest('Email or password are wrong'));
        });
  },
  register: (credentials: { email: string, password: string, role: string, confirmPassword: string }) => {
    const { role, password, confirmPassword } = credentials;
    const isRole = (role === "pacient" || role === "doctor");
    const isMatchPassword = password === confirmPassword;

    return (dispatch) => {
      dispatch(toggleRequest());      
      if (!isRole) return dispatch(toggleRequest('Please, choose your role'));
      else if (!isMatchPassword) return dispatch(toggleRequest("'Passwords doesn't match"));
      
      return registerUser(credentials)
        .then(({ data: { token } }) => {
          const { nameid, typ: role } = jwtDecode(token); 
          cookies.set('user', token);
          setAuthorizationToken(token);
          return dispatch(loadedUser({
            nameId: nameid,
            role
          }));
        })
        .catch(({ response }) => {
          if (response?.data?.message) {
            const { data: { message} } = response;
            return dispatch(toggleRequest(message))
          };
        });
    }
  },
  loadUser: () => (dispatch) => {
    const user = cookies.get('user');
    if (user) {
      const { nameid, typ: role } = jwtDecode(user);
      setAuthorizationToken(user);
      return dispatch(loadedUser({
        nameId: nameid,
        role
      }));
    }; 
  },
  logOut: () => (dispatch) => {
    setAuthorizationToken(null);
    cookies.remove('user');
    //also remove cookies of another models right here
    return dispatch({
      type: USER_LOGOUT
    });
  }
};

function toggleRequest (error = "") {
  return {
    type: TOGGLE_REQUEST,
    payload: error
  }
};

function loadedUser (payload) {
  return {
    type: USER_LOADED,
    payload
  };
};

const initialState = {
  request: {
    isLoading: false,
    error: ''
  },
  nameId: '',
  role: '', 
};


const ACTION_HANDLERS = {
  [USER_LOADED]: (state, { payload }) => ({
    request: { ...initialState.request },
    ...payload,
  }),
  [USER_LOGOUT]: () => ({
    ...initialState
  }),
  [TOGGLE_REQUEST]: (state, { payload }) => {
    if (!payload) return {
       ...state, 
       request: {
        ...initialState.request,
        isLoading: true,
      }
    };
    return ({
      ...state,
      request: {
        ...initialState.request,
        error: payload 
      }
    });
  }
};

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
