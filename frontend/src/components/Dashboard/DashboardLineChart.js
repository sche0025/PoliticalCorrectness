import CanvasJSReact from '../../assets/charts/canvasjs.react'
import React, {Fragment} from 'react';
import {getDashboardLineChartData} from "../../utils/api";
import store from '../../store/index'
import {getPastDayList} from "../../utils/utils";

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

        const options = {
            animationEnabled: true,


            exportEnabled: true,
            // theme: "light2", // "light1", "dark1", "dark2"
            height:this.props.height,
            title:{
                text: "Number of politician-related tweets posted from twitter users in past 7 days",
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