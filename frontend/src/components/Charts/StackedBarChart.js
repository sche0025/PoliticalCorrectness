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
                        { label: "New South Wales", y: 13 },
                        { label: " Victoria", y: 13 },
                        { label: "Queensland", y: 15 },
                        { label: "South Australia", y: 16 },
                        { label: "Tasmania", y: 17 },
                        { label: "Western Australia", y: 17 },

                    ]
                },
                {
                    type: "stackedColumn",
                    name: "Positive",
                    showInLegend: true,
                    yValueFormatString: "#,###k",
                    dataPoints: [
                        { label: "New South Wales", y: 13 },
                        { label: " Victoria", y: 13 },
                        { label: "Queensland", y: 15 },
                        { label: "South Australia", y: 15 },
                        { label: "Tasmania", y: 15 },
                        { label: "Western Australia", y: 15 },

                    ]
                },
                {
                    type: "stackedColumn",
                    name: "Negative",
                    showInLegend: true,
                    yValueFormatString: "#,###k",
                    dataPoints: [
                        { label: "New South Wales", y: 14 },
                        { label: " Victoria", y: 8 },
                        { label: "Queensland", y: 6 },
                        { label: "South Australia", y: 6 },
                        { label: "Tasmania", y: 5 },
                        { label: "Western Australia", y: 5 },

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