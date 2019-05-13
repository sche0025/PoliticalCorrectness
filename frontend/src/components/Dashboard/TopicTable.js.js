import React, {Fragment} from 'react'
import {Table, Spin,Tooltip} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import store from '../../store/index'
import RadioGroup from "antd/es/radio/group";
import {getLeaderboardData, getTopicTableData} from "../../utils/api";


export default class TopicTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSpinning: true,
            data:[]
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
        console.log("topicTable data loaded")
    }

    componentWillReceiveProps(nextProps) {
        var me = this
        // console.log(nextProps.date)
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


                console.log("topicTable data loaded")

            }
        );
    }

    getData = ()=>{
        // console.log(this.state.data)
        var myData = []

        if(this.state.data.p_tag && this.state.data.p_tag){
            for(var i =0;i<this.state.data.p_tag.length-1;i++){
                var newCol = {
                    key:i,
                    p_tag: <Tooltip title={this.state.data.p_tag[i][1]}>
                        <a style={{
                        whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "120px"
                        , overflow: "hidden"
                    }}>{this.state.data.p_tag[i][0]}</a>
                    </Tooltip>,
                    u_tag:<Tooltip title={this.state.data.u_tag[i][1]}>
                        <a style={{
                            whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "120px"
                            , overflow: "hidden"
                        }}>{this.state.data.u_tag[i][0]}</a>
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
                // render: text => <a href="javascript:;">{text}</a>,
            }, {
                title: 'Topics of Politicians',
                dataIndex: 'u_tag',
            }];



        console.log(this.getData())

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
