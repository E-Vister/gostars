import {IMap, IMatch, ITeam} from "@/store/matches/matches.types";

export type TeamCellProps = {
    teamType: 'team1' | 'team2',
    isWon?: boolean,
    teamInfo: ITeam
}

export type MatchProps = {
    match: IMatch
}

export type PickCardProps = {
    teamName?: string,
    teamLogo?: string,
    map?: string,
    banned?: true,
    decider?: true,
    upcoming?: true,
}

export type BestOfXPageProps = {
    team1: ITeam
    team2: ITeam
    picks: string[]
    firstPick?: 'team1' | 'team2'
}

export type ITeams = {
    team1: ITeam;
    team2: ITeam;
}