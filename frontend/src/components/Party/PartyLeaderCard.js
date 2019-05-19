import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import logo from "../../assets/img/unimelbLogo.jpeg"
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import MapControl from '../../components/GoogleMap/MapControl'
import './PartyLeaderCard.css'

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col, Card
} from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class PartyLeaderCard extends React.Component {


    getRank = (key)=>{
        switch (key) {
            case 0:
                return "1ST"
            case 1:
                return "2ND"
            case 2:
                return "3RD"
            default:
                return ""
        }
    }
    render() {

        return (

            <Fragment>
                <Card
                    title={<div style={{textAlign: "center"}}>
                        {this.getRank(this.props.myKey)}
                    </div>}
                    className={'party-avatar'}
                    cover={
                        <img
                            className={"party-top-avatar"}
                        alt="example"
                        src={this.props.img}
                    />
                    }
                    bordered={true}
                >
                    <div className={"text-center"}>{this.props.name} <span style={{paddingLeft:"20px"}}>{this.props.sc}</span></div>
                </Card>

            </Fragment>
        );
    }
}


