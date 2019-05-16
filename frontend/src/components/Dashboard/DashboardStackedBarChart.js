import CanvasJSReact from '../../assets/charts/canvasjs.react'
import $ from 'jquery'
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './StackedBarChart.css'
import store from "../../store";
import {getDashboardBarChartData} from "../../utils/api";

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DashboardStackedBarChart extends React.Component {

    constructor(props) {
        super(props);
        super(props)
        this.state = {
            isSpinning: true,
            data: [],
            date: store.getState().date
        }

        store.subscribe(this.handleStoreChange);
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
    }

    handleStoreChange = () => {

        if (this.state.date != store.getState().date) {
            this.setState({
                    date: store.getState().date,
                    isSpinning: true
                },
                () => {
                    var me = this
                    getDashboardBarChartData(store.getState().date).then((data) => {
                        me.setState({
                            data: data,
                            isSpinning: false
                        })
                    })
                })
        }
    };

    componentDidMount() {
        var me = this
        getDashboardBarChartData(store.getState().date).then((data) => {
            me.setState({
                data: data,
                isSpinning: false
            })
        })
        console.log("dashboard-stack-chart data loaded")
    }

    toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }

    getData = () => {
        const oriData = this.state.data
        // console.log(JSON.parse(JSON.stringify(oriData)) !=[])
        // console.log(oriData )
        var formatedData = []
        if (oriData && oriData.length !== 0) {
            formatedData =
                [
                    {
                        type: "stackedColumn",
                        name: "Neutral",
                        showInLegend: true,
                        yValueFormatString: "#,###",
                        dataPoints: [
                            {label: oriData[0].Party, y: oriData[0].Sentiment_Neu},
                            {label: oriData[1].Party, y: oriData[1].Sentiment_Neu},
                            {label: oriData[2].Party, y: oriData[2].Sentiment_Neu},
                            {label: oriData[3].Party, y: oriData[3].Sentiment_Neu},
                            {label: oriData[4].Party, y: oriData[4].Sentiment_Neu},


                        ]
                    },
                    {
                        type: "stackedColumn",
                        name: "Positive",
                        showInLegend: true,
                        yValueFormatString: "#,###k",
                        dataPoints: [
                            {label: oriData[0].Party, y: oriData[0].Sentiment_Pos},
                            {label: oriData[1].Party, y: oriData[1].Sentiment_Pos},
                            {label: oriData[2].Party, y: oriData[2].Sentiment_Pos},
                            {label: oriData[3].Party, y: oriData[3].Sentiment_Pos},
                            {label: oriData[4].Party, y: oriData[4].Sentiment_Pos},

                        ]
                    },
                    {
                        type: "stackedColumn",
                        name: "Negative",
                        showInLegend: true,
                        yValueFormatString: "#,###k",
                        dataPoints: [
                            {label: oriData[0].Party, y: oriData[0].Sentiment_Neg},
                            {label: oriData[1].Party, y: oriData[1].Sentiment_Neg},
                            {label: oriData[2].Party, y: oriData[2].Sentiment_Neg},
                            {label: oriData[3].Party, y: oriData[3].Sentiment_Neg},
                            {label: oriData[4].Party, y: oriData[4].Sentiment_Neg},

                        ]
                    }]
            return formatedData
        }

        return []

    }

    render() {

        const options = {
            animationEnabled: true,
            exportEnabled: true,
            height: this.props.height,
            title: {
                text: "Number of tweets from different states",
                fontFamily: "verdana"
            },
            axisY: {
                title: "Number of tweets",
                suffix: "k"
            },
            axisX: [{
                title: "States",
                interval: 1
            }],
            toolTip: {
                shared: true,
                reversed: true
            },
            legend: {
                verticalAlign: "center",
                horizontalAlign: "right",
                reversed: true,
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            data: this.getData()


        }
        return (
            <Fragment>

                <div className={'dashboardStackedBarChart'}>
                    <CanvasJSChart options={options}
                                   onRef={ref => this.chart = ref}
                    />
                </div>
            </Fragment>

        )
    }
}