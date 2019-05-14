function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  m += s1.split(".").length > 1 ? s1.split(".")[1].length : 0;
  m += s2.split(".").length > 1 ? s2.split(".")[1].length : 0;
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / 10 ** m;
}

export function calculateSentimentScore(politician) {
  var score =
      (politician.Sentiment_Pos*1) +
      (politician.Sentiment_Neu*0.2) -
      (politician.Sentiment_Neg*0.5)

  return parseInt(score,10)
}

export function calculatePartySentimentScore(politician) {
  var score =
      (politician.Sentiment_Pos*1) +
      (politician.Sentiment_Neu*0.2) -
      (politician.Sentiment_Neg*0.5)

  return parseInt(score,10)
}

export function customisedSort(lists,criterion) {
  lists.sort(function (a, b) {
    return (
        (
         a[criterion]
        )
        -
        (
          b[criterion]
        )
    )
  })

  return lists
}



export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


export function calculateWidth(arr){
  return 30 + arr[0].length*15
}


export function preloadingImages(arr) {
  arr.forEach(item=>{
    const img = new Image()
    img.src = item
  })
}