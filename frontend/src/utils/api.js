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

export function getPartyData(date) {

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

    return axios.get(`/api/dashboardDonut/`+date)
        .then(response => {
            console.log('getDonutData', response.data);
            return response.data;
        })
        .catch(error => {
            return error.message;
        });
}

export function getDashboardBarChartData(date) {

    return axios.get(`/api/getleaderboardbarchartdata/`+date)
        .then(response => {
            console.log('getDashboardBarChartData', response.data);
            return response.data;
        })
        .catch(error => {
            return error.message;
        });
}

export function getDashboardLineChartData(dateList) {


    return axios({
        method: 'post',
        url: "/api/daily/getleaderboardlinechartdata",
        data: dateList,
        config:{headers:{'Content-Type':'application/json'}}
    }).then((response) => {
        return response.data
        console.log('getDashboardLineChartData', response.data);
    }).catch((error) => {
        console.log('error', error.message)
    });

}


export function getPoliticianLinechartsInfo(dateList,politicianID) {

    var body = {dateList:dateList,politicianID:politicianID}
    console.log("start calling db")

    return axios({
        method: 'post',
        url: "/api/daily/getpoliticianlinechart",
        data: body,
        config:{headers:{'Content-Type':'application/json'}}
    }).then((response) => {
        return response.data
        console.log('getpoliticianlinechartreceive', response.data);
    }).catch((error) => {
        console.log('error', error.message)
    });
}

export function getPartyLinechartsInfo(dateList,partyName) {

    var body = {dateList:dateList,party:partyName}

    return axios({
        method: 'post',
        url: "/api/daily/getPartylinechart",
        data: body,
        config:{headers:{'Content-Type':'application/json'}}
    }).then((response) => {
        return response.data

    }).catch((error) => {
        console.log('error', error.message)
    });
}

export function getTopLeadersInParty(party,date) {

    var body = {party:party,date:date}

    return axios({
        method: 'post',
        url: "/api/getpartytopleaders",
        data: body,
        config:{headers:{'Content-Type':'application/json'}}
    }).then((response) => {
        return response.data

    }).catch((error) => {
        console.log('error', error.message)
    });
}