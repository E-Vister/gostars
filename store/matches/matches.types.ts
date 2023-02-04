export interface ITeam {
    name: string;
    logo: string;
}

interface IMatchEvent {
    name: string;
    logo: string;
}

export interface IMatch {
    id: number;
    time: string;
    team1: ITeam;
    team2: ITeam;
    score: string;
    matchType: string;
    matchEvent: IMatchEvent;
    meta: string;
}

export interface IMatches {
    matches: IMatch[];
}