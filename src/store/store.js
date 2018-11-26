import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from "redux-persist";
import logger from 'redux-logger';
import storage from 'redux-persist/es/storage';
import promiseMiddleware from 'redux-promise-middleware';

// import DashboardReducer   from '../pages/dashboard/reducer/main_dashboard_reducer';
import loginReducer       from '../screens/login_screens/reducer/loginReducer';
import dashboardReducer   from '../screens/dashboard_screens/reducer/dashboardReducer';
import NavigationReducer  from '../navigations/reducer/navigationReducers';

//chart reducer 
import pieChartReducer from '../screens/components/chart/dashboardChart/pieDashboard/reducer/pieDashboardReducer';
import BarDashboardReducer from '../screens/components/chart/dashboardChart/barDashboard/reducer/barDashboardReducer';

//config persist
const config1 = {
  key: "primary",
  storage
};

const LoginReducer = persistReducer(config1, loginReducer);

const rootReducer = combineReducers({
  //dashboard reducer
  dashboardReducer,

  //navigation reducer
  NavigationReducer,

  //login reducer
  LoginReducer,

  // chart reducer 
  pieChartReducer,
  BarDashboardReducer
});

const middlewares = applyMiddleware( 
  promiseMiddleware(),
  logger
);

function configureStore() {
  let store = createStore(rootReducer, middlewares);
  let persistor = persistStore(store);
  return { persistor, store };
}

export default configureStore;