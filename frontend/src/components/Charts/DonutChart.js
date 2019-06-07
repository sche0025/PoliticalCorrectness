import CanvasJSReact from '../../assets/charts/canvasjs.react'
import React from 'react';
import './DonutChart.css'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DonutChart extends React.Component {

    getCenterText = (pos, neu, neg) => {
        var largest =Math.max(pos, neu, neg)

        if(pos+neg+neu ==0){
            return "No Reply"
        }
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
                text: "Sentiment of Mentions"
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
                    {name: "Unsatisfied", y: this.props.neg,color:"#b35752"},
                    {name: "Neutral", y: this.props.neu,    color: "#5a81b7"},
                    {name: "Satisfied", y: this.props.pos,  color: "#8da259"},

                ]
            }]
        }


        return (
            <div className={'donutChart'}>
                <CanvasJSChart options={options}

                />

            </div>
        );
    }
}