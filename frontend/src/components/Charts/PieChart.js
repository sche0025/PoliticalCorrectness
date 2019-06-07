import CanvasJSReact from '../../assets/charts/canvasjs.react'

import React, {Fragment} from 'react';
import './PieChart.css'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PieChart extends React.Component {
    render() {
        const options = {
            theme: "",
            animationEnabled: true,
            exportFileName: "New Year Resolutions",
            exportEnabled: true,
            height:this.props.height,

            title:{
                verticalAlign: "top",
                horizontalAlign:'center',
                text: "Positive Replies to different parties"
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
                    { y: 32, label: "Australian Greens" },
                    { y: 22, label: "Australian Labor Party" },
                    { y: 15, label: "Centre Alliance" },
                    { y: 19, label: "Independent" },
                    { y: 5, label: "Katter's Australian Party" },
                    { y: 7, label: "Liberal Party of Australia" },
                    { y: 7, label: "The Nationals" }
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