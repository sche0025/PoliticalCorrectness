import CanvasJSReact from '../../assets/charts/canvasjs.react'
import React, {Fragment} from 'react';
import './LineChart.css'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DoubleLineChartLineChart extends React.Component {


    getDataPoint = (type) => {
        if (this.props.data) {

            var dataPoint = []
            this.props.data.map((dataADay) => {
                dataPoint.push({
                    label: dataADay.date,
                    y: dataADay.sc[type]
                })
            })
            return dataPoint
        }


        return []
    }

    render() {

        const options = {
            animationEnabled: true,
            height: this.props.height,
            title: {
                text: this.props.title
            },
            axisY: {
                title: this.props.yTitle,
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [

                {
                    type: "spline",
                    name: "Positive "+this.props.type,
                    showInLegend: true,
                    color: "#5a81b7",
                    dataPoints:
                        this.getDataPoint("pos")

                },   {
                    type: "spline",
                    color:"#8da259",
                    name: "Negative "+this.props.type,
                    showInLegend: true,
                    dataPoints: this.getDataPoint("neg")
                }

            ]
        }

        return (
            <Fragment>

                <div className={'DoublelineChart'}>
                    <CanvasJSChart options={options}

                        /* onRef={ref => this.chart = ref} */
                    />
                </div>
            </Fragment>

        )
    }
}