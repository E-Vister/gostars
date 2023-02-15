import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "../store";


const initialState: {currentLocale: string} = {
    currentLocale: 'en-US'
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLocale(state, action) {
            state.currentLocale = action.payload
        }
    }
});

export const {setLocale} = appSlice.actions;
export const selectLocale = (state: AppState) => state.app.currentLocale;

export default appSlice.reducer;