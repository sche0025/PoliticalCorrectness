import React, {Fragment} from 'react'
import './PoliticianCard.css'
import {Card, BackTop,Statistic,Spin} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import PoliticalModal from './PoliticianModal'
import store from '../../store/index'
import {Link} from "react-router-dom";

import connect from "react-redux/es/connect/connect";
import defaultImg from '../../assets/img/defaultImg.png'
import {getPoliticiansData} from "../../utils/api";


export default class PoliticianCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            politicians: [],
            input:'',
            party:"all",
            order:"popularity",
            isSpinning:true,
            date: store.getState().date,
            data:[]
        };
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange = () => {
        //
        // console.log(this.state.input == store.getState().politiciansFilter.input )
        // console.log(  this.state.party == store.getState().politiciansFilter.party )
        // console.log(    this.state.order == store.getState().politiciansFilter.order)
        // console.log(    this.state.order , store.getState().politiciansFilter.order)

        if(store.getState().date !=this.state.date){
            this.setState({
                date:store.getState().date
            },()=>{
                var me = this
                getPoliticiansData(this.state.date).then((data) => {
                    me.setState({
                        data: data,
                        isSpinning: false
                    })
                })
                console.log("politicians data loaded")
                console.log(this.state.data)

            })
        }

        // if(this.state.input == store.getState().politiciansFilter.input &&
        //     this.state.party == store.getState().politiciansFilter.party &&
        //     this.state.order == store.getState().politiciansFilter.order
        // ){
        //     console.log("no changes")
        //
        // }else{
        //     console.log("changes")
        //
        //     this.setState({
        //         input: store.getState().politiciansFilter.input,
        //         party: store.getState().politiciansFilter.party,
        //         order: store.getState().politiciansFilter.order
        //     })
        // }

    };

    calculateSentimentScore = (politician) => {
        var score =
            (politician.Sentiment_Pos*1) +
            (politician.Sentiment_Neu*0.2) -
            (politician.Sentiment_Neg*0.4)

        return parseInt(score,10)
    }

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
        console.log(this.state.data)
    }


    //get the link of the title
    getTitleLink = (politician )=>{
        return <PoliticalModal politician = {politician} />

    }


    //render all politicians
    getCards = () => {

        // var testList = [1, 2, 3, 4, 5]
        console.log(this.state.data)
        if(this.state.data == [] || !this.state.data){
            return []
        }
        console.log(this.state.data.length)
        return this.state.data.map(politician => (

            <Card
                title={this.getTitleLink(politician)}
                bordered={false}

                loading={false}
                className={'card'}

            >
                <Row>
                    <Col span={6}>
                        <img src={politician.Avatar} alt={"../../assets/img/defaultImg.png"}
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
                                    <Statistic title="Tweets posted" value={politician.Tweets_Count} />
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title="Replies Received" value={politician.Reply_Count} />
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row className={'heading'}>
                                    <Statistic title="Followers" value={politician.Followers_Count} />
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title="Sentiment Score" value={this.calculateSentimentScore(politician)} />
                                </Row>
                            </Col>
                        </Col>
                    </Col>

                </Row>
            </Card>
        ))

    }



    render() {

        console.log(store.getState().politiciansFilter)
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