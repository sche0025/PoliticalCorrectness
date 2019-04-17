import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';
import Leaderboard from '../../components/Dashboard/Leaderboard'
import LineChart from '../../components/Dashboard/LineChart'
import StackedBarChart from '../../components/Dashboard/StackedBarChart'
import PieChart from '../../components/Dashboard/PieChart'
import DonutChart from '../../components/Dashboard/DonutChart'

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

                <div style={{background: '#fff', height: '100%'}}>
                    <div style={{padding: "15px"}}>
                        <Row>
                            <Col span={12} style={{background: "", height: '100%'}}>
                                <Leaderboard/>
                            </Col>
                            <Col span={12}>

                                <Row style={{background: "", height: '27vh', minHeight: '300px'}}>

                                    <LineChart height={295}/>

                                </Row>
                                <Row style={{background: "", height: '27vh', minHeight: '300px'}}>
                                    <Col span={12}>
                                        <PieChart height={295}/>
                                    </Col>
                                    <Col span={12}>
                                        <DonutChart/>
                                    </Col>

                                </Row>

                                <Row style={{background: "", height: '27vh', minHeight: '300px'}}>
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

          