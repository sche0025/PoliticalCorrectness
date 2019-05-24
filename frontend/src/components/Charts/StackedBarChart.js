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

    getData = (type)=> {
        // console.log(this.props.posList)
        // for (var key in this.props.posList) {
        //     console.log(key, this.props.posList[key]);
        // }
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


        console.log(data)
        var stateData = []
        for (var key in data) {
            console.log({label:key,y:data[key]})
            if(key != 'Other Territories'){
                stateData.push({label:key,y:data[key]})
            }

        }

        // for(var i=0;i<data.length;i++){
        //     stateData.push({label:     data.key ,y:  data.val})
        // }
        stateData.sort(function(a,b) {
            var textA = a.label.toUpperCase();
            var textB = b.label.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        console.log(type,stateData)
        return stateData
    }

    render() {

        console.log("pos",this.props.posList,"neg",this.props.negList,"neu",this.props.neuList)
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
                    yValueFormatString: "#,###",
                    dataPoints: this.getData("neu")
                },
                {
                    type: "stackedColumn",
                    name: "Positive",
                    showInLegend: true,
                    yValueFormatString: "#,###",
                    dataPoints: this.getData("pos")
                },
                {
                    type: "stackedColumn",
                    name: "Negative",
                    showInLegend: true,
                    yValueFormatString: "#,###",
                    dataPoints: this.getData("neg")
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