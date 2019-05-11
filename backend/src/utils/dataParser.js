module.exports = {
    getLeaderboardData: (data) => {
        if (data[0]) {
            // console.log(data[0])
            // var politicians = data[0]
            let politicians = JSON.parse(JSON.stringify(data[0])).data
            // console.log(politicians)
            politicians.sort(function (a, b) {
                return (
                    (
                        1 * (a.Sentiment_Pos) +
                        0.2 * (a.Sentiment_Neu) -
                        0.4 * (a.Sentiment_Neg)
                    )
                    -
                    (
                        1 * (b.Sentiment_Pos) +
                        0.2 * (b.Sentiment_Neu) -
                        0.4 * (b.Sentiment_Neg)
                    )
                )
            })

            return last(politicians, 5).reverse()
        }
    },

    getPoliticiansData: (data) => {
        let politicians;
        if (data[0]) {
            // console.log(data[0])
            // var politicians = data[0]
            politicians = JSON.parse(JSON.stringify(data[0])).data

            return politicians
        }
    }

};

var last = function last(array, n) {
    if (array == null) return void 0;
    if (n == null) return array[array.length - 1];
    return array.slice(Math.max(array.length - n, 0));
};

