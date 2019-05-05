import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import logo from "../../assets/img/unimelbLogo.jpeg"
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import MapControl from '../../components/GoogleMap/MapControl'

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class Map extends React.Component {


    render() {
        return (

            <Fragment>

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Map</Breadcrumb.Item>
                </Breadcrumb>


                <div style={{background: '#fff',width:'auto'
                    ,minWidth:'1150px'
                }}>
                    <div style={{padding: "15px"}}>
                        <Row>
                            <Col span={15}> <GoogleMap/> </Col>
                            <Col span={9}> <MapControl/></Col>
                        </Row>
                    </div>
                </div>
            </Fragment>

        );
    }
}


