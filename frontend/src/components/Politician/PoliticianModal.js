import React, {Fragment} from 'react'
import './PoliticianModal.css'
import {Card, Input, Select, Radio, Button, Modal, Statistic} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {Link} from "react-router-dom";

import BarChart from '../Charts/StackedBarChart'
import DonutChart from '../Charts/DonutChart'
import DoubleLineChart from '../Charts/DoubleLineChart'
import ReactWordcloud from 'react-wordcloud'
import $ from 'jquery'
import {calculateReplyCount, calculateSentimentScore, getPastDayList} from "../../utils/utils";
import { getPoliticianLinechartReceive, getPoliticianLinechartsInfo} from "../../utils/api";
import store from '../../store/index'
// import ReactJQCloud from 'react-jqcloud'
// import jQCloud from 'jqcloud2'
// import jQCloud from 'jqcloud2'
// import jQCloud from '../../assets/wordcloud/jqcloud'/**/
export default class PoliticianModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            repliesReceived:[],
            repliesPost:[]
        }

    }

    componentDidMount() {

    }

    handleOpen = () => {
        // this.setState({
        //
        // })

        var me = this
        // getPoliticianLinechartReceive(getPastDayList(store.getState().date),this.props.politician.ID).then((data) => {
        //     me.setState({
        //         repliesReceived: data,
        //
        //     })
        // })

        // getPoliticianLinechartPost(getPastDayList(store.getState().date),this.props.politician.ID).then((data) => {
        //     me.setState({
        //         repliesPost: data,
        //
        //     })
        // })

        getPoliticianLinechartsInfo(getPastDayList(store.getState().date),this.props.politician.ID).then((data) => {
            me.setState({
                repliesReceived: data.receive,
                tweetsPosted: data.post,
                visible: true
            })
        })

        // var promise1 =  getPoliticianLinechartReceive(getPastDayList(store.getState().date),this.props.politician.ID)
        // var promise2 =  getPoliticianLinechartPost(getPastDayList(store.getState().date),this.props.politician.ID)
        //
        // Promise.all([promise1, promise2]).then(function(values) {
        //     console.log("promise test",values);
        // });

    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    render() {
        // console.log(this.state.data)
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
            fontSizes: [20, 70],
            fontStyle: 'normal',
            fontWeight: 'normal',
            padding: 1,
            rotations: 0,
            rotationAngles: [0, 90],
            scale: 'sqrt',
            spiral: 'archimedean',
            transitionDuration: 1000,
        }

        const data = [

        ];

        const fontSizeMapper = word => Math.log2(word.value) * 5;
        return (
            <Fragment>

                <Link onClick={this.handleOpen} className={'title'} to={"#"}>{this.props.politician.Name} </Link>
                {this.state.visible?
                    <Modal
                        title={this.props.politician.Name}
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
                                        <img
                                            src={this.props.politician.Avatar}
                                            className={'profileImg'}
                                        />


                                        <div className={'statistics'}>
                                            <Col span={12}>
                                                <Row className={'heading'}>
                                                    <Statistic title="Total Posts"
                                                               value={this.props.politician.Tweets_Count}/>
                                                </Row>
                                                <Row className={'heading2'}>
                                                    <Statistic title="Mentions"
                                                               value={calculateReplyCount(this.props.politician)}/>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row className={'heading'}>
                                                    <Statistic title="Likes"
                                                               value={this.props.politician.Likes_Count}/>
                                                </Row>
                                                <Row className={'heading2'}>
                                                    <Statistic title="Sentiment Score"
                                                               value={calculateSentimentScore(this.props.politician)}/>
                                                </Row>
                                            </Col>

                                        </div>
                                    </div>

                                </Col>
                                <Col span={18}>
                                    <div className={'details'}>

                                        <Row>
                                            <div className={'details-heading'}>What's his/her most frequently used
                                                words?
                                            </div>
                                            <div className={'word-cloud'}>
                                                <div className={'word-cloud'}>
                                                    {this.state.visible ?
                                                        <ReactWordcloud
                                                            words={this.props.politician.Word_Cloud}
                                                            options={options}
                                                            // fontSizeMapper={fontSizeMapper}
                                                        /> : <div></div>
                                                    }
                                                </div>


                                            </div>

                                            <div className={'details-heading'}>How do people from different
                                                states
                                                think of him/her?
                                            </div>
                                            <div className={'detail-barChart'}>
                                                <BarChart height={450}
                                                    posList ={this.props.politician.State_Pos[0]}
                                                    negList ={this.props.politician.State_Neg[0]}
                                                    neuList ={this.props.politician.State_Neu[0]}

                                                />
                                            </div>

                                            <div className={'details-heading'}>How do people think of him/her
                                                overall?
                                            </div>
                                            <div className={'detail-pieChart'}>
                                                < DonutChart height={450} pos={this.props.politician.Sentiment_Pos}
                                                             neg={this.props.politician.Sentiment_Neg}
                                                             neu={this.props.politician.Sentiment_Neu}/>
                                            </div>

                                            <div className={'details-heading'}>How did people think of him/her
                                                in the past 7 days?
                                            </div>
                                            <div className={'word-cloud'}>
                                                <DoubleLineChart height={450}
                                                                 data={this.state.repliesReceived}
                                                                 yTitle = "Number of netizens"

                                                                 // title={"How did internet users think of him/her in the past 7 days?"}
                                                />
                                            </div>

                                            <div className={'details-heading'}>

                                                What were the sentiment scores of his posts in the past 7 days?
                                            </div>
                                            <div className={'word-cloud'}>
                                                <DoubleLineChart height={450}
                                                                 // title={"What are the sentiment scores of his posts in the past 7 days?"}
                                                                 yTitle={"Number of Tweets"}
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

