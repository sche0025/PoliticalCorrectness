import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './MapControl.css';
import logo from "../../assets/img/unimelbLogo.jpeg"


import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class MapControl extends React.Component {


    render() {
        return (

            <Fragment>
                <Row className={'map-heading'}>Please click the electorate to see the details</Row>

            </Fragment>

        );
    }
}


