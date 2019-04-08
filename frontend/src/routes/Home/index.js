import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import logo from "../../assets/img/unimelbLogo.jpeg"

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

    onCollapse = (collapsed) => {

        this.setState({collapsed});
    }

    getActivatedKey = () => {
        var path = window.location.pathname
        console.log(path,path.endsWith('politician'))
        if(path.endsWith('dashboard')){
            return '1'
        }else if(path.endsWith('map')){
            return '2'
        }else if(path.endsWith('politician')){
            return '3'
        }else if(path.endsWith('about')){
            return '4'
        }
    }

    render() {
        console.log(window.location.pathname)
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
                            <NavLink to={'/home/politician'}>
                                <Icon type="user"/>
                                <span>Politicians</span>
                            </NavLink>
                        </Menu.Item>


                        <Menu.Item key="4">
                            <NavLink to={'/home/about'}>
                                <Icon type="team"/>
                                <span>About Us</span>
                            </NavLink>
                        </Menu.Item>

                        <Menu.Item key="5">
                            <NavLink to={'/home/test'}>
                                <Icon type="file"/>
                                <span>Chart Test</span>
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: "0px 10px", textAlign: "right"}}>
                        <Row>
                            <Col>
                                <span>  Welcome Richard</span>
                                <a className={"text"} href={'#'}>Logout </a>
                            </Col>

                        </Row>
                    </Header>

                    <Content style={{margin: '0 16px'}}>
                        <div style={{margin: '0 16px', height: '95%'}}>
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
          