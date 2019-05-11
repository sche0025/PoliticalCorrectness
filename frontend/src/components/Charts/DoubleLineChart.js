import CanvasJSReact from '../../assets/charts/canvasjs.react'
import $ from 'jquery'
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './LineChart.css'

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default  class DoubleLineChartLineChart extends React.Component {


    render() {

        const options = {
            animationEnabled: true,
            height:this.props.height,
            title:{
                text: this.props.title
            },
            axisY : {
                title: "Number of Replies",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: "Positive Replies",
                showInLegend: true,
                dataPoints: [
                    { y: 155, label: "Jan" },
                    { y: 150, label: "Feb" },
                    { y: 152, label: "Mar" },
                    { y: 148, label: "Apr" },
                    { y: 142, label: "May" },
                    { y: 150, label: "Jun" },
                    { y: 146, label: "Jul" },
                    { y: 149, label: "Aug" },
                    { y: 153, label: "Sept" },
                    { y: 158, label: "Oct" },
                    { y: 154, label: "Nov" },
                    { y: 150, label: "Dec" }
                ]
            },
                {
                    type: "spline",
                    name: "Negative Replies",
                    showInLegend: true,
                    dataPoints: [
                        { y: 172, label: "Jan" },
                        { y: 173, label: "Feb" },
                        { y: 175, label: "Mar" },
                        { y: 172, label: "Apr" },
                        { y: 162, label: "May" },
                        { y: 165, label: "Jun" },
                        { y: 172, label: "Jul" },
                        { y: 168, label: "Aug" },
                        { y: 175, label: "Sept" },
                        { y: 170, label: "Oct" },
                        { y: 165, label: "Nov" },
                        { y: 169, label: "Dec" }
                    ]
                }]
        }

        return(
            <Fragment >

                <div className={'DoublelineChart'} >
                    <CanvasJSChart options = {options}

                        /* onRef={ref => this.chart = ref} */
                    />
                </div>
            </Fragment>

        )
    }
}