import { combineReducers } from 'redux';
import * as types from './actionTypes';

const initialDataState = {
  rows: [],
  status: 'idle', 
  error: null,
};

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case types.FETCH_EV_DATA_REQUEST:
      return { ...state, status: 'loading', error: null };
    case types.FETCH_EV_DATA_SUCCESS:
      return { ...state, status: 'succeeded', rows: action.payload || [] };
    case types.FETCH_EV_DATA_FAILURE:
      return { ...state, status: 'failed', error: action.payload };
    default:
      return state;
  }
};

const initialUIState = {
  sidebarOpen: false,
  themeMode: localStorage.getItem('themeMode') || 'light',
};

const uiReducer = (state = initialUIState, action) => {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case types.CLOSE_SIDEBAR:
      return { ...state, sidebarOpen: false };
    case types.TOGGLE_THEME: {
      const newTheme = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newTheme);
      return { ...state, themeMode: newTheme };
    }
    case types.SET_THEME:
      localStorage.setItem('themeMode', action.payload);
      return { ...state, themeMode: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  data: dataReducer,
  ui: uiReducer,
});
