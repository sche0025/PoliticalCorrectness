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
// import ReactJQCloud from 'react-jqcloud'
// import jQCloud from 'jqcloud2'
// import jQCloud from 'jqcloud2'
// import jQCloud from '../../assets/wordcloud/jqcloud'/**/
export default class PoliticianModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }

    }

    componentDidMount() {
        var words = [
            {text: "Lorem", weight: 13},
            {text: "Ipsum", weight: 10.5},
            {text: "Dolor", weight: 9.4},
            {text: "Sit", weight: 8},
            {text: "Amet", weight: 6.2},
            {text: "Consectetur", weight: 5},
            {text: "Adipiscing", weight: 5},
            /* ... */
        ];
        // jQCloud(words);

        // $(document).ready(function() {
        //     $("#demo").jQCloud(words);
        // });
    }

    handleOpen = () => {
        this.setState({
            visible: true
        })
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

        const data = [
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

        const fontSizeMapper = word => Math.log2(word.value) * 5;
        return (
            <Fragment>
                <Link onClick={this.handleOpen} className={'title'}>{this.props.politician.Name}</Link>
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
                                        src="https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png"
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
                                        <div className={'details-heading'}>What's his/her most frequently used words?
                                        </div>
                                        <div className={'word-cloud'}>




                                        </div>

                                        <div className={'details-heading'}>How do people from different constituencies
                                            think of him/her nationwide?
                                        </div>
                                        <div className={'detail-barChart'}>
                                            <BarChart height={450}/>
                                        </div>

                                        <div className={'details-heading'}>How do people think of him/her nationwide?
                                        </div>
                                        <div className={'detail-pieChart'}>
                                            < DonutChart height={450}/>
                                        </div>

                                        <div className={'details-heading'}>What are the sentiment scores of his posts in
                                            the past 7 days?
                                        </div>
                                        <div className={'word-cloud'}>
                                            <DoubleLineChart height={450}
                                                             title={"How did internet users think of him/her in the past 7 days?"}
                                            />
                                        </div>

                                        <div className={'details-heading'}>How did internet users think of him/her in
                                            the past 7 days?
                                        </div>
                                        <div className={'word-cloud'}>
                                            <DoubleLineChart height={450}
                                                             title={"How did internet users think of him/her in the past 7 days?"}
                                            />
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

