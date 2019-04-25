import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './MapControl.css';
import logo from "../../assets/img/unimelbLogo.jpeg"
import {Table} from 'antd';

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';
import store from "../../store";

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class MapControl extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            constituency:''
        }
        store.subscribe(this.handleStoreChange);
    }


    handleStoreChange = () => {
        this.setState({
            constituency: store.getState().map.constituency
        })

    };

    getImg = (url) => {
        return <img className={"mapControl_img"} src={url}/>
    }

    displayConstituency = ()=>{
        return <div className={'map-table-header'}>
            {this.state.constituency}
        </div>
    }

    const
    columns = [
        {
            title: '#',

            render: (text, record, index) => `${index + 1}`,
            width: 10,
            // specify the condition of filtering result
            // here is that finding the name started with `value`

        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            width: 140,
        },
        {

            title: 'Name',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: 'Party',
            dataIndex: 'party',
            width: 100,
        },


        {
            title: 'Sentiment (pro/neu/con)%',
            dataIndex: 'sc',
            width: 100,
            sorter: (a, b) => a.sc - b.sc,
        }];

    var
    data = [{
        key: '1',
        name: 'Scott Morrison',
        age: 32,
        tweetsCount: 2,
        party: 'labor',
        tt: 62,
        tr: 38,
        sc: "61/10/29" ,
        avatar: this.getImg('https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png')
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        tweetsCount: 33,
        party: 'labor3'
        ,
        tt: 61,
        tr: 86,
        sc: "43/17/40" ,
        avatar: this.getImg('https://pbs.twimg.com/profile_images/1035037345588731909/i-QmXEp3_400x400.jpg')

    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        tweetsCount: 41,
        party: 'labor2'
        ,
        tt: 63,
        tr: 84,
        sc: "66/10/11" ,
        avatar: this.getImg('https://pbs.twimg.com/profile_images/645213958861811712/VHhqGqrQ_200x200.jpg')
    }, {
        key: '4',
        name: 'Jim Red',
        age: 32,
        tweetsCount: 35,
        party: 'labor1'
        ,
        tt: 69,
        tr: 85,
        sc: "33/30/34" ,
        avatar: this.getImg('https://pbs.twimg.com/profile_images/847583509757558784/V1l1tu2V_400x400.jpg')
    },
        {
            key: '5',
            name: 'Jim Red',
            age: 32,
            tweetsCount: 55,
            party: 'labor1'
            ,
            tt: 66,
            tr: 83,
            sc: "79/10/11" ,
            avatar: this.getImg('https://pbs.twimg.com/profile_images/750130479714545664/UZWiTi6v_400x400.jpg')
        },
        {
            key: '5',
            name: 'Jim Red',
            age: 32,
            tweetsCount: 55,
            party: 'labor1'
            ,
            tt: 66,
            tr: 83,
            sc: "79/10/11" ,
            avatar: this.getImg('https://pbs.twimg.com/profile_images/750130479714545664/UZWiTi6v_400x400.jpg')
        },
        {
            key: '5',
            name: 'Jim Red',
            age: 32,
            tweetsCount: 55,
            party: 'labor1'
            ,
            tt: 66,
            tr: 83,
            sc: "79/10/11" ,
            avatar: this.getImg('https://pbs.twimg.com/profile_images/750130479714545664/UZWiTi6v_400x400.jpg')
        },
        {
            key: '7',
            name: 'Jim Red',
            age: 32,
            tweetsCount: 55,
            party: 'labor1'
            ,
            tt: 66,
            tr: 83,
            sc: "79/10/11" ,
            avatar: this.getImg('https://pbs.twimg.com/profile_images/750130479714545664/UZWiTi6v_400x400.jpg')
        }
        ];

    render() {

        console.log(this.state.constituency)
        return (
            <div className={'map-control'}>
                <Row className={'map-heading'}>Please click the electorate to see the candidates</Row>
                <Row className={'mapControl-candidate'}>
                    <Table
                        pagination={false}
                        columns={this.columns}
                        dataSource={this.data}
                        bordered={true}
                        title={() => this.displayConstituency()} showHeader={true}
                    />
                </Row>
            </div>

        );
    }
}


