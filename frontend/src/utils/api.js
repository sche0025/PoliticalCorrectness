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
    console.log("start calling db")
    return axios.get(`/api/getpoliticiansdata/`+date)
        .then(response => {
            console.log('getpoliticiansdata', response.data);
            return response.data;
        })
        .catch(error => {
            return error.message;
        });
}

export function getPartyData(date) {
    console.log("start calling db")
    return axios.get(`/api/getpartydata/`+date)
        .then(response => {
            // console.log('getPartyData', response.data);
            return response.data;
        })
        .catch(error => {
            return error.message;
        });
}

export function getTopicTableData(date) {
    console.log("start calling db")
    return axios.get(`/api/toptags/`+date)
        .then(response => {
            console.log('getpoliticiansdata', response.data);
            return response.data;
        })
        .catch(error => {
            return error.message;
        });
}

export function getDonutData(date) {
    console.log("start calling db")
    return axios.get(`/api/dashboardDonut/`+date)
        .then(response => {
            console.log('getDonutData', response.data);
            return response.data;
        })
        .catch(error => {
            return error.message;
        });
}