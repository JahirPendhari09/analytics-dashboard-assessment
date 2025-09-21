import * as types from './actionTypes';
import { loadCSV } from '../utils/csv';
import file from "../assets/Electric_Vehicle_Population_Data.csv?url";

// ---------------- Data actions ----------------
export const fetchEVDataRequest = () => ({ type: types.FETCH_EV_DATA_REQUEST });
export const fetchEVDataSuccess = (rows) => ({ type: types.FETCH_EV_DATA_SUCCESS, payload: rows });
export const fetchEVDataFailure = (error) => ({ type: types.FETCH_EV_DATA_FAILURE, payload: error });

// Thunk for async fetch
export const fetchEVData = () => async (dispatch) => {
    dispatch(fetchEVDataRequest());
    try {
        const rows = await loadCSV(file);
        dispatch(fetchEVDataSuccess(rows));
    } catch (err) {
        dispatch(fetchEVDataFailure(err.message || 'Failed to load CSV'));
    }
};

// ---------------- UI actions ----------------
export const toggleSidebar = () => ({ type: types.TOGGLE_SIDEBAR });
export const closeSidebar = () => ({ type: types.CLOSE_SIDEBAR });
export const toggleTheme = () => ({ type: types.TOGGLE_THEME });
export const setTheme = (theme) => ({ type: types.SET_THEME, payload: theme });


