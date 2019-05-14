import CanvasJSReact from '../../assets/charts/canvasjs.react'
import $ from 'jquery'
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './DonutChart.css'

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DonutChart extends React.Component {

    getCenterText = (pos, neu, neg) => {
        var largest =Math.max(pos, neu, neg)
        var text = ""

        if(pos+neg+neu ==0){
            return "No Reply"
        }
        console.log(pos/(pos+neg+neu))
        console.log(largest,pos,neu,neu)
        if (largest == pos) {
            return parseInt(100*pos/(pos+neg+neu),10)+"% Positive"
        } else if (largest == neu) {
            return parseInt(100*neu/(pos+neg+neu),10)+"% Neutral"
        } else {
            return parseInt(100*neg/(pos+neg+neu),10)+"% Negative"
        }
        return ""
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
                text:  this.getCenterText(this.props.pos,this.props.neu,this.props.neg),
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
                    {name: "Unsatisfied", y: this.props.neg},
                    {name: "Neutral", y: this.props.neu},
                    {name: "Satisfied", y: this.props.pos},

                ]
            }]
        }


        return (
            <div className={'donutChart'}>
                <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}