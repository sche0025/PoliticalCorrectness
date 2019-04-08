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
                <div className={'map-heading'}>Please click the politician to see the details</div>
            </Fragment>

        );
    }
}


