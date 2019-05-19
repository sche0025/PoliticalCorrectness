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

export function getDashboardBarChartData(date) {
    console.log("start calling db")
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
    console.log(dateList)
    console.log("start calling db")
    // return axios.get('/api/daily/getleaderboardlinechartdata/')
    //     .then(response => {
    //         console.log('getDashboardLineChartData', response.data);
    //         return response.data;
    //     })
    //     .catch(error => {
    //         return error.message;
    //     });

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

export function getPoliticianLinechartReceive(dateList,politicianID) {
    console.log(politicianID)
    console.log(dateList)
    var body = {dateList:dateList,politicianID:politicianID}
    console.log("start calling db")
    // return axios.get('/api/daily/getleaderboardlinechartdata/')
    //     .then(response => {
    //         console.log('getDashboardLineChartData', response.data);
    //         return response.data;
    //     })
    //     .catch(error => {
    //         return error.message;
    //     });

    return axios({
        method: 'post',
        url: "/api/daily/getpoliticianlinechartreceive",
        data: body,
        config:{headers:{'Content-Type':'application/json'}}
    }).then((response) => {
        return response.data
        console.log('getpoliticianlinechartreceive', response.data);
    }).catch((error) => {
        console.log('error', error.message)
    });
}

export function getPoliticianLinechartPost(dateList,politicianID) {
    console.log(politicianID)
    console.log(dateList)
    var body = {dateList:dateList,politicianID:politicianID}
    console.log("start calling db")
    // return axios.get('/api/daily/getleaderboardlinechartdata/')
    //     .then(response => {
    //         console.log('getDashboardLineChartData', response.data);
    //         return response.data;
    //     })
    //     .catch(error => {
    //         return error.message;
    //     });

    return axios({
        method: 'post',
        url: "/api/daily/getpoliticianlinechartreceive",
        data: body,
        config:{headers:{'Content-Type':'application/json'}}
    }).then((response) => {
        return response.data
        console.log('getpoliticianlinechartreceive', response.data);
    }).catch((error) => {
        console.log('error', error.message)
    });
}

export function getTopLeadersInParty(party,date) {

    var body = {party:party,date:date}
    console.log("start calling db")

    return axios({
        method: 'post',
        url: "/api/getpartytopleaders",
        data: body,
        config:{headers:{'Content-Type':'application/json'}}
    }).then((response) => {
        return response.data
        console.log('getTopLeadersInParty', response.data);
    }).catch((error) => {
        console.log('error', error.message)
    });
}