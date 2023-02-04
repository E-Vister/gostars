import {IMatch, ITeam} from "@/store/matches/matches.types";

export type TeamCellProps = {
    teamType: 'team1' | 'team2',
    isWon?: boolean,
    teamInfo: ITeam
}

export type MatchProps = {
    match: IMatch
}