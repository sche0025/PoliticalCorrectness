import CanvasJSReact from '../../assets/charts/canvasjs.react'
import $ from 'jquery'
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {getDashboardLineChartData} from "../../utils/api";
import store from '../../store/index'
import {Spin} from "antd";
import {getPastDayList} from "../../utils/utils";
import moment from "moment";


// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DashboardLineChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSpinning: true,
            data: [],
            date: store.getState().date
        }

        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange = () => {

        if (this.state.date != store.getState().date) {
            this.setState({
                    date: store.getState().date,
                    isSpinning: true
                },
                () => {
                    var me = this
                    getDashboardLineChartData(getPastDayList(store.getState().date)).then((data) => {
                        me.setState({
                            data: data,
                            isSpinning: false
                        })
                    })
                })
        }
    };



    componentDidMount() {
        var me = this
        getDashboardLineChartData(getPastDayList(store.getState().date)).then((data) => {
            me.setState({
                data: data,
                isSpinning: false
            })
        })
        console.log("dashboard-line-chart data loaded")
    }

    getData=()=>{
        var oriData = this.state.data
        console.log(oriData)
        if(oriData && oriData.length !=0 ){
           var points=[]
            oriData.map((infoADay,i)=>{

                points.push({
                    x:i,
                    y:infoADay.pos+infoADay.neu+infoADay.neg,
                    label:infoADay.date
                })
            })
            console.log(points)
            return points
        }else {
            return []
        }
    }


    render() {
        console.log("dashboard-line-chart",this.state.data)

        const options = {
            animationEnabled: true,


            exportEnabled: true,
            // theme: "light2", // "light1", "dark1", "dark2"
            height:this.props.height,
            title:{
                text: "Number of politician-related tweets posted from tweet users in past 7 days",
                fontFamily: "verdana",
                fontSize: 22,
            },
            axisY: {
                title: "Number of tweets",
                includeZero: false,
                // suffix: "k"
            },
            axisX: {
                // title: "Week of Year",

                interval: 1
            },
            data: [{
                type: "line",
                toolTipContent: "{y}",
                dataPoints:
                     this.getData()
            }]}


        return (
            <div className={'lineChart'} >
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
            </div>
        );
    }
}