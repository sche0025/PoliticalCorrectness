import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';
import Leaderboard from '../../components/Dashboard/Leaderboard'
import LineChart from '../../components/Charts/LineChart'
import StackedBarChart from '../../components/Charts/StackedBarChart'
import PieChart from '../../components/Charts/PieChart'
import DonutChart from '../../components/Charts/DonutChart'

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class Dashboard extends React.Component {

    render() {

        return (
            <Fragment>

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                </Breadcrumb>

                <div style={{background: '#fff', height: '100%',minWidth:'1500px'
               // , overflowX:'scroll'
                }}>
                    <div style={{padding: "15px"}}>
                        <Row>
                            <Col span={12} style={{background: "", height: '100%'}}>
                                <Leaderboard/>
                            </Col>
                            <Col span={12}>

                                <Row className={'chart-container'}>

                                    <LineChart height={295}/>

                                </Row>
                                <Row className={'chart-container'}>
                                    <Col span={12}>
                                        <PieChart height={295}/>
                                    </Col>
                                    <Col span={12}>
                                        <DonutChart height={295}/>
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

          