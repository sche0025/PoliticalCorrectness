import React, {Fragment} from 'react'
import './PartyCard.css'
import {Card, BackTop, Statistic, Spin, Icon, Tooltip} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import PartyModal from './PartyModal'
import store from '../../store/index'

import {Link} from "react-router-dom";
import {getPartyData} from "../../utils/api";
import defaultImg from "../../assets/img/defaultImg.png";
import {calculateReplyCount, calculateSentimentScore, getPartyFlag} from "../../utils/utils";


export default class PartyCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            parties: [],
            input: '',

            order: "popularity",
            isSpinning: true,
            date: store.getState().date,
            data: []
        };
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange = () => {
        //
        // console.log(this.state.input == store.getState().partysFilter.input )
        // console.log(  this.state.party == store.getState().partysFilter.party )
        // console.log(    this.state.order == store.getState().partysFilter.order)
        // console.log(    this.state.order , store.getState().partysFilter.order)

        if (store.getState().date != this.state.date) {
            this.setState({
                date: store.getState().date,
                isSpinning: true
            }, () => {
                var me = this
                getPartyData(this.state.date).then((data) => {
                    me.setState({
                        data: data,
                        isSpinning: false,
                        input: store.getState().partyFilter.input,
                        order: store.getState().partyFilter.order
                    })
                })
                console.log("parties data loaded")


            })
        }
        console.log("I should be later")

        this.setState({})


    };

    componentDidMount() {
        console.log(this.state.date)
        var me = this
        getPartyData(this.state.date).then((data) => {
            me.setState({
                data: data,
                isSpinning: false
            })
        })
        console.log("parties data loaded")
    }


    getTitleLink = (party) => {
        return <PartyModal
            party={party}
        />
    }

    customisedSort = (result, order) => {

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
                            b.Likes_Count
                        )
                        -
                        (
                            a.Likes_Count
                        )
                    )
                })
                return result

            default:
                return result
        }
    }

    filterData = () => {
        if (this.state.data) {
            var originData = this.state.data
            var input = store.getState().partyFilter.input

            var order = store.getState().partyFilter.order

            var result = originData.filter(party => party.Party.toLowerCase().includes(input.toLowerCase()));


            var sortedResult = this.customisedSort(result, order)
            // console.log(sortedResult)
            return sortedResult
        } else {
            return []
        }

    }

    getCards = () => {
        if (this.state.isSpinning) {
            return []
        }
        // var testList = [1, 2, 3, 4, 5]
        // console.log(this.state.data)
        if (this.state.data == [] || !this.state.data) {
            return []
        }
        // console.log(this.state.data.length)


        var filteredData = this.filterData()
        // var filteredData =  this.state.data

        return filteredData.map((party, key) => (

            <Card
                title={this.getTitleLink(party)}
                bordered={false}
                key={key}
                loading={false}
                className={'card'}

            >
                <Row>
                    <Col span={6}>
                        <img src={getPartyFlag(party.Party)}
                             alt={defaultImg}
                            // onerror={defaultImg}
                             className={'card-img'}
                        />
                    </Col>
                    <Col span={18}>
                        <Col span={12}>
                            {/*<Row className={'heading'}>*/}
                            {/*<Col span={8} className={'heading-text'}> Tweeter</Col>*/}
                            {/*<Col span={16} className={'party-text'}> {party.Name}</Col>*/}
                            {/*</Row>*/}
                            {/*<Row className={'heading'}>*/}
                            {/*<Col span={8} className={'heading-text'}> For</Col>*/}
                            {/*<Col span={16} className={'party-text'}> {party.State}</Col>*/}
                            {/*</Row>*/}
                            <Row className={'heading'}>
                                <Col span={8} className={'heading-text'}> Party</Col>
                                <Col span={16} className={'party-text'}> {party.Party}</Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Col span={12}>
                                <Row className={'heading'}>
                                    <Statistic title="Total Posts" value={party.Tweets_Count}/>
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title={<div>Mentions
                                        <Tooltip title={"The number of tweets which mentioned this politician."}>
                                            <Icon style={{paddingLeft: "3px"}} type="question-circle"/>
                                        </Tooltip>
                                    </div>}

                                               value={calculateReplyCount(party)}/>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row className={'heading'}>
                                    <Statistic title="Likes" value={party.Likes_Count}/>
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title={<div>Sentiment Score
                                        <Tooltip title={"This is calculated by: Number of unique supporters * 1 " +
                                        "+ Number of unique neutrals * 0.1 " +
                                        "- Number of unique dissenters * 0.5"}>
                                            <Icon style={{paddingLeft: "3px"}} type="question-circle"/>
                                        </Tooltip>
                                    </div>} value={calculateSentimentScore(party)}/>
                                </Row>
                            </Col>
                        </Col>
                    </Col>

                </Row>
            </Card>
        ))

    }


    render() {

        console.log(this.state.data)
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
