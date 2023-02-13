import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AppState, AppThunk} from "../store";
import {IMatches} from "@/store/matches/matches.types";
import {matchesAPI} from "@/api/api";


const initialState: IMatches = {
    matches: [],
    currentMatch: undefined,
    loading: "idle",
};

export const matchesSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {
        onLoading(state) {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        matchesReceived(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.matches = action.payload
            }
        },
        matchReceived(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.currentMatch = action.payload
            }
        },
    }
});

export const {onLoading, matchesReceived, matchReceived} = matchesSlice.actions;

export const getMatches = (): AppThunk => async (dispatch) => {
    dispatch(onLoading());
    const response = await matchesAPI.getMatches();
    dispatch(matchesReceived(response));
}
export const getMatchById = (id: number): AppThunk => async (dispatch) => {
    dispatch(onLoading());
    const response = await matchesAPI.getMatchById(id);
    dispatch(matchReceived(response));
}

export const selectMatches = (state: AppState) => state.matches.matches;
export const selectMatchesLoading = (state: AppState) => state.matches.matches;
export const selectCurrentMatch = (state: AppState) => state.matches.currentMatch;

export default matchesSlice.reducer;