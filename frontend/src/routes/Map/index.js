import React, {Fragment} from 'react';
import 'antd/dist/antd.css';
import './style.css';
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import MapControl from '../../components/GoogleMap/MapControl'
import {
Breadcrumb, Row, Col
} from 'antd';
import store from "../../store";
import {getPoliticiansData} from "../../utils/api";

export default class Map extends React.Component {

    constructor(props){
        super(props)
        this.state={
            date:store.getState().date,
            data:[]
        }

        store.subscribe(this.handleStoreChange);
    }

    //handle date change
    handleStoreChange = () => {
        if (store.getState().date != this.state.date) {
            this.setState({
                date: store.getState().date,

            }, () => {
                var me = this
                getPoliticiansData(this.state.date).then((data) => {
                    me.setState({
                        data: data,
                    })
                })


            })
        }
    };

    componentDidMount() {
        var me = this
        getPoliticiansData(this.state.date).then((data) => {
            me.setState({
                data: data,
            })
        })
    }

    render() {
        return (

            <Fragment>

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Map</Breadcrumb.Item>
                </Breadcrumb>

                <div style={{background: '#fff',width:'auto'
                    ,minWidth:'1300px'
                }}>
                    <div style={{padding: "15px"}}>
                        <Row>
                            <Col span={14}> <GoogleMap data={this.state.data}/> </Col>
                            <Col span={10}> <MapControl  data={this.state.data}/></Col>
                        </Row>
                    </div>
                </div>
            </Fragment>

        );
    }
}


