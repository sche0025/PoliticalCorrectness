import React, {Fragment} from 'react'
import './PoliticianCard.css'
import {Card, BackTop} from 'antd'
import 'antd/dist/antd.css';


export default class PoliticianCard extends React.Component {


    componentDidMount() {

    }

    render() {
        return (
            <div>


                <div style={{background: '#ECECEC', padding: '30px'}} id={'cardList'}>


                    <Card title="Card title" bordered={false} className={'card'} loading={false}>

                    </Card>
                    <Card title="Card title" bordered={false} className={'card'} loading={false}>

                    </Card>
                    <Card title="Card title" bordered={false} className={'card'} loading={false}>

                    </Card>
                    <Card title="Card title" bordered={false} className={'card'} loading={false}>

                    </Card>
                    <Card title="Card title" bordered={false} className={'card'} loading={false}>

                    </Card>
                </div>
                <BackTop target={() => document.getElementById('cardList')}/>
            </div>
        )
    }

}
