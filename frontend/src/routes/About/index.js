import React, {Fragment} from 'react';
import 'antd/dist/antd.css';
import './style.css';

import edward from '../../assets/img/edward.jpeg'
import daniel from '../../assets/img/DanielWu.jpg'
import banner from '../../assets/img/melbourneunib.png'
import team from '../../assets/img/team.png'

import {
    Breadcrumb, Row, Col, Carousel
} from 'antd';
import Card from "antd/lib/card";

export default class About extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            edwardCount: 0,
            edwardAvatar: edward
        }
    }

    getEasterEgg = () => {
        this.setState({
            count: this.state.count + 1
        })

        if (this.state.count == 4) {
            alert("智慧姐姐真是厉害!\nCarol is incredibly smart!")
        }
    }

    //redirect to melbourne eResearch Group
    handleSchoolClick = () => {
        window.open("https://eresearch.unimelb.edu.au/", "_blank")
    }

    //handle edward's easter egg
    handleMyEasterEgg = () => {
        this.setState({
            edwardCount: this.state.edwardCount + 1
        })

        if (this.state.edwardCount == 4) {
            this.setState({
                edwardAvatar: daniel
            })

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
                    style={{background: '#fff'}}
                    // className={'content'}
                >


                    <div style={{padding: "15px"}}>
                        <Row className={'carousel'}>
                            <Carousel autoplay effect={'fade'}

                            >
                                <div><img alt="example"
                                          className={'about-img'}
                                          onClick={this.handleSchoolClick}
                                          src={banner}/>
                                </div>
                                <div>
                                    <img alt="example"
                                         className={'about-img'}
                                         src={team}/>
                                </div>
                                {/*<div><h3>3</h3></div>*/}

                            </Carousel>
                        </Row>
                        <Row className={'about-content'}>
                            <div className={'about-font-heading'}>About the Project</div>
                            <div className={'about-font-body'}>
                                Our project aims to build a web application to analyze the popularity rating of the
                                candidates of 2019 Australian
                                election by leveraging the Nectar cloud platform and tweets data. The whole process
                                involves system architecture
                                design, environment deployment, data harvester, data analysis, and data visualization.
                                We harvested around 5
                                million data including tweets of 280 election candidates in 143 constituencies, tweets
                                of Twitter users which
                                mentioned the candidates and tweets which used the popular hashtags of the candidates.
                                The data are cleaned before
                                saved to MongoDB. Wide range of analysis was performed for different dimensions like
                                date, politician, party,
                                state, hashtag, and constituency. The analysis results are visualized in our web
                                application.
                            </div>
                        </Row>

                        <Row className={'about-content'}>
                            <div className={'about-font-heading'}>Project Team</div>
                            <div className={'about-profile'}>

                                <Col lg={12} xxl={6} style={{padding: '5px'}}>
                                    <div style={{background: '#ECECEC', padding: '2px'}}>

                                        <Card cover={
                                            <img alt="example" className={'avatar'}

                                                 src="https://findanexpert.unimelb.edu.au/pictures/342078picture.jpg"/>
                                        }
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
                                                    <a href={'https://www.linkedin.com/in/richard-sinnott-568552a/'}
                                                       target="_blank">
                                                        Richard Sinnott
                                                    </a>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                </Col>

                                <Col lg={12} xxl={6} style={{padding: '5px'}}>
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
                                                <Col span={16} className={'profile-text'}>Data Engineer</Col>

                                            </Row>

                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Linkedin </Col>
                                                <Col span={16} className={'profile-text'}>
                                                    <a href={'https://www.linkedin.com/in/carolcheng123/'}
                                                       target="_blank">
                                                        Zhihui(Carol) Cheng
                                                    </a>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                </Col>

                                <Col lg={12} xxl={6} style={{padding: '5px'}}>
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
                                                <Col span={16} className={'profile-text'}>Data Analyst</Col>
                                            </Row>

                                            <Row>
                                                <Col span={8} className={'profile-heading'}>Linkedin</Col>
                                                <Col span={16} className={'profile-text'}>
                                                    <a href={'https://www.linkedin.com/in/pengfei-allen-xiao-37449b104/'}
                                                       target="_blank">
                                                        Pengfei(Allen) Xiao
                                                    </a>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                </Col>

                                <Col lg={12} xxl={6} style={{padding: '5px'}}>
                                    <div style={{background: '#ECECEC', padding: '2px'}}>
                                        <Card cover={<img alt="example" className={'avatar'}
                                                          src={this.state.edwardAvatar}
                                                          onClick={this.handleMyEasterEgg}
                                        />}
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
                                                    <a href={'https://www.linkedin.com/in/edward-chen-17062a136/'}
                                                       target="_blank">
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


