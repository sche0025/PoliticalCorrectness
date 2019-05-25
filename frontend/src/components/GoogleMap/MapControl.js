import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './MapControl.css';
import logo from "../../assets/img/unimelbLogo.jpeg"
import {Table, Tooltip} from 'antd';

import {
    Layout, Menu, Breadcrumb, Icon, Row, Col
} from 'antd';
import store from "../../store";
import {calculateSentimentScore} from "../../utils/utils";

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class MapControl extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            constituency:'',
            data:[]
        }
        store.subscribe(this.handleStoreChange);
    }


    handleStoreChange = () => {
        this.setState({
            constituency: store.getState().map.constituency
        })

    };

    componentDidMount() {
        // console.log(this.props.data)
        this.setState(
            {
                data: this.props.data
            }
        );
    }

    componentWillReceiveProps(nextProps) {

        this.setState(
            {
                data: nextProps.data
            }
        );
    }

    getImg = (url) => {
        return <img className={"mapControl_img"} src={url}/>
    }

    displayConstituency = ()=>{
        return <div className={'map-table-header'}>
            {this.state.constituency}
        </div>
    }

    stripName = (name)=>{
        var words = name.split(" ")
       var  displayedName = ""
        for(var i =0;i<words.length &&i< 2;i++){
            displayedName= displayedName +" " +words[i]
        }
        return displayedName
    }

    getData = () => {
        const data = [];

        // console.log(this.state.data)
        var oriData = this.state.data
        if(oriData){
            oriData.map((politician)=>{
                if(politician.Electoral_District.toLowerCase() == this.state.constituency.toLowerCase()){
                data.push({
                    key:politician.ID,
                    name:<Tooltip title={politician.Name}>
                        <a style={{
                             textOverflow: "ellipsis", maxWidth: "75ch",maxHeight:"75ch"
                            , overflow: "hidden"
                        }}>{this.stripName(politician.Name)}</a>
                    </Tooltip>
                    ,
                    avatar:this.getImg(politician.Avatar),
                    party:politician.Party,
                    sc:calculateSentimentScore(politician)
                })
                }
            })
        }

        // for (let i = 0; i < oriData.length; i++) {
        //     data.push({
        //         key: oriData.ID,
        //         name: oriData[i].Name,
        //         // age: oriData[i].age,
        //         // tweetsCount: oriData[i].tweetsCount,
        //         party: oriData[i].Party,
        //         tt: oriData[i].Total_Tweets,
        //         tr: oriData[i].Reply_Count,
        //         sc: calculateSentimentScore(oriData[i]),
        //         avatar: this.getImg(oriData[i].Avatar)
        //     });
        // }

        return data
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
            width: 100,
        },
        {

            title: 'Name',
            dataIndex: 'name',
            width: 20,
        },
        {
            title: 'Party',
            dataIndex: 'party',
            width: 100,
        },


        {
            title: <div>Sentiment Score
                <Tooltip title={"This is calculated by: Number of unique supporters * 1 " +
                "+ Number of unique neutrals * 0.1 " +
                "- Number of unique dissenters * 0.5"}>
                    <Icon style={{paddingLeft:"3px"}} type="question-circle"/>
                </Tooltip>
            </div>,
            dataIndex: 'sc',
            width: 100,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.sc - b.sc,
        }];



    render() {
        var data = this.getData();
        console.log(this.state.constituency)
        return (
            <div className={'map-control'}>
                <Row className={'map-heading'}>Please click the electorate to see the candidates</Row>
                <Row className={'mapControl-candidate'}>
                    <Table
                        pagination={false}
                        columns={this.columns}
                        dataSource={data}
                        bordered={true}
                        title={() => this.displayConstituency()} showHeader={true}
                    />
                </Row>
            </div>

        );
    }
}


