import { Login, Logout } from "../../../actions/actionTypes";

const initialState = { 
  isLoggedIn: false,
  statusErrorFrom:true,
  loaderStatus:false,
  compdep_id:'',
  token:'',
  messageStatus:'',
  nik_user:'',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOGIN_REJECTED':
      return{
        ...state, 
        isLoggedIn: false,
        loaderStatus:false,
      }
    break;
    
    case 'LOGIN_PENDING':
      return{
        ...state, 
        isLoggedIn: false,
        loaderStatus:true,
      }
    break;

    case 'LOGIN_FULFILLED':
      return {
        ...state, 
        isLoggedIn: action.payload.data.data.status === 'Failed' ? false : true,
        loaderStatus:false,
        statusErrorFrom:action.payload.data.data.status === 'Failed' ? false : true,
        compdep_id:action.payload.data.data.status === 'Failed' ? '' : action.payload.data.data.auth_mobile[0].compdep_id,
        token:action.payload.data.data.status === 'Failed' ? '' : action.payload.data.data.jwt.token,
        messageStatus:action.payload.data.data.status === 'Failed' ? action.payload.data.data.message : '',
        nik_user:action.payload.data.data.status === 'Failed' ? '' : action.payload.data.data.username
      }
    break;

    case Logout:
      return { ...state, isLoggedIn: false };
    break;
    
    default:
      return state;
  }
};


export default loginReducer;