import axios from 'axios';

export function getLeaderboardData(date) {
    return axios.get(`/api/getleaderboarddata/`+date)
        .then(response => {
            console.log('getleaderboarddata', response.data);
            return response.data;
        })
        .catch(error => {
            return error.message;
        });
}

export function getPoliticiansData(date) {
    return axios.get(`/api/getpoliticiansdata/`+date)
        .then(response => {
            console.log('getpoliticiansdata', response.data);
            return response.data;
        })
        .catch(error => {
            return error.message;
        });
}