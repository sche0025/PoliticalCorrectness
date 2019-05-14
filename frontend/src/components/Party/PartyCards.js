import React, {Fragment} from 'react'
import './PartyCard.css'
import {Card, BackTop, Statistic, Spin} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import PartyModal from './PartyModal'
import store from '../../store/index'
import greenFlag from '../../assets/img/partyFlags/green.png'
import caFlag from '../../assets/img/partyFlags/ca.png'
import kapFlag from '../../assets/img/partyFlags/kap.png'
import laborFlag from '../../assets/img/partyFlags/labor.png'
import liberalFlag from '../../assets/img/partyFlags/liberal.png'
import natinalsFlag from '../../assets/img/partyFlags/nationals.jpg'
import {Link} from "react-router-dom";
import {getPartyData, getpartysData} from "../../utils/api";
import defaultImg from "../../assets/img/defaultImg.png";
import {calculateSentimentScore} from "../../utils/utils";


export default class PartyCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            partys: [],
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
                        input:store.getState().partyFilter.input,
                        order:store.getState().partyFilter.order
                    })
                })
                console.log("parties data loaded")


            })
        }
        console.log("I should be later")

        this.setState({

        })


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


        // var filteredData =  this.filterData(  )
        var filteredData =  this.state.data

        return filteredData.map(party => (

            <Card
                title={this.getTitleLink(party)}
                bordered={false}

                loading={false}
                className={'card'}

            >
                <Row>
                    <Col span={6}>
                        <img src={party.Avatar}
                        
                             onerror={defaultImg}
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
                                    <Statistic title="Tweets posted" value={party.Tweets_Count}/>
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title="Replies Received" value={party.Reply_Count}/>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row className={'heading'}>
                                    <Statistic title="Followers" value={party.Followers_Count}/>
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title="Sentiment Score" value={calculateSentimentScore(party)}/>
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
