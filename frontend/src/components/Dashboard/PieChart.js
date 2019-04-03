import CanvasJSReact from '../../assets/charts/canvasjs.react'
import $ from 'jquery'
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './PieChart.css'

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PieChart extends React.Component {
    render() {
        const options = {
            theme: "",
            animationEnabled: true,
            exportFileName: "New Year Resolutions",
            exportEnabled: true,
            height:295,

            title:{
                text: "Top Categories of New Year's Resolution"
            },
            data: [{
                type: "pie",
                radius: "99%",
                showInLegend: true,

                legendText: "{label}",
                toolTipContent: "{label}: <strong>{y}%</strong>",
                indexLabel: "{y}%",
                indexLabelPlacement: "inside",
                dataPoints: [
                    { y: 32, label: "Health" },
                    { y: 22, label: "Finance" },
                    { y: 15, label: "Education" },
                    { y: 19, label: "Career" },
                    { y: 5, label: "Family" },
                    { y: 7, label: "Real Estate" }
                ]
            }]
        }
        return (
            <div className={'pieChart'}>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}