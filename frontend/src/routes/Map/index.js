import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import logo from "../../assets/img/unimelbLogo.jpeg"
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import MapControl from '../../components/GoogleMap/MapControl'

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';
import store from "../../store";
import {getPoliticiansData} from "../../utils/api";

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class Map extends React.Component {

    constructor(props){
        super(props)
        this.state={
            date:store.getState().date,
            data:[]
        }

        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange = () => {
        //
        // console.log(this.state.input == store.getState().politiciansFilter.input )
        // console.log(  this.state.party == store.getState().politiciansFilter.party )
        // console.log(    this.state.order == store.getState().politiciansFilter.order)
        // console.log(    this.state.order , store.getState().politiciansFilter.order)

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
                console.log("map-politicians data loaded")


            })
        }
        console.log("I should be later")




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
                    ,minWidth:'1150px'
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


