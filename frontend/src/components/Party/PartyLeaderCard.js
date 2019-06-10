import React, {Fragment} from 'react';
import 'antd/dist/antd.css';
import './PartyLeaderCard.css'

import {
 Card
} from 'antd';


export default class PartyLeaderCard extends React.Component {


    getRank = (key)=>{
        switch (key) {
            case 0:
                return "1ST"
            case 1:
                return "2ND"
            case 2:
                return "3RD"
            default:
                return ""
        }
    }
    render() {

        return (

            <Fragment>
                <Card
                    title={<div style={{textAlign: "center"}}>
                        {this.getRank(this.props.myKey)}
                    </div>}
                    className={'party-avatar'}
                    cover={
                        <img
                            className={"party-top-avatar"}
                        alt="example"
                        src={this.props.img}
                    />
                    }
                    bordered={true}
                >
                    <div className={"text-center"}>{this.props.name} <span style={{paddingLeft:"20px"}}>{this.props.sc}</span></div>
                </Card>

            </Fragment>
        );
    }
}


