import CanvasJSReact from '../../assets/charts/canvasjs.react'
import $ from 'jquery'
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './StackedBarChart.css'

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default  class stackedBarChart extends React.Component {

    constructor() {
        super();
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
    }
    toggleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else{
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }
    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            height:this.props.height,
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
            data: [
                {
                    type: "stackedColumn",
                    name: "Neutral",
                    showInLegend: true,
                    yValueFormatString: "#,###k",
                    dataPoints: [
                        { label: "Jan", y: 13 },
                        { label: "Feb", y: 13 },
                        { label: "Mar", y: 15 },
                        { label: "Apr", y: 16 },
                        { label: "May", y: 17 },
                        { label: "Jun", y: 17 },
                        { label: "Jul", y: 18 },
                        { label: "Aug", y: 18 },
                        { label: "Sept", y: 17 },
                        { label: "Oct", y: 18 },
                        { label: "Nov", y: 18 },
                        { label: "Dec", y: 18 }
                    ]
                },
                {
                    type: "stackedColumn",
                    name: "Positive",
                    showInLegend: true,
                    yValueFormatString: "#,###k",
                    dataPoints: [
                        { label: "Jan", y: 13 },
                        { label: "Feb", y: 13 },
                        { label: "Mar", y: 15 },
                        { label: "Apr", y: 15 },
                        { label: "May", y: 15 },
                        { label: "Jun", y: 15 },
                        { label: "Jul", y: 16 },
                        { label: "Aug", y: 17 },
                        { label: "Sept", y: 17 },
                        { label: "Oct", y: 18 },
                        { label: "Nov", y: 19 },
                        { label: "Dec", y: 20 },
                    ]
                },
                {
                    type: "stackedColumn",
                    name: "Negative",
                    showInLegend: true,
                    yValueFormatString: "#,###k",
                    dataPoints: [
                        { label: "Jan", y: 14 },
                        { label: "Feb", y: 8 },
                        { label: "Mar", y: 6 },
                        { label: "Apr", y: 6 },
                        { label: "May", y: 5 },
                        { label: "Jun", y: 5 },
                        { label: "Jul", y: 6 },
                        { label: "Aug", y: 3 },
                        { label: "Sept", y: 9 },
                        { label: "Oct", y: 5 },
                        { label: "Nov", y: 8 },
                        { label: "Dec", y: 2 },
                    ]
                }]
        }
        return(
            <Fragment >

                <div className={'stackedBarChart'} >
                    <CanvasJSChart options = {options}
                                   onRef={ref => this.chart = ref}
                    />
                </div>
            </Fragment>

        )
    }
}