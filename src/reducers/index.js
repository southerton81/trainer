import { combineReducers } from 'redux';
import ChartReducer from './ChartReducer.js'; 

export default combineReducers({
  chartState: ChartReducer 
});