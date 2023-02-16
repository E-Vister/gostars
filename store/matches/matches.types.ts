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
    firstPick?: 'team1' | 'team2';
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
    number: number;
}

interface IMatchEvent {
    name: string;
    logo: string;
    id: number;
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
    stream: string;
}

export interface IMatches {
    matches: IMatch[];
    currentMatch?: IMatch;
    loading?: 'idle' | 'pending';
}