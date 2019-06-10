import React, {Fragment} from 'react'
import 'antd/dist/antd.css';
import './style.css';
import PoliticianCards from '../../components/Politician/PoliticianCards'
import PoliticianFilter from '../../components/Politician/PoliticianFilter'

import {
  Breadcrumb, Row, Col
} from 'antd';


export default class Politician extends React.Component {

    render() {

        return (

            <Fragment>

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Politicians</Breadcrumb.Item>
                </Breadcrumb>

                <div className={'content'}>
                    <div style={{padding: "15px",background: '#ECECEC' }}>
                        <Row className={'reverse-block'}>

                            <Col xl={18} >   <PoliticianCards />  </Col>
                            <Col  xl={6}>  <PoliticianFilter/>    </Col>
                        </Row>

                    </div>
                </div>

            </Fragment>

        );
    }
}


