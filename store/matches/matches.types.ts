export interface ITeam {
    name: string;
    logo: string;
    country: string;
}

export interface ITeamScore {
    totalScore: number;
    tSideScore: number;
    ctSideScore: number;
}

export interface IScore {
    main: IMainScore;
    maps: IMap[];
}

export interface IMainScore {
    team1: number;
    team2: number;
}

export interface IMap {
    team1: ITeamScore;
    team2: ITeamScore;
    name: 'Vertigo' | 'Overpass' | 'Nuke' | 'Mirage' | 'Ancient' | 'Inferno' | 'Anubis';
    pickedBy: 'team1' | 'team2' | 'decider';
    won: 'team1' | 'team2' | 'draw';
}

interface IMatchEvent {
    name: string;
    logo: string;
    live: string;
}

export interface IMatch {
    id: number;
    date: string;
    team1: ITeam;
    team2: ITeam;
    score: IScore;
    picks: string[];
    matchType: 'LAN' | 'Online';
    matchEvent: IMatchEvent;
    meta: 'bo1' | 'bo2' | 'bo3' | 'bo5';
    status: 'upcoming' | 'ended';
}

export interface IMatches {
    matches: IMatch[];
}