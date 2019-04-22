import CanvasJSReact from '../../assets/charts/canvasjs.react'
import $ from 'jquery'
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './DonutChart.css'

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DonutChart extends React.Component {
    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            height:this.props.height,
            title: {
                text: "Sentiment of Replies"
            },
            subtitles: [{
                text: "40% Positive",
                verticalAlign: "center",
                fontSize: 24,
                dockInsidePlotArea: true
            }],
            data: [{
                type: "doughnut",
                indexLabelPlacement: "inside",
                showInLegend: false,

                indexLabel: "{name}: {y}",
                yValueFormatString: "#,###'%'",
                dataPoints: [
                    { name: "Unsatisfied", y: 35 },
                    { name: "Neutral", y: 31 },
                    { name: "Satisfied", y: 40 },

                ]
            }]
        }
        return (
            <div className={'donutChart'}>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}