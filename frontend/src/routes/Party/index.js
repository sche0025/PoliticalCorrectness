import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import logo from "../../assets/img/unimelbLogo.jpeg"
 import {BackTop} from 'antd'
import PartyCard from '../../components/Party/PartyCards'
import PartyFilter from '../../components/Party/PartyFilter'

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';
import PoliticianCards from "../Politician";

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class Party extends React.Component {


    render() {

        return (

            <Fragment>

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Parties</Breadcrumb.Item>
                </Breadcrumb>

                <div className={'content'}>
                    <div style={{padding: "15px",background: '#ECECEC', }}>
                        <Row className={'reverse-block'}>
                            <Col xl={18} >   <PartyCard />  </Col>
                            <Col  xl={6}>  <PartyFilter/>    </Col>
                        </Row>

                    </div>
                </div>

            </Fragment>

        );
    }
}


