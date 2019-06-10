import CanvasJSReact from '../../assets/charts/canvasjs.react'
import React from 'react';
import {getDonutData} from "../../utils/api";
import store from '../../store/index'
import {Spin} from "antd";



var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DonutChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSpinning: true,
            data: [],
            date: store.getState().date
        }
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange = () => {
        if (this.state.date != store.getState().date) {
            this.setState({
                    date: store.getState().date,
                    isSpinning: true
                },
                () => {
                    var me = this
                    getDonutData(store.getState().date).then((data) => {
                        me.setState({
                            data: data,
                            isSpinning: false
                        })
                    })
                })
        }
    };

    getCenterText = (pos, neu, neg) => {
        var largest = Math.max(pos, neu, neg)
        var text = ""

        if (pos + neg + neu == 0) {
            return "No Reply"
        }

        if (largest == pos) {
            return parseInt(100 * pos / (pos + neg + neu), 10) + "% Positive"
        } else if (largest == neu) {
            return parseInt(100 * neu / (pos + neg + neu), 10) + "% Neutral"
        } else {
            return parseInt(100 * neg / (pos + neg + neu), 10) + "% Negative"
        }
        return ""
    }

    componentDidMount() {
        var me = this
        getDonutData(store.getState().date).then((data) => {
            me.setState({
                data: data,
                isSpinning: false
            })
        })

    }


    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            height: this.props.height,
            title: {
                text: "Twitter users' sentiment distribution",
                fontSize: 22,
                fontFamily: "verdana"
            },
            subtitles: [{
                text: this.getCenterText(this.state.data.pos, this.state.data.neu, this.state.data.neg),
                verticalAlign: "center",
                fontSize: 24,
                dockInsidePlotArea: true
            }],
            data: [{
                type: "doughnut",
                indexLabelPlacement: "inside",
                showInLegend: false,
                indexLabel: "{name}: {y}",

                dataPoints: [
                    {name: "Unsatisfied", y: this.state.data.neg, color: "#b35752"},
                    {name: "Neutral", y: this.state.data.neu, color: "#5a81b7"},
                    {name: "Satisfied", y: this.state.data.pos, color: "#8da259"},

                ]
            }]
        }

        return (
            <div className={'donutChart'}>
                <Spin spinning={this.state.isSpinning}>
                    <CanvasJSChart options={options}/>
                </Spin>
            </div>
        );
    }
}