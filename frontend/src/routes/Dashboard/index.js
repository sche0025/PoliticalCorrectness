import React, {Fragment} from 'react';
import 'antd/dist/antd.css';
import './style.css';

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';
import Leaderboard from '../../components/Dashboard/Leaderboard'
import TopicTable from '../../components/Dashboard/TopicTable'
import 'bootstrap'
import store from "../../store";
import DashboardDonutChart from "../../components/Dashboard/DashboardDonutChart";
import DashboardStackedBarChart from "../../components/Dashboard/DashboardStackedBarChart";
import DashboardLineChart from "../../components/Dashboard/DashboardLineChart";

export default class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            date:store.getState().date
        };
        store.subscribe(this.handleStoreChange);
    }


    //handle date change
    handleStoreChange = () => {
        if(this.state.date != store.getState().date){
            this.setState({
                date: store.getState().date
            })
        }
    };

    render() {

        return (
            <Fragment>

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                </Breadcrumb>

                <div style={{background: 'white', height: 'auto',minHeight:"720px"
                    ,minWidth:'750px'
                }}>
                    <div style={{padding: "15px"}}>
                        <Row>
                            <Col  style={{background: "",backdropColor:''}} lg={24} xxl={14}>
                                <Leaderboard date = {this.state.date}/>
                            </Col>
                            <Col  style={{maxWidth:'1130px'}} lg={24} xxl={10}>

                                <Row className={'chart-container'}>

                                    <DashboardLineChart height={295}/>
                                </Row>
                                <Row className={'chart-container'}>
                                    <Col span={12}>
                                        <TopicTable date = {this.state.date}/>
                                    </Col>

                                    <Col span={12}>
                                        <DashboardDonutChart height={295}/>
                                    </Col>

                                </Row>

                                <Row className={'chart-container'}>
                                    <DashboardStackedBarChart height={295}/>
                                </Row>

                            </Col>
                        </Row>


                    </div>
                </div>

            </Fragment>
        );
    }
}

          