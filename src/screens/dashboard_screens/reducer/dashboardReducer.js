const initialState = { 
  dataDashboard:'',
  tokenOSH:''
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'DASHBOARD_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
      }
    break;
    
    case 'DASHBOARD_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DASHBOARD_FULFILLED':
      return {
        ...state, 
        dataDashboard:action.payload.data.data.CIV004.foto
      }
    break;
    default:
      return state;
  }
};


export default dashboardReducer;