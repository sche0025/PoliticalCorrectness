import axios from 'axios';

export function getLeaderboardData() {
    return axios.get(`/api/getleaderboarddata`)
        .then(response => {
            console.log('getleaderboarddata', response.data);
            return response.data;
        })
        .catch(error => {
            return error.message;
        });
}