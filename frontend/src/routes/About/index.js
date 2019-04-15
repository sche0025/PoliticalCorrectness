import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import logo from "../../assets/img/unimelbLogo.jpeg"
import {BackTop} from 'antd'
import PoliticianCards from '../../components/Politician/PoliticianCards'
import PoliticianFilter from '../../components/Politician/PoliticianFilter'
import edward from '../../assets/img/edward.jpeg'
import banner from '../../assets/img/melbourneunib.png'

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col, Carousel
} from 'antd';
import Card from "antd/lib/card";
import Meta from "antd/es/card/Meta";

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class About extends React.Component {

    constructor(props){
        super()
        this.state={
            count:0
        }
    }

    getEasterEgg=()=>{
        this.setState({
            count:this.state.count +1
        })

        if(this.state.count ==4){
            alert("智慧姐姐真是厉害！")
        }
    }

    render() {

        return (

            <Fragment>

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>About</Breadcrumb.Item>
                </Breadcrumb>

                <div
                    style={{background: '#fff',  overflow: 'auto',height:'83vh'}}
                // className={'content'}
                >


                    <div style={{padding: "15px"}}>
                        <Row className={'carousel'}>
                            <Carousel autoplay  effect={'fade'}
                                      autoplayInterval={'100'}
                            >
                                <div><img alt="example"
                                          className={'img'}
                                          src={banner}/>
                                </div>
                                <div><h3>2</h3></div>
                                <div><h3>3</h3></div>

                            </Carousel>
                        </Row>
                        <Row className={'about-content'}>
                            <div className={'about-font-heading'}>About the Project</div>
                            <div className={'about-font-body'}>Here's the introduction</div>
                        </Row>

                        <Row className={'about-content'}>
                            <div className={'about-font-heading'}>Project Team</div>
                            <div className={'about-profile'}>

                                <Col span={6} style={{padding: '15px'}}>
                                    <div style={{background: '#ECECEC', padding: '2px'}}>
                                        <Card cover={<img alt="example" className={'avatar'}
                                                          src="https://findanexpert.unimelb.edu.au/pictures/342078picture.jpg"/>}
                                              bordered={true}
                                        >
                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Name </Col>
                                                <Col span={16} className={'profile-text'}>Prof Richard Sinnott
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Role </Col>
                                                <Col span={16} className={'profile-text'}>Supervisor</Col>
                                            </Row>

                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Linkedin </Col>
                                                <Col span={16} className={'profile-text'}>
                                                    <a href={'https://www.linkedin.com/in/richard-sinnott-568552a/'} target="_blank">
                                                        Richard Sinnott
                                                    </a>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                </Col>

                                <Col span={6} style={{padding: '15px'}}>
                                    <div style={{background: '#ECECEC', padding: '2px'}}>
                                        <Card cover={<img
                                            alt="example" className={'avatar'}
                                                             onClick={this.getEasterEgg}
                                                          src="https://media.licdn.com/dms/image/C5603AQElDhUZNAr7HA/profile-displayphoto-shrink_800_800/0?e=1560384000&v=beta&t=orOmI6holle_rLZUQd-hCNzMh8QBPN_jD-8qgSWzAAg"/>}

                                              bordered={true}
                                        >
                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Name </Col>
                                                <Col span={16} className={'profile-text'}>Zhihui(Carol) Cheng
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Role </Col>
                                                <Col span={16} className={'profile-text'}>Algorithm Engineer</Col>

                                            </Row>

                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Linkedin </Col>
                                                <Col span={16} className={'profile-text'}>
                                                    <a href={'https://www.linkedin.com/in/carolcheng123/'} target="_blank">
                                                        Zhihui(Carol) Cheng
                                                    </a>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                </Col>

                                <Col span={6} style={{padding: '15px'}}>
                                    <div style={{background: '#ECECEC', padding: '2px'}}>
                                        <Card cover={<img alt="example" className={'avatar'}

                                                          src="https://media.licdn.com/dms/image/C5603AQGV5M-3_Ks2iw/profile-displayphoto-shrink_800_800/0?e=1560384000&v=beta&t=Kfvc8RIIUBeh7tMXDcFzazIga9UI3HW246RIkNCSKsg"/>}
                                              bordered={true}
                                        >
                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Name </Col>
                                                <Col span={16} className={'profile-text'}>Pengfei(Allen) Xiao
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Role </Col>
                                                <Col span={16} className={'profile-text'}>Algorithm Engineer</Col>
                                            </Row>

                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Linkedin</Col>
                                                <Col span={16} className={'profile-text'}>
                                                    <a href={'https://www.linkedin.com/in/pengfei-allen-xiao-37449b104/'} target="_blank">
                                                        Pengfei(Allen) Xiao
                                                    </a>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                </Col>

                                <Col span={6} style={{padding: '15px'}}>
                                    <div style={{background: '#ECECEC', padding: '2px'}}>
                                        <Card cover={<img alt="example" className={'avatar'}
                                                          src={edward}/>}
                                              bordered={true}
                                        >
                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Name </Col>
                                                <Col span={16} className={'profile-text'}>Siyu(Edward) Chen
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Role </Col>
                                                <Col span={16} className={'profile-text'}>Full Stack Engineer </Col>
                                            </Row>

                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Linkedin</Col>
                                                <Col span={16} className={'profile-text'}>
                                                    <a href={'https://www.linkedin.com/in/edward-chen-17062a136/'} target="_blank">
                                                        Siyu(Edward) Chen
                                                    </a>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                    </div>
                </div>

            </Fragment>

        );
    }
}


