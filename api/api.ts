import axios from 'axios';
import {IMatch} from "@/store/matches/matches.types";
import {IEvent} from "@/types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/',
    headers: {
        'Access-Control-Allow-Credentials': true,
    }
});

export const matchesAPI = {
    async getMatches(): Promise<IMatch[]> {
        const response = await instance.get('/matches');
        return response.data as IMatch[];
    },
    async getMatchById(id: number): Promise<IMatch> {
        const response = await instance.get(`/matches/${id}`);
        return response.data as IMatch;
    },
    async getResults(offset?: number): Promise<IMatch[]> {
        offset = offset || 0;
        const response = await instance.get(`/matches/results?offset=${offset}`)
        return response.data as IMatch[];
    },
    async getUpcoming(): Promise<IMatch[]> {
        const response = await instance.get(`/matches/upcoming`)
        return response.data as IMatch[];
    },
    async getEventById(id: number): Promise<IEvent> {
        const response = await instance.get(`/events/${id}`)
        return response.data;
    }
}