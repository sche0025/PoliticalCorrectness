import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import moment from 'moment'
import logo from "../../assets/img/unimelbLogo.jpeg"
import Datepicker from '../../components/Datepicker/Datepicker'
import config from '../../config'
import store from '../../store/index'

import {
    Layout, Menu, Icon, Row, Col
} from 'antd';
import {NavLink} from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
           date:store.getState().date
        };

    }


    //side bar collapse
    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }

    // get default highlighted NavLink
    getActivatedKey = () => {
        var path = window.location.pathname
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
        var today = moment(config.dataEndingDate).format(config.dateFormat);
        return 'Last updated on ' + today
    }

    handleLogout=()=>{
        localStorage.removeItem("isLoggedIn");
        window.location.reload();
    }

    componentDidMount() {
        var path = window.location.pathname
        if (path.endsWith('dashboard')){
            document.getElementById("dashboardLink").click()
        }

    }

    render() {
        let isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn !='true') return <Redirect to='/'/>
        var defaultKey = this.getActivatedKey()


        return (
            <Layout style={{height: '100vh'}}>

                <Sider
                    width={200}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"><img className={"img"} src={logo} alt=""/></div>
                    <Menu theme="dark" defaultSelectedKeys={[defaultKey]} mode="inline">
                        <Menu.Item key="1">
                            <NavLink to={{pathname:'/home/dashboard', date:this.state.date}} id={"dashboardLink"} >
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

                        <Menu.Item key="4">
                            <NavLink to={'/home/politician'}>
                                <Icon type="user"/>
                                <span>Politicians</span>
                            </NavLink>
                        </Menu.Item>

                        <Menu.Item key="3">
                            <NavLink to={'/home/party'}>
                                <Icon type="flag"/>
                                <span>Parties</span>
                            </NavLink>
                        </Menu.Item>


                        <Menu.Item key="5">
                            <NavLink to={'/home/about'}>
                                <Icon type="team"/>
                                <span>About Us</span>
                            </NavLink>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: "0px 10px",

                    }}>
                        <Row>
                            <Col>
                                <div className={'home-time'}>
                                    <Datepicker/>
                                </div>
                                <div className={'home-time'}>
                                    {this.getLastUpdateTime()}
                                </div>

                                <div className={'user'}>
                                    <span>  Welcome Admin</span>
                                    <a className={"text"} onClick={this.handleLogout}>Logout </a>
                                </div>
                            </Col>
                        </Row>
                    </Header>

                    <Content style={{margin: '0 16px',height:'auto',
                        width:'98%'
                    }}>
                        <div style={{margin: '0 16px'
                            ,overflow: "auto",
                            // overflowY:'auto'
                            }} date="test">
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Home
          