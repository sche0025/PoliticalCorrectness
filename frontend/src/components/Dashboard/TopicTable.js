import React, {Fragment} from 'react'
import {Table, Spin, Tooltip} from 'antd'
import 'antd/dist/antd.css';
import "./TopicTable.css"
import {getTopicTableData} from "../../utils/api";


export default class TopicTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSpinning: true,
            data: []
        }
    }

    componentDidMount() {
        var me = this
        getTopicTableData(this.props.date).then((data) => {
            me.setState({
                data: data,
                isSpinning: false
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        var me = this

        this.setState(
            {
                date: nextProps.date,
                isSpinning: true
            },
            () => {
                getTopicTableData(this.state.date).then((data) => {
                    console.log(data)
                    me.setState({
                        data: data,
                        isSpinning: false
                    })
                })


            }
        );
    }

    getData = () => {

        var myData = []

        if (this.state.data.p_tag && this.state.data.p_tag) {
            var limit = 0
            if(this.state.data.p_tag.length>5){
                limit =1
            }else {
                limit = 0
            }
            for (var i = 0; i < this.state.data.p_tag.length - limit; i++) {

                var newCol = {
                    key: i,
                    p_tag: <Tooltip title={
                        <Fragment>
                            <span>{this.state.data.p_tag[i][0]+": "}</span>
                            <span>{this.state.data.p_tag[i][1]}</span>
                        </Fragment>
                    }>
                        <div className={"hashTag"}>{this.state.data.p_tag[i][0]}</div>
                    </Tooltip>,
                    u_tag: <Tooltip title={
                        <Fragment>
                            <span>{this.state.data.u_tag[i][0]+": "}</span>
                            <span>{this.state.data.u_tag[i][1]}</span>
                        </Fragment>
                    }>
                        <div className={"hashTag"}>{this.state.data.u_tag[i][0]}</div>
                    </Tooltip>
                }
                myData.push(newCol)
            }
        }

        return myData
    }

    render() {
        const columns = [
            {
                title: '#',
                render: (text, record, index) => `${index + 1}`,
                width: 10,
            },
            {
                title: 'Topics of Politicians',
                dataIndex: 'p_tag',

            }, {
                title: 'Topics of Netizens',
                dataIndex: 'u_tag',
            }];


        return (
            <Fragment>
                <Spin spinning={this.state.isSpinning}>
                    <Table columns={columns} dataSource={this.getData()} pagination={false}
                           size={"small"} title={() => <div> Trending Topics</div>} showHeader={true}

                    />
                </Spin>
            </Fragment>
        );
    }

}
