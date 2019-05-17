import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './Leaderboard.css'
import {Table, Divider, Tag} from 'antd';
import Spin from "antd/es/spin";
import {getLeaderboardData} from "../../utils/api";
import Icon from "antd/es/icon";
import Tooltip from "antd/es/tooltip";
import {calculateReplyCount, calculateSentimentScore} from "../../utils/utils";

export default class Leaderboard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLeaderboardSpinning: true,
            data: [],
            date: this.props.date
        }
    }

    getImg = (url) => {
        return <img className={"leaderboard_img"} src={url}/>
    }


    componentDidMount() {
        var me = this
        getLeaderboardData(this.state.date).then((data) => {
            me.setState({
                data: data,
                isLeaderboardSpinning: false
            })
        })
        console.log("leaderboard data loaded")
        //    .then(()=>{
        //     this.setState({
        //         isLeaderboardSpinning:false
        //     })
        // })
    }

    componentWillReceiveProps(nextProps) {
        var me = this
        this.setState(
            {date: nextProps.date},
            () => {
                getLeaderboardData(this.state.date).then((data) => {
                    me.setState({
                        data: data,
                        isLeaderboardSpinning: false
                    })
                })
                console.log("leaderboard data loaded")
                console.log(this.state.data)
            }
        );
    }



    getData = () => {
        const data = [];
        var oriData = this.state.data
        for (let i = 0; i < oriData.length; i++) {
            data.push({
                key: oriData.ID,
                name: oriData[i].Name,
                // age: oriData[i].age,
                // tweetsCount: oriData[i].tweetsCount,
                party: oriData[i].Party,
                tt: oriData[i].Tweets_Count,
                tr: calculateReplyCount(oriData[i]),
                sc: calculateSentimentScore(oriData[i]),
                avatar: this.getImg(oriData[i].Avatar)
            });
        }

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
            title: 'Total Tweets',
            dataIndex: 'tt',
            width: 100,

            sorter: (a, b) => a.tt - b.tt,
        },
        {
            title: 'Virtual Votes Received',
            dataIndex: 'tr',
            width: 100,


            sorter: (a, b) => a.tr - b.tr,
        },
        {
            title: <div>Sentiment Score
                <Tooltip title={"This is calculated by: Positive_Comment * 1 + Neutral_Comment * 0.1 - Negative_Comment*0.5"}>
                    <Icon style={{paddingLeft:"3px"}} type="question-circle"/>
                </Tooltip>
            </div>,
            dataIndex: 'sc',
            width: 100,
            defaultSortOrder: 'descend',

            sorter: (a, b) => a.sc - b.sc,
        }];


    render() {
        var data = this.getData()
        // console.log("leaderboard rendered")
        return (
            <div style={{minWidth: '750px', height: 'auto'}}>
                {/*<div> {this.state.date}</div>*/}
                <Spin tip="Loading..." spinning={this.state.isLeaderboardSpinning}>
                    <Table columns={this.columns} dataSource={data} pagination={false}
                           className={'table'}
                           bordered={true}
                           title={() => <div> Leaderboard</div>} showHeader={true}
                    />
                </Spin>
            </div>
        );
    }
}




