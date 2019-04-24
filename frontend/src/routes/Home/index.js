import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import moment from 'moment'
import logo from "../../assets/img/unimelbLogo.jpeg"
import Datepicker from '../../components/Datepicker/Datepicker'
import config from '../../config'


import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';
import {NavLink} from "react-router-dom";

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class Home extends React.Component {
    state = {
        collapsed: false,
    };

    //side bar collapse
    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }

    // get default highlighted NavLink
    getActivatedKey = () => {
        var path = window.location.pathname
        console.log(path, path.endsWith('politician'))
        if (path.endsWith('dashboard')) {
            return '1'
        } else if (path.endsWith('map')) {
            return '2'
        } else if (path.endsWith('party')) {
            return '3'
        } else if (path.endsWith('politician')) {
            return '4'
        } else if (path.endsWith('about')) {
            return '5'
        }
    }

    //Get the date of update
    getLastUpdateTime = () => {
        var today = moment().format(config.dateFormat);
        return 'Last updated on ' + today
    }


    render() {

        var defaultKey = this.getActivatedKey()
        // console.log(defaultKey)
        return (
            <Layout style={{minHeight: '100vh'}}>

                <Sider
                    width={"15%"}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"><img className={"img"} src={logo} alt=""/></div>
                    <Menu theme="dark" defaultSelectedKeys={[defaultKey]} mode="inline">
                        <Menu.Item key="1">
                            <NavLink to={'/home/dashboard'}>
                                <Icon type="pie-chart"/>
                                <span>Dashboard</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to={'/home/map'}>
                                <Icon type="heat-map"/>
                                <span>Map</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to={'/home/party'}>
                                <Icon type="flag"/>
                                <span>Parties</span>
                            </NavLink>
                        </Menu.Item>

                        <Menu.Item key="4">
                            <NavLink to={'/home/politician'}>
                                <Icon type="user"/>
                                <span>Politicians</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <NavLink to={'/home/about'}>
                                <Icon type="team"/>
                                <span>About Us</span>
                            </NavLink>
                        </Menu.Item>

                        <Menu.Item key="6">
                            <NavLink to={'/home/test'}>
                                <Icon type="file"/>
                                <span>Chart Test</span>
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: "0px 10px"}}>
                        <Row>
                            {/*<Col span={18} >*/}
                            {/*<div className={'home-time'} >*/}
                            {/*<Datepicker/>*/}
                            {/*</div>*/}
                            {/*{this.getLastUpdateTime()}*/}
                            {/*</Col>*/}

                            {/*<Col span={6} style={{textAlign: "right"}}>*/}
                            {/*<span>  Welcome Richard</span>*/}
                            {/*<a className={"text"} href={'#'}>Logout </a>*/}
                            {/*</Col>*/}

                            <Col >
                                <div className={'home-time'}>
                                    <Datepicker/>
                                </div>
                                <div className={'home-time'}>
                                    {this.getLastUpdateTime()}
                                </div>

                                <div className={'user'}>
                                    <span>  Welcome Richard</span>
                                    <a className={"text"} href={'#'}>Logout </a>
                                </div>
                            </Col>
                        </Row>
                    </Header>

                    <Content style={{margin: '0 16px'}}>
                        <div style={{margin: '0 16px', height: '100%', overflowY: 'hidden'}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        NLP: Political Correctness ©2019 The University of Melbourne
                    </Footer>


                </Layout>
            </Layout>
        );
    }
}

export default Home
          