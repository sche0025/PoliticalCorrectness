module.exports = {
    getLeaderboardData: (data) => {
        if (data) {
            // console.log(data[0])
            // var politicians = data[0]
            let politicians = data
            // console.log(politicians)
            politicians.sort(function (a, b) {
                return (
                    (
                        1 * (a.Sentiment_Pos) +
                        0.1 * (a.Sentiment_Neu) -
                        0.5 * (a.Sentiment_Neg)
                    )
                    -
                    (
                        1 * (b.Sentiment_Pos) +
                        0.1 * (b.Sentiment_Neu) -
                        0.5 * (b.Sentiment_Neg)
                    )
                )
            })

            return last(politicians, 5).reverse()
        }
    },

    sortParty: (parties) => {
        if (parties) {

            parties.sort((a, b) => {
                    return (
                        (b.Sentiment_Pos + b.Sentiment_Neu + b.Sentiment_Neg)
                        -
                        (a.Sentiment_Pos + a.Sentiment_Neu + a.Sentiment_Neg)
                    )
                }
            )

            try{
                return [parties[0],parties[1],parties[2],parties[3],parties[4]]
            }catch (e) {
                console.log("cannot retrieve first 5 ")
                return []
            }

        } else {
            return []
        }
    },
    getPoliticiansData: (data) => {
        let politicians;
        if (data) {
            // console.log(data[0])
            // var politicians = data[0]
            politicians = JSON.parse(JSON.stringify(data)).data

            return politicians
        }
    },

    getDonutData: (data) => {

        if (data) {
            // console.log(data[0])
            // var politicians = data[0]
            var pos = 0;
            var neu = 0;
            var neg = 0;
            data.map((politician) => {
                pos += politician.Sentiment_Pos;
                neu += politician.Sentiment_Neu;
                neg += politician.Sentiment_Neg;
            })

            return {pos: pos, neu: neu, neg: neg}
        } else {
            return {pos: 0, neu: 0, neg: 0}
        }
    },

    getPastDaysTotal: (dataForSevenDays) => {
        dataForSevenDays = JSON.parse(JSON.stringify(dataForSevenDays))
        // var pos = 0
        // var neu = 0
        // var neg = 0
        var resultList = []
        if (dataForSevenDays) {
            dataForSevenDays.map((dataADay)=>{
                var infoADay = {date:dataADay.date,pos:0,neu:0,neg:0}
                dataADay.data.dailyPolitician.map((aSentiment)=>{

                    infoADay.pos = infoADay.pos+aSentiment.Sentiment_Pos
                    infoADay.neu = infoADay.neu+aSentiment.Sentiment_Neu
                    infoADay.neg = infoADay.neg+aSentiment.Sentiment_Neg

                })
                resultList.push(infoADay)
            })
            console.log("7days,",resultList)
            return resultList
        } else {
            return []
        }
    }

};

var last = function last(array, n) {
    if (array == null) return void 0;
    if (n == null) return array[array.length - 1];
    return array.slice(Math.max(array.length - n, 0));
};

var first = function last(array, n) {
    if (array == null) return void 0;
    if (n == null) return array[array.length - 1];
    return array.slice(Math.max( 0,array.length - n));
};


