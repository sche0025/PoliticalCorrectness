import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import logo from "../../assets/img/unimelbLogo.jpeg"
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import MapControl from '../../components/GoogleMap/MapControl'

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col, Card
} from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class PartyLeaderCard extends React.Component {


    render() {
        return (

            <Fragment>
                <Card
                    title={<div style={{textAlign:"center"}}>
                        Top 1
                    </div>}
                    className={'party-avatar'}
                    cover={<img
                        alt="example"

                        src="https://media.licdn.com/dms/image/C5603AQElDhUZNAr7HA/profile-displayphoto-shrink_800_800/0?e=1560384000&v=beta&t=orOmI6holle_rLZUQd-hCNzMh8QBPN_jD-8qgSWzAAg"/>}
                    bordered={true}
                >
                    <div>sdsdasdasdfdfdfdfdf </div>
                </Card>

            </Fragment>
        );
    }
}


