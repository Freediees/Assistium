const initialState = { 
  dataChart:[],
};

const BarDashboardReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'BAR_DASHBOARD_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
      }
    break;
    
    case 'BAR_DASHBOARD_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'BAR_DASHBOARD_FULFILLED':
      return {
        ...state,  
        dataChart:action.payload.data.data,
      }
    break;
    
    default:
      return state;
  }
};


export default BarDashboardReducer;