import React, {Fragment} from 'react';
import 'antd/dist/antd.css';
import './style.css';
import PartyCard from '../../components/Party/PartyCards'
import PartyFilter from '../../components/Party/PartyFilter'

import {
   Breadcrumb,Row, Col
} from 'antd';


export default class Party extends React.Component {


    render() {

        return (

            <Fragment>

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Parties</Breadcrumb.Item>
                </Breadcrumb>

                <div className={'content'}>
                    <div style={{padding: "15px",background: '#ECECEC', }}>
                        <Row className={'reverse-block'}>
                            <Col xl={18} >   <PartyCard />  </Col>
                            <Col  xl={6}>  <PartyFilter/>    </Col>
                        </Row>

                    </div>
                </div>

            </Fragment>

        );
    }
}


