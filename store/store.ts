import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {matchesSlice} from "@/store/matches/matchesSlice";
import {appSlice} from "@/store/app/appSlice";

;

const makeStore = () =>
    configureStore({
        reducer: {
            [matchesSlice.name]: matchesSlice.reducer,
            [appSlice.name]: appSlice.reducer,
        },
        devTools: true,
    });

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);