import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {matchesSlice} from "@/store/matches/matchesSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            [matchesSlice.name]: matchesSlice.reducer,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);