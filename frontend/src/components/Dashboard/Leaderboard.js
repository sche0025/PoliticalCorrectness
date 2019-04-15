import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './Leaderboard.css'
import {Table, Divider, Tag} from 'antd';

export default class Leaderboard extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    getImg = (url) => {
        return <img className={"leaderboard_img"} src={url}/>
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
            title: 'Total Replies',
            dataIndex: 'tr',
            width: 100,
            defaultSortOrder: 'descend',

            sorter: (a, b) => a.tr - b.tr,
        },
        {
            title: 'Sentiment Score',
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
        sc: 116,
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
        sc: 181,
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
        sc: 171,
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
        sc: 161,
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
            sc: 116,
            avatar: this.getImg('https://pbs.twimg.com/profile_images/750130479714545664/UZWiTi6v_400x400.jpg')
        }];

    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.data} pagination={false}
                       className={'table'} bordered={true}
                       title={() => 'Leaderboard'} showHeader={true}
                />
            </div>
        );
    }
}




