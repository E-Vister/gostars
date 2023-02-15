import axios from 'axios';
import {IMatch} from "@/store/matches/matches.types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/',
    headers: {
        'Access-Control-Allow-Credentials': true,
    }
});

export const matchesAPI = {
    async getMatches() {
        const response = await instance.get('/matches');
        return response.data as IMatch[];
    },
    async getMatchById(id: number) {
        const response = await instance.get(`/matches/${id}`);
        return response.data as IMatch[];
    },
    async getResults(offset?: number) {
        offset = offset || 0;
        const response = await instance.get(`/matches/results?offset=${offset}`)
        return response.data as IMatch[];
    },
    async getUpcoming() {
        const response = await instance.get(`/matches/upcoming`)
        return response.data as IMatch[];
    }
}