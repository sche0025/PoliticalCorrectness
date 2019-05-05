import React, {Fragment} from 'react'
import {Table} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import store from '../../store/index'
import RadioGroup from "antd/es/radio/group";



export default class TopicTable extends React.Component {

    constructor(props) {
        super(props)
        this.state={

        }
    }

    componentDidMount() {

    }



    render() {
        const columns = [
            {
            title: '#',
            render: (text, record, index) => `${index + 1}`,
            width: 10,
            // specify the condition of filtering result
            // here is that finding the name started with `value`

        },{
            title: 'Topic',
            dataIndex: 'topic',
            render: text => <a href="javascript:;">{text}</a>,
        },  {
            title: 'Popularity',
            dataIndex: 'popularity',
        }];

        const data = [{
            key: '1',
            topic: 'John Brown',

            popularity: 33,
        }, {
            key: '2',
            topic: 'Jim Green',

            popularity: 666,
        }, {
            key: '3',
            topic: 'Joe Black',

            popularity: 44,
        }, {
            key: '4',
            topic: 'Disabled User',

            popularity: 33,
        }
            , {
                key: '4',
                topic: 'Disabled User',

                popularity: 111,
            }];

        return (
           <Fragment>
               <Table columns={columns} dataSource={data} pagination={false}
                      size={"small"}  title={() => 'Trending Topics'} showHeader={true}

               />

           </Fragment>
        );
    }

}
