import AC from '../assets/img/partyFlags/AC.jpg'
import AJP from '../assets/img/partyFlags/AJP.png'
import AG from '../assets/img/partyFlags/AG.png'
import ALP from '../assets/img/partyFlags/ALP.png'
import AP from '../assets/img/partyFlags/AP.png'
import CA from '../assets/img/partyFlags/ca.png'
import FLUX from '../assets/img/partyFlags/FLUX.jpg'
import IA from '../assets/img/partyFlags/IA.png'
import KAP from '../assets/img/partyFlags/kap.png'
import LNP from '../assets/img/partyFlags/LNP.jpg'
import NPA from '../assets/img/partyFlags/NPA.jpg'
import LPA from '../assets/img/partyFlags/LPA.png'
import PHON from '../assets/img/partyFlags/PHON.png'
import SA from '../assets/img/partyFlags/SA.png'
import UAP from '../assets/img/partyFlags/UAP.png'
import VS from '../assets/img/partyFlags/VS.png'
import WAP from '../assets/img/partyFlags/WAP.png'
import ASP from '../assets/img/partyFlags/ASP.png'
import moment from 'moment'
import config from '../config'


export function calculateSentimentScore(politician) {
  var score =
      (politician.Sentiment_Pos*1) +
      (politician.Sentiment_Neu*0.1) -
      (politician.Sentiment_Neg*0.5)

  return parseInt(score,10)
}

export function calculateReplyCount(politician) {
  var score =
      (politician.Sentiment_Pos) +
      (politician.Sentiment_Neu) +
      (politician.Sentiment_Neg)

  return parseInt(score,10)
}

export function getPartyFlag(partyName) {

  switch (partyName.trim().toLowerCase()) {
    case "centre alliance":
      return CA
    case 'animal justice party':
      return AJP
    case 'australian christians':
      return AC
    case 'australian greens':
      return AG
    case 'australian labor party':
      return ALP
    case 'australian progressives':
      return AP
    case 'flux':
      return FLUX
    case 'independent':
      return IA
    case "katter's australian party":
      return KAP
    case "liberal national party":
      return LNP
    case "liberal party of australia":
      return LPA
    case "national party of australia":
      return NPA
    case "pauline hanson's one nation":
      return PHON
    case "science party":
      return ASP
    case "sustainable australia":
      return SA
    case "united australia party":
      return UAP
    case "victorian socialists":
      return VS
    case "western australia party":
      return WAP

    default:
      return ""
  }
}

export function getPastDayList(date) {

  var endDate = moment(date)
  var dateList = []
  for (var i =0;i<7;i++){
    if(i==0){
      dateList.push(endDate.subtract(0,'days').format(config.dateFormat))
    }else {
      dateList.push(endDate.subtract(1,'days').format(config.dateFormat))
    }

    if(endDate.format(config.dateFormat)==moment(config.dataStartingDate).format(config.dateFormat)){
      break;
    }
  }
  return dateList
}

export function preloadingImages(arr) {
  arr.forEach(item=>{
    const img = new Image()
    img.src = item
  })
}