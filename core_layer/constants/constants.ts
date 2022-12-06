import { HOST } from "../tokens/api_token";

export const INTERACTION_TIMEOUT = 1000;

export const primary_url = `http://${HOST}:8080`;

export const USER = {
    default: {
        username: 'default',
        password: '1q2w3e'
    },
    superadmin: {
        username: 'superadmin',
        password: 'erebus'
    }
}