import React, {Fragment} from 'react'
import './PoliticianCard.css'
import {Card, BackTop, Statistic, Spin,Icon,Tooltip} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import PoliticalModal from './PoliticianModal'
import store from '../../store/index'

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



            })
        }


        this.setState({

        })


    };


    componentDidMount() {

        var me = this
        getPoliticiansData(this.state.date).then((data) => {
            me.setState({
                data: data,
                isSpinning: false
            })
        })

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

    //render all politicians
    getCards = () => {
        if( this.state.isSpinning){
            return []
        }

        if (this.state.data == [] || !this.state.data) {
            return []
        }



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

                             onerror="this.src='https://d2ogjlfjkptkow.cloudfront.net/assets/img/board-member-default-image.png'"
                             className={'card-img'}
                        />
                    </Col>
                    <Col span={18}>
                        <Col span={12}>
                            <Row className={'heading'}>
                                <Col span={8} className={'heading-text'}> Name</Col>
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
                                    <Statistic title={ <div className={"statistics-title"}> Total Posts </div>} value={politician.Tweets_Count}/>
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title={<div className={"statistics-title"} >Mentions
                                        <Tooltip title={"The number of netizens who mentioned this politician."}>
                                            <Icon style={{paddingLeft:"3px"}} type="question-circle"/>
                                        </Tooltip>
                                    </div>}
                                    value={calculateReplyCount(politician)}/>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row className={'heading'}>
                                    <Statistic

                                        value={politician.Likes_Count}
                                        title="Likes"
                                    />
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title={<div className={"statistics-title"}>Sentiment Score
                                        <Tooltip title={"This is calculated by: Number of unique supporters * 1 " +
                                        "+ Number of unique neutrals * 0.1 " +
                                        "- Number of unique dissenters * 0.5"}>
                                            <Icon style={{paddingLeft:"3px"}} type="question-circle"/>
                                        </Tooltip>
                                    </div>} value={calculateSentimentScore(politician)}/>
                                </Row>
                            </Col>
                        </Col>
                    </Col>

                </Row>
            </Card>
        ))

    }

    render() {
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

