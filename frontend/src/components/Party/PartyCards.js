import React, {Fragment} from 'react'
import './PartyCard.css'
import {Card, BackTop,Statistic} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import PartyModal from './PartyModal'
import store from '../../store/index'
import greenFlag from '../../assets/img/partyFlags/green.png'
import caFlag from '../../assets/img/partyFlags/ca.png'
import kapFlag from '../../assets/img/partyFlags/kap.png'
import laborFlag from '../../assets/img/partyFlags/labor.png'
import liberalFlag from '../../assets/img/partyFlags/liberal.png'
import natinalsFlag from '../../assets/img/partyFlags/nationals.jpg'
import {Link} from "react-router-dom";


export default class PartyCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            politicians: [],
            input:'',
            party:"all",
            gender:"all"
        };
        store.subscribe(this.handleStoreChange);
    }

    componentDidMount() {

    }


    getTitleLink = (party )=>{
        return <PartyModal name = {party.name}
        flag = {party.flag}
        />

    }


    getCards = () => {
        var green = {
            flag:greenFlag,
            name:'Australian Greens'
        }

        var ca = {
            flag:caFlag,
            name:'Centre Alliance'
        }

        var labor = {
            flag:laborFlag,
            name:'Australian Labor Party'
        }

        var kap = {
            flag:kapFlag,
            name:"1 Katter's Australian Party"
        }

        var liberal = {
            flag:liberalFlag,
            name:'Liberal Party of Australia'
        }

        var natinals = {
            flag:natinalsFlag,
            name:'The Nationals'
        }


        var testList = [green,ca,labor,kap,liberal,natinals]


        return testList.map(party => (
            // console.log('1')
            <Card
                title={this.getTitleLink(party)}
                bordered={false}
                loading={false}
                className={'card'}

            >
                <Row>
                    <Col span={6}>
                        <img src={party.flag}
                             style={{width: '95%', height: '20vh'}}
                        />
                    </Col>
                    <Col span={18}>
                        <Col span={12}>
                            {/*<Row className={'heading'}>*/}
                                {/*<Col span={8} className={'heading-text'}> Tweeter</Col>*/}
                                {/*<Col span={16} className={'politician-text'}> @scottMorison</Col>*/}
                            {/*</Row>*/}
                            {/*<Row className={'heading'}>*/}
                                {/*<Col span={8} className={'heading-text'}> For</Col>*/}
                                {/*<Col span={16} className={'politician-text'}> Canberra</Col>*/}
                            {/*</Row>*/}
                            {/*<Row className={'heading'}>*/}
                                {/*<Col span={8} className={'heading-text'}> Party</Col>*/}
                                {/*<Col span={16} className={'politician-text'}> Labour</Col>*/}
                            {/*</Row>*/}
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

    handleStoreChange = () => {
        this.setState({
            input: store.getState().politiciansFilter.input,
            party: store.getState().politiciansFilter.party,
            gender: store.getState().politiciansFilter.gender
        })
    };

    render() {

        console.log(store.getState().politiciansFilter)
        return (
            <div id={'cardList'}>

                {this.getCards()}

                <BackTop target={() => document.getElementById('cardList')}/>
            </div>
        )
    }

}
