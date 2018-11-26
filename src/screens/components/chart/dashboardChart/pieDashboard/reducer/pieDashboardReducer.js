const initialState = { 
  data:'',

};

const PieDashboardReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'PIE_DASHBOARD_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
      }
    break;
    
    case 'PIE_DASHBOARD_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'PIE_DASHBOARD_FULFILLED':
      return {
        ...state,  
        data:action.payload.data,
      }
    break;
    
    default:
      return state;
  }
};


export default PieDashboardReducer;