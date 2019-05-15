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
import {calculateSentimentScore, getPartyFlag} from "../../utils/utils";
// import testdata from './word_cloud_one_day'

export default class PartyModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,

        }

    }

    componentDidMount() {


    }

    handleOpen = () => {


        this.setState({
            visible: true
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
            fontSizes: [5, 60],
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



        // console.log(data.length)

        return (
            <Fragment>
                <Link onClick={this.handleOpen} className={'title'}>{this.props.party.Party}</Link>
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
                                                <Statistic title="Tweets posted" value={this.props.party.Tweets_Count}/>
                                            </Row>
                                            <Row className={'heading2'}>
                                                <Statistic title="Replies Received" value={this.props.party.Reply_Count}/>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row className={'heading'}>
                                                <Statistic title="Followers" value={this.props.party.Followers_Count}/>
                                            </Row>
                                            <Row className={'heading2'}>
                                                <Statistic title="Sentiment Score" value={calculateSentimentScore(this.props.party)} />
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

                                                <Row>
                                                    <Col className="party-avatar-card" span={4}>
                                                        <PartyLeaderCard/>
                                                    </Col>
                                                    <Col className="gutter-row" span={1}/>

                                                    <Col className="party-avatar-card" span={4}>
                                                        <PartyLeaderCard/>
                                                    </Col>

                                                    <Col className="gutter-row" span={1}/>

                                                    <Col className="party-avatar-card" span={4}>
                                                        <PartyLeaderCard/>
                                                    </Col>
                                                    <Col className="gutter-row" span={1}/>

                                                    <Col className="party-avatar-card" span={4}>
                                                        <PartyLeaderCard/>
                                                    </Col>

                                                    <Col className="gutter-row" span={1}/>

                                                    <Col className="party-avatar-card" span={4}>
                                                        <PartyLeaderCard/>
                                                    </Col>
                                                </Row>
                                            </div>

                                        </div>


                                        <div className={'details-heading'}>What are the party members' most frequently used words?
                                        </div>
                                        <div className={'word-cloud'}>
                                            {this.state.visible ?
                                                <ReactWordcloud
                                                    words={this.props.party.Word_Cloud}
                                                    options={options}

                                                /> : <div></div>
                                            }
                                        </div>

                                        <div className={'details-heading'}>How do people from different constituencies
                                            think of the party?
                                        </div>
                                        <div className={'detail-barChart'}>
                                            <BarChart height={450}

                                            />
                                        </div>

                                        <div className={'details-heading'}>How do people think of the party
                                            nationwide
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

                                        <div className={'word-cloud'}>
                                            <div className={'details-heading'}>What are the sentiment scores of posts that came
                                                from the party members in the past 7 days?
                                            </div>
                                            <div className={'word-cloud'}>
                                                <DoubleLineChart height={450}/>
                                            </div>
                                        </div>

                                        <div className={'word-cloud'}>
                                            <div className={'details-heading'}>How did internet users think of the party
                                                in the past 7 days?
                                            </div>
                                            <div className={'word-cloud'}>
                                                <DoubleLineChart height={450}/>
                                            </div>
                                        </div>

                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </Fragment>
        )
    }

}
