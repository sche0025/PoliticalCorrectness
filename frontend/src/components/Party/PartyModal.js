import React, {Fragment} from 'react'
import './PartyModal.css'
import {Card, Input, Select, Radio, Button, Modal, Statistic} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {Link} from "react-router-dom";
import PartyLeaderCard from './PartyLeaderCard'
import BarChart from '../Charts/StackedBarChart'
import DonutChart from '../Charts/DonutChart'
import DoubleLineChart from '../Charts/DoubleLineChart'
import ReactWordcloud from 'react-wordcloud'
import {calculateReplyCount, calculateSentimentScore, getPartyFlag, getPastDayList} from "../../utils/utils";
import {getPartyLinechartsInfo, getPoliticianLinechartReceive, getTopLeadersInParty} from "../../utils/api";
import store from "../../store";
// import testdata from './word_cloud_one_day'

export default class PartyModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            topLeaders:[],
            repliesReceived:[],
            repliesPost:[]
        }

    }

    componentDidMount() {


    }

    handleOpen = () => {

        this.setState({
            visible: true
        })


        var me = this
        getTopLeadersInParty(this.props.party.Party,store.getState().date).then((data) => {
            me.setState({
                topLeaders: data.reverse(),
                // isSpinning: false
            })
        })

        getPartyLinechartsInfo(getPastDayList(store.getState().date),this.props.party.Party).then((data) => {
            console.log(data)
            me.setState({
                repliesReceived: data.receive,
                tweetsPosted: data.post,
            })
        })

    }

    handleCancel = () => {
        this.setState({
            visible: false,
            data: []
        })
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    getTopLeaders = ()=>{


        if(!this.state.topLeaders){
            return <Row></Row>
        }

        return <Row>
        {
            this.state.topLeaders.map((politician,key)=>{

                return   <Col className="party-avatar-card" span={8}>
                    <PartyLeaderCard name={politician.Name}
                        img = {politician.Avatar}
                                     sc = {calculateSentimentScore({
                                         Sentiment_Pos:politician.Sentiment_Pos,
                                         Sentiment_Neu:politician.Sentiment_Neu,
                                         Sentiment_Neg:politician.Sentiment_Neg,

                                     })}
                                     myKey = {key}
                    />
                </Col>
            })
        }
        </Row>
    }

    render() {

        var options = {
            colors: [
                '#1f77b4',
                '#ff7f0e',
                '#2ca02c',
                '#d62728',
                '#9467bd',
                '#8c564b',
            ],
            enableTooltip: true,
            fontFamily: 'impact',
            fontSizes: [20, 80],
            fontStyle: 'normal',
            fontWeight: 'normal',
            padding: 1,
            rotations: 3,
            rotationAngles: [0, 90],
            scale: 'sqrt',
            spiral: 'archimedean',
            transitionDuration: 1000,
        }

        const data = []



        console.log(this.state.topLeaders)

        return (
            <Fragment>
                <Link onClick={this.handleOpen} className={'title'}>{this.props.party.Party}</Link>
                {this.state.visible ?
                    <Modal
                        title={this.props.name}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={null}
                        className={'modal'}
                        centered={true}
                        width={'85%'}
                    >

                        <div className={'contain'}>
                            <Row>
                                <Col span={6}>
                                    <div className={'profile'}>
                                        <img src={getPartyFlag(this.props.party.Party)}
                                             className={'profileImg'}
                                        />
                                        <div className={'statistics'}>
                                            <Col span={12}>
                                                <Row className={'heading'}>
                                                    <Statistic title="Total Posts"
                                                               value={this.props.party.Tweets_Count}/>
                                                </Row>
                                                <Row className={'heading2'}>
                                                    <Statistic title="Mentions"
                                                               value={calculateReplyCount(this.props.party)}/>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row className={'heading'}>
                                                    <Statistic title="Likes" value={this.props.party.Likes_Count}/>
                                                </Row>
                                                <Row className={'heading2'}>
                                                    <Statistic title="Sentiment Score"
                                                               value={calculateSentimentScore(this.props.party)}/>
                                                </Row>
                                            </Col>
                                        </div>
                                    </div>

                                </Col>
                                <Col span={18}>
                                    <div className={'details'}>
                                        <Row>
                                            <div className={'details-heading'}>Who are the most popular leaders in this
                                                party?
                                                <div className={'party-leaders'}>
                                                    {this.getTopLeaders()}

                                                </div>

                                            </div>


                                            <div className={'details-heading'}>What are the party members' most
                                                frequently used words?
                                            </div>
                                            <div className={'word-cloud'}>
                                                {this.state.visible ?
                                                    <ReactWordcloud
                                                        words={this.props.party.Word_Cloud}
                                                        options={options}

                                                    /> : <div></div>
                                                }
                                            </div>

                                            <div className={'details-heading'}>How do people from different
                                                state
                                                think of this party?
                                            </div>
                                            <div className={'detail-barChart'}>
                                                <BarChart height={450}
                                                          posList ={this.props.party.State_Pos[0]}
                                                          negList ={this.props.party.State_Neg[0]}
                                                          neuList ={this.props.party.State_Neu[0]}
                                                />
                                            </div>

                                            <div className={'details-heading'}>How do people think of the party
                                                overall?
                                            </div>
                                            <div className={'detail-pieChart'}>
                                                < DonutChart height={450}
                                                             pos={this.props.party.Sentiment_Pos}
                                                             neg={this.props.party.Sentiment_Neg}
                                                             neu={this.props.party.Sentiment_Neu}

                                                />
                                            </div>

                                            {/*<div className={'details-heading'}>Do people tweet about these things that*/}
                                            {/*politicians*/}
                                            {/*tweet too?*/}
                                            {/*</div>*/}
                                            {/*<div className={'word-cloud'}>*/}
                                            {/*<WordCloud*/}
                                            {/*data={data}*/}
                                            {/*fontSizeMapper={fontSizeMapper}*/}
                                            {/*height={350}*/}
                                            {/*/>*/}
                                            {/*</div>*/}

                                            <div className={'details-heading'}>How did people think of the party in the past 7 days?
                                            </div>
                                            <div className={'word-cloud'}>
                                                <DoubleLineChart height={450}
                                                                 data={this.state.repliesReceived}
                                                                 yTitle={"Number of netizens"}
                                                />
                                            </div>

                                            <div className={'details-heading'}>

                                                What were the sentiment scores of this party members' posts in the past 7 days?
                                            </div>
                                            <div className={'word-cloud'}>
                                                <DoubleLineChart height={450}
                                                                 yTitle={"Number of tweets"}
                                                                 data={this.state.tweetsPosted}
                                                />
                                            </div>

                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Modal>:<div></div>

                }
            </Fragment>
        )
    }

}
