import CanvasJSReact from '../../assets/charts/canvasjs.react'
import $ from 'jquery'
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {getDonutData} from "../../utils/api";
import store from '../../store/index'
import {Spin} from "antd";


// var CanvasJS = CanvasJSReact.CanvasJS;
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
        console.log(pos / (pos + neg + neu))
        console.log(largest, pos, neu, neu)
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
        console.log("donut data loaded")
    }


    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            height: this.props.height,
            title: {
                text: "Sentiment of Replies"
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
                // yValueFormatString: "#,###'%'",
                dataPoints: [
                    {name: "Unsatisfied", y: this.state.data.neg},
                    {name: "Neutral", y: this.state.data.neu},
                    {name: "Satisfied", y: this.state.data.pos},

                ]
            }]
        }

        console.log('dashboard donut loaded',this.state.data)

        return (
            <div className={'donutChart'}>
                <Spin spinning={this.state.isSpinning}>
                    <CanvasJSChart options={options}/>
                </Spin>
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}