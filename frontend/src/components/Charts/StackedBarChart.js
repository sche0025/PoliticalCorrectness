import CanvasJSReact from '../../assets/charts/canvasjs.react'
import React, {Fragment} from 'react';
import './StackedBarChart.css'

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

    getData = (type)=> {

        var data = []

        switch (type) {
            case "pos":
                data=this.props.posList
                break
            case "neg":
                data=this.props.negList
                break
            case "neu":
                data=this.props.neuList
                break

            default :
                data = []
        }



        var stateData = []
        for (var key in data) {

            if(key != 'Other Territories'){
                stateData.push({label:key,y:data[key]})
            }

        }


        stateData.sort(function(a,b) {
            var textA = a.label.toUpperCase();
            var textB = b.label.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        return stateData
    }

    render() {


        const options = {
            animationEnabled: true,
            exportEnabled: true,
            height:this.props.height,
            title: {
                // text: "Number of tweets from different states",
                fontFamily: "verdana"
            },
            axisY: {
                title: "Number of netizens",

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
                    color: "#5a81b7",
                    showInLegend: true,
                    yValueFormatString: "#,###",
                    dataPoints: this.getData("neu")
                },

                {
                    type: "stackedColumn",
                    name: "Negative",
                    color:"#b35752",
                    showInLegend: true,
                    yValueFormatString: "#,###",
                    dataPoints: this.getData("neg")
                },
                {
                    type: "stackedColumn",
                    name: "Positive",
                    color:"#8da259",
                    showInLegend: true,
                    yValueFormatString: "#,###",
                    dataPoints: this.getData("pos")
                }
                ]
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