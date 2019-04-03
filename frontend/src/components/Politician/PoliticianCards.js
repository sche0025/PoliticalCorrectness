import React, {Fragment} from 'react'
import './PoliticianCard.css'
import {Card, BackTop} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";


export default class PoliticianCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            politicians: []
        };
    }

    componentDidMount() {

    }


    getCards = () => {

        var testList = [1, 2, 3,4,5]


        return testList.map(politician => (
            // console.log('1')
           <Card
                title={politician}
                bordered={false}

                loading={false}
                className={'card'}

           >
               <Row  >
                   <Col span={6} >
                       <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                       style={{width:'95%',height:'20vh'}}
                       />

                   </Col>
                   <Col span={18}>col-6</Col>

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
