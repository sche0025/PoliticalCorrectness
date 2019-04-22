import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import logo from "../../assets/img/unimelbLogo.jpeg"
 import {BackTop} from 'antd'
import PoliticianCards from '../../components/Politician/PoliticianCards'
import PoliticianFilter from '../../components/Politician/PoliticianFilter'

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class Politician extends React.Component {


    render() {

        return (

            <Fragment>

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Politicians</Breadcrumb.Item>
                </Breadcrumb>

                <div className={'content'}>
                    <div style={{padding: "15px",background: '#ECECEC' }}>
                        <Row>
                            <Col span={18}> <PoliticianCards />  </Col>
                            <Col span={6}>  <PoliticianFilter/>    </Col>
                        </Row>

                    </div>
                </div>

            </Fragment>

        );
    }
}


