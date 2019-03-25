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
        console.log(collapsed);
        this.setState({collapsed});
    }

    render() {
        console.log(this.props.children)

        return (
            <Layout style={{minHeight: '100vh'}}>

                <Sider
                    width={"15%"}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"><img className={"img"} src={logo} alt=""/></div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <NavLink to={'/home/dashboard'}>
                                <Icon type="pie-chart"/>
                                <span>Dashboard</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to={'/home/heatmap'}>
                                <Icon type="pie-chart"/>
                                <span>Map</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to={'/home/politician'}>
                                <Icon type="pie-chart"/>
                                <span>Politicians</span>
                            </NavLink>
                        </Menu.Item>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="team"/><span>Team</span></span>}
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file"/>
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: "0px 10px", textAlign: "right"}}>
                        <Row>
                            <Col>
                                <span className={"text"}>  Welcome Richard</span>
                                <a className={"text"} href={'#'}>Logout </a>
                            </Col>

                        </Row>
                    </Header>

                    <Content style={{margin: '0 16px'}}>


                        <div style={{margin: '0 16px', height:'85vh'}}>
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
          