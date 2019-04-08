import React, {Fragment} from 'react'
import './PoliticianCard.css'
import {Card, BackTop,Statistic} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import PoliticalModal from './PoliticianModal'
import {Link} from "react-router-dom";


export default class PoliticianCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            politicians: []

        };
    }

    componentDidMount() {

    }


    getTitleLink = (name )=>{
        return <PoliticalModal name = {name+" test user"} />

    }

    getCards = () => {

        var testList = [1, 2, 3, 4, 5]


        return testList.map(politician => (
            // console.log('1')
            <Card
                title={this.getTitleLink(politician)}
                bordered={false}

                loading={false}
                className={'card'}

            >
                <Row>
                    <Col span={6}>
                        <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                             style={{width: '95%', height: '20vh'}}
                        />
                    </Col>
                    <Col span={18}>
                        <Col span={12}>
                            <Row className={'heading'}>
                                <Col span={8} className={'heading-text'}> Tweeter</Col>
                                <Col span={16} className={'politician-text'}> @scottMorison</Col>
                            </Row>
                            <Row className={'heading'}>
                                <Col span={8} className={'heading-text'}> For</Col>
                                <Col span={16} className={'politician-text'}> Sydney</Col>
                            </Row>
                            <Row className={'heading'}>
                                <Col span={8} className={'heading-text'}> Party</Col>
                                <Col span={16} className={'politician-text'}> Labour</Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Col span={12}>
                                <Row className={'heading'}>
                                    <Statistic title="Tweets posted" value={112893} />
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title="Replies Received" value={112893} />
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row className={'heading'}>
                                    <Statistic title="Followers" value={112893} />
                                </Row>
                                <Row className={'heading2'}>
                                    <Statistic title="Mean Sentiment Score" value={93} suffix="/ 100" />
                                </Row>
                            </Col>
                        </Col>
                    </Col>

                </Row>
            </Card>
        ))

    }

    render() {
        return (
            <div id={'cardList'}>

                {this.getCards()}
                {/*<Card title="Card title" bordered={false} className={'card'} loading={false}>*/}

                {/*</Card>*/}
                {/*<Card title="Card title" bordered={false} className={'card'} loading={false}>*/}

                {/*</Card>*/}
                {/*<Card title="Card title" bordered={false} className={'card'} loading={false}>*/}

                {/*</Card>*/}
                {/*<Card title="Card title" bordered={false} className={'card'} loading={false}>*/}

                {/*</Card>*/}
                {/*<Card title="Card title" bordered={false} className={'card                <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>        <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>ng={false}>*/}

                {/*</Card>*/}

                <BackTop target={() => document.getElementById('cardList')}/>
            </div>
        )
    }

}
