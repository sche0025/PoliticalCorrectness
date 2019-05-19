import CanvasJSReact from '../../assets/charts/canvasjs.react'
import $ from 'jquery'
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './LineChart.css'

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default  class DoubleLineChartLineChart extends React.Component {


    getDataPoint = (type)=>{
        if(this.props.data){
            console.log(this.props.data)
            var dataPoint = []
            this.props.data.map((dataADay)=>{
                dataPoint.push({
                    label:dataADay.date,
                    y:dataADay.sc[type]
                })
            })
            console.log(dataPoint)
            return dataPoint
        }


        return []
    }

    render() {

        console.log("data is",this.props.data)

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
            data: [
                {
                    type: "spline",
                    name: "Negative Replies",
                    showInLegend: true,
                    dataPoints:    this.getDataPoint("neg")
                },
                {
                type: "spline",
                name: "Positive Replies",
                showInLegend: true,
                dataPoints:
                    this.getDataPoint("pos")

            }

                ]
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