import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {IMatches} from "@/store/matches/matches.types";


const initialState: IMatches = {
    matches: [
        {
            id: 1,
            date: 'Mon, 10 Feb 2023 14:00:00 GMT',
            team1: {
                name: 'Natus Vincere',
                logo: 'https://svgur.com/i/pvM.svg'
            },
            team2: {
                name: 'G2',
                logo: 'https://i.imgur.com/3oqItcT.png'
            },
            score: {
                main: {
                    team1: 0,
                    team2: 0,
                },
                detailed: []
            },
            picks: [],
            matchType: 'LAN',
            matchEvent: {
                name: 'BLAST Premier Spring Groups 2023',
                logo: 'https://i.imgur.com/t1HQOz0.png'
            },
            meta: 'bo3',
            status: 'upcoming',
        },
        {
            id: 2,
            date: 'Mon, 10 Feb 2023 14:00:00 GMT',
            team1: {
                name: 'Natus Vincere',
                logo: 'https://svgur.com/i/pvM.svg'
            },
            team2: {
                name: 'G2',
                logo: 'https://i.imgur.com/3oqItcT.png'
            },
            score: {
                main: {
                    team1: 2,
                    team2: 1,
                },
                detailed: [
                    {
                        team1: {totalScore: 16, tSideScore: 11, ctSideScore: 5},
                        team2: {totalScore: 4, tSideScore: 0, ctSideScore: 4},
                        map: 'Nuke',
                        pickedBy: 'team1',
                        won: 'team1'
                    },
                    {
                        team1: {totalScore: 14, tSideScore: 7, ctSideScore: 7},
                        team2: {totalScore: 16, tSideScore: 8, ctSideScore: 8},
                        map: 'Mirage',
                        pickedBy: 'team2',
                        won: 'team2'
                    },
                    {
                        team1: {totalScore: 16, tSideScore: 6, ctSideScore: 10},
                        team2: {totalScore: 12, tSideScore: 3, ctSideScore: 9},
                        map: 'Anubis',
                        pickedBy: 'decider',
                        won: 'team1'
                    },
                ]
            },
            picks: ['Vertigo', 'Overpass', 'Nuke', 'Mirage', 'Ancient', 'Inferno', 'Anubis'],
            matchType: 'LAN',
            matchEvent: {
                name: 'BLAST Premier Spring Groups 2023',
                logo: 'https://i.imgur.com/t1HQOz0.png'
            },
            meta: 'bo3',
            status: 'ended'
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