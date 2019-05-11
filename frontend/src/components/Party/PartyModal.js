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
// import testdata from './word_cloud_one_day'

export default class PartyModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            data: [],
            originData: []
        }

    }

    componentDidMount() {
        const originData = [
            {text: 'Hey', value: 1000},
            {text: 'lol', value: 200},
            {text: 'first impression', value: 800},
            {text: 'very cool', value: 10000},
            {text: 'duck', value: 10},
            {text: 'Hey2', value: 1000},
            {text: 'lo3l', value: 200},
            {text: 'fi1rst impression', value: 800},
            {text: 'ver3y cool', value: 10000},
            {text: 'du4ck', value: 10},
            {text: 'Heye', value: 1000},
            {text: 'loql', value: 200},
            {text: 'firdst impression', value: 800},
            {text: 'very cfool', value: 10000},
            {text: 'ducsk', value: 101},
            {text: 'He21y', value: 1000},
            {text: 'l312ol', value: 200},
            {text: 'firewrst impression', value: 800},
            {text: 'veqerry cool', value: 10000},
            {text: 'duwqreck', value: 10},
            {text: 'Hedsfy2', value: 1000},
            {text: 'loafg3l', value: 200},
            {text: 'fi1rfagst impression', value: 800},
            {text: 'verdsaf3y cool', value: 10000},
            {text: 'du4adsfck', value: 10},
            {text: 'Heyfgde', value: 1000},
            {text: 'loqgfdl', value: 200},
            {text: 'firdafdst impression', value: 800},
            {text: 'very sdafcfool', value: 10000},
            {text: 'ducdsfsk', value: 101},
        ];

        this.setState({
            originData: originData
        })
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

        var data = []
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



            data = [{'text': 'can’t', 'value': 1403},
                {'text': 'wait', 'value': 1657},
                {'text': 'turf', 'value': 3116},
                {'text': 'morrison', 'value': 3521},
                {'text': 'out,', 'value': 1825},
                {'text': 'listen', 'value': 1012},
                {'text': 'shorten', 'value': 2402},
                {'text': '*actually*', 'value': 2222},
                {'text': 'saying', 'value': 2858},
                {'text': '‘climate', 'value': 2225},
                {'text': 'election’,', 'value': 2222},
                {'text': 'we’d', 'value': 2264},
                {'text': '*like*', 'value': 2122},
                {'text': 'say:', 'value': 2235},
                {'text': '🔥public', 'value': 2221},
                {'text': '$', 'value': 2316},
                {'text': 'new', 'value': 2618},
                {'text': 'gas', 'value': 2480},
                {'text': '🔥coal', 'value': 2221},
                {'text': '‘foreseeable', 'value': 2221},
                {'text': 'future’', 'value': 2224},
                {'text': '🔥won’t', 'value': 2221},
                {'text': 'vote', 'value': 2777},
                {'text': 'change', 'value': 2946},
                {'text': 'gov,', 'value': 2229},
                {'text': 'climate.', 'value': 2234},
                {'text': 'waiast', 'value': 1657},
                {'text': 'tufrf', 'value': 3116},
                {'text': 'moadfrrison', 'value': 3521},
                {'text': 'ouafdst,', 'value': 1825},
                {'text': 'liafsdsten', 'value': 1012},
                {'text': 'shosdafrten', 'value': 2402},
                {'text': '*asadfctually*', 'value': 2222},
                {'text': 'sayidsfng', 'value': 2858},
                {'text': '‘clifgdmate', 'value': 2225},
                {'text': 'elfgfection’,', 'value': 2222},
                {'text': 'wefda’d', 'value': 2264},
                {'text': '*liadfke*', 'value': 2122},
                {'text': 'sayasf:', 'value': 2235},
                {'text': '🔥pufdablic', 'value': 2221},
                {'text': 'fdaf$', 'value': 2316},
                {'text': 'nefdsafw', 'value': 2618},
                {'text': 'gadafdas', 'value': 2480},
                {'text': '🔥cofdfal', 'value': 2221},
                {'text': '‘foresffeeable', 'value': 2221},
                {'text': 'futurdafe’', 'value': 2224},
                {'text': '🔥wofdsafn’t', 'value': 2221},
                {'text': 'votfdaf', 'value': 2777},
                {'text': 'chandsfge', 'value': 2946},
                {'text': 'gofdsfdv,', 'value': 2229},
                {'text': 'clifdfdmate.', 'value': 2234}
            ]



        // console.log(data.length)
        const fontSizeMapper = word => Math.log2(word.value) * 5;
        return (
            <Fragment>
                <Link onClick={this.handleOpen} className={'title'}>{this.props.name}</Link>
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
                                    <img src={this.props.flag}
                                         className={'profileImg'}
                                    />
                                    <div className={'statistics'}>
                                        <Col span={12}>
                                            <Row className={'heading'}>
                                                <Statistic title="Tweets posted" value={112893}/>
                                            </Row>
                                            <Row className={'heading2'}>
                                                <Statistic title="Replies Received" value={112893}/>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row className={'heading'}>
                                                <Statistic title="Followers" value={112893}/>
                                            </Row>
                                            <Row className={'heading2'}>
                                                <Statistic title="Mean Sentiment Score" value={93} suffix="/ 100"/>
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
                                                    words={data}
                                                    options={options}
                                                    fontSizeMapper={fontSizeMapper}
                                                /> : <div></div>
                                            }
                                        </div>

                                        <div className={'details-heading'}>How do people from different constituencies
                                            think of the party?
                                        </div>
                                        <div className={'detail-barChart'}>
                                            <BarChart height={450}/>
                                        </div>

                                        <div className={'details-heading'}>How do people think of the party
                                            nationwide
                                        </div>
                                        <div className={'detail-pieChart'}>
                                            < DonutChart height={450}/>
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
