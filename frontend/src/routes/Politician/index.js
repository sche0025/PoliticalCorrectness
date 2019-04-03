import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import logo from "../../assets/img/unimelbLogo.jpeg"
 import {BackTop} from 'antd'
import PoliticianCards from '../../components/Politician/PoliticianCards.js'


import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class Heatmap extends React.Component {


    render() {
        return (

            <Fragment>

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>

                <div id={'content'}>
                    <div style={{padding: "15px",background: '#ECECEC' }}>

                        <PoliticianCards />

                    </div>
                </div>

            </Fragment>

        );
    }
}


