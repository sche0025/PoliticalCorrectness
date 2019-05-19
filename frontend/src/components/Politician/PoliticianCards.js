import React, {Fragment} from 'react'
import './PoliticianCard.css'
import {Card, BackTop, Statistic, Spin} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import PoliticalModal from './PoliticianModal'
import store from '../../store/index'
import {Link} from "react-router-dom";

import connect from "react-redux/es/connect/connect";
import defaultImg from '../../assets/img/defaultImg.png'
import {getPoliticiansData} from "../../utils/api";
import {calculateReplyCount, calculateSentimentScore} from "../../utils/utils";


export default class PoliticianCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            politicians: [],
            input: '',
            party: "",
            order: "popularity",
            isSpinning: true,
            date: store.getState().date,
            data: []
        };
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange = () => {
        //
        // console.log(this.state.input == store.getState().politiciansFilter.input )
        // console.log(  this.state.party == store.getState().politiciansFilter.party )
        // console.log(    this.state.order == store.getState().politiciansFilter.order)
        // console.log(    this.state.order , store.getState().politiciansFilter.order)

        if (store.getState().date != this.state.date) {
            this.setState({
                date: store.getState().date,
                isSpinning: true
            }, () => {
                var me = this
                getPoliticiansData(this.state.date).then((data) => {
                    me.setState({
                        data: data,
                        isSpinning: false,
                        input:store.getState().politiciansFilter.input,
                        party:store.getState().politiciansFilter.party
                    })
                })
                console.log("politicians data loaded")


            })
        }
        console.log("I should be later")

        this.setState({

        })


    };


    componentDidMount() {
        console.log(this.state.date)
        var me = this
        getPoliticiansData(this.state.date).then((data) => {
            me.setState({
                data: data,
                isSpinning: false
            })
        })
        console.log("politicians data loaded")

    }


    //get the link of the title
    getTitleLink = (politician) => {
        return <PoliticalModal politician={politician}/>
    }

    filterData = ()=>{
        if(this.state.data){
            var originData = this.state.data
            var input = store.getState().politiciansFilter.input
            var party = store.getState().politiciansFilter.party
            var order = store.getState().politiciansFilter.order

            var result = originData.filter(politician => politician.Name.toLowerCase().includes(input.toLowerCase()));
             result = result.filter(politician => politician.Party.toLowerCase().includes(party.toLowerCase()));


            var sortedResult =  this.customisedSort(result,order)
            // console.log(sortedResult)
            return sortedResult
        }else {
            return []
        }

    }

    customisedSort=(result,order)=>{

        switch (order) {
            case "popularity":
                result.sort(function (a, b) {
                    return (
                        (
                            calculateSentimentScore(b)
                        )
                        -
                        (
                            calculateSentimentScore(a)
                        )
                    )
                })
                return result

            case "posts":
                result.sort(function (a, b) {
                    return (
                        (
                            b.Tweets_Count
                        )
                        -
                        (
                            a.Tweets_Count
                        )
                    )
                })
                return result

            case "replies":

                result.sort(function (a, b) {
                    return (
                        (
                            b.Mentioned_Count
                        )
                        -
                        (
                            a.Mentioned_Count
                        )
                    )
                })
                return result

            case "likes":
                result.sort(function (a, b) {
                    return (
                        (
                            calculateReplyCount(b)
                        )
                        -
                        (
                            calculateReplyCount(a)
                        )
                    )
                })
                return result

            default:
                return result
        }
    }

    //render all politicians
    getCards = () => {
        if( this.state.isSpinning){
            return []
        }
        // var testList = [1, 2, 3, 4, 5]
        // console.log(this.state.data)
        if (this.state.data == [] || !this.state.data) {
            return []
        }
        // console.log(this.state.data.length)


        var filteredData =  this.filterData(  )

        return filteredData.map(politician => (

            <Card
                title={this.getTitleLink(politician)}
                bordered={false}
                key={politician.Name}
                loading={false}
                className={'card'}

            >
                <Row>
                    <Col span={6}>
                        <img src={politician.Avatar}
                             alt={"../../assets/img/defaultImg.png"}
                             // onerror={defaultImg}
                             className={'card-img'}
                        />
                    </Col>
                    <Col span={18}>
                        <Col span={12}>
                            <Row className={'heading'}>
                                <Col span={8} className={'heading-text'}> Tweeter</Col>
                                <Col span={16} className={'politician-text'}> {politician.Name}</Col>
                            </Row>
                            <Row className={'heading'}>
                                <Col span={8} className={'heading-text'}> For</Col>
                                <Col span={16} className={'politician-text'}> {politician.State}</Col>
                            </Row>
                            <Row className={'heading'}>
                                <Col span={8} className={'heading-text'}> Party</Col>
                                <Col span={16} className={'politician-text'}> {politician.Party}</Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Col span={12}>
                                <Row className={'heading'}>
                                    <Statistic title="Tweets posted" value={politician.Tweets_Count}/>
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title="Replies Received" value={calculateReplyCount(politician)}/>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row className={'heading'}>
                                    <Statistic title="Likes" value={politician.Likes_Count}/>
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title="Sentiment Score" value={calculateSentimentScore(politician)}/>
                                </Row>
                            </Col>
                        </Col>
                    </Col>

                </Row>
            </Card>
        ))

    }


    render() {

        console.log(store.getState())
        console.log(this.state.isSpinning)
        return (
            <div id={'cardList'}>
                <Spin spinning={this.state.isSpinning}>
                    {this.getCards()}

                    <BackTop target={() => document.getElementById('cardList')}/>
                </Spin>
            </div>
        )
    }

}

// const mapStateToProps = (state) => {
//
//     console.log(state)
//     return {
//         date:state.date
//     }
// };
//
// export default connect(mapStateToProps)(PoliticianCards)