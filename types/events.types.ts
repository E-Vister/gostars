import {IMatch} from "@/store/matches/matches.types";

type IDate = {
    from: string
    to: string
}

type ILocation = {
    flag: string
    place: string
}

export type IEventPageProps = {
    id: number
    banner: string
    logo: string
    name: string
    prizePool: string
    teamsNumber: string
    eventStatus: string
    location: ILocation
    date: IDate
    results: IMatch[]
}