import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';
import Leaderboard from '../../components/Dashboard/Leaderboard'
import TopicTable from '../../components/Dashboard/TopicTable.js'
import LineChart from '../../components/Charts/LineChart'
import StackedBarChart from '../../components/Charts/StackedBarChart'
import PieChart from '../../components/Charts/PieChart'
import DonutChart from '../../components/Charts/DonutChart'
import 'bootstrap'
import store from "../../store";
import DashboardDonutChart from "../../components/Dashboard/DashboardDonutChart";

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            date:store.getState().date
        };
        store.subscribe(this.handleStoreChange);
    }

    componentDidMount() {
        console.log("dashboard rendered")
    }

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

                {/*<div>{this.state.date}</div>*/}

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
                                    <LineChart height={295}/>
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
                                    <StackedBarChart height={295}/>
                                </Row>

                            </Col>
                        </Row>


                    </div>
                </div>

            </Fragment>
        );
    }
}

          