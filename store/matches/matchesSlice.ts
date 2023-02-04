import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {IMatches} from "@/store/matches/matches.types";


const initialState: IMatches = {
    matches: [
        {
            id: 1,
            time: '13:00',
            team1: {
                name: 'Natus Vincere',
                logo: 'https://svgur.com/i/pvM.svg'
            },
            team2: {
                name: 'G2',
                logo: 'https://i.imgur.com/3oqItcT.png'
            },
            score: 'vs',
            matchType: 'LAN',
            matchEvent: {
                name: 'BLAST Premier Spring Groups 2023',
                logo: 'https://i.imgur.com/t1HQOz0.png'
            },
            meta: 'bo3'
        },
        {
            id: 1,
            time: '13:00',
            team1: {
                name: 'Natus Vincere',
                logo: 'https://svgur.com/i/pvM.svg'
            },
            team2: {
                name: 'G2',
                logo: 'https://i.imgur.com/3oqItcT.png'
            },
            score: '2-1',
            matchType: 'LAN',
            matchEvent: {
                name: 'BLAST Premier Spring Groups 2023',
                logo: 'https://i.imgur.com/t1HQOz0.png'
            },
            meta: 'bo3'
        }
    ]
};

export const matchesSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {}
});

export const {} = matchesSlice.actions;

export const selectMatches = (state: AppState) => state.matches.matches;

export default matchesSlice.reducer;