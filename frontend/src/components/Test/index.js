import React from 'react'
import Bar from './script'
import axios from 'axios'
import {Button} from "antd";
import { Table } from 'antd';

export default class Test extends React.Component {

    state = {
        isLoading:false
    }

    componentDidMount() {
        // axios.get('/api/customer/find')
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        //
        // axios.get('/api/tweets/find')
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }

    postTest = () => {
        var me = this
        this.setState({
            isLoading:true
        })
        // axios.post('/api/customer/insert', {
        //     name: 'testpost',
        //     age: 99
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });



        axios.get('/api/tweets/find')
            .then(function (response) {
                console.log(response);
                me.setState({
                    isLoading:false
                })

                var tweets = response.data
            for(var i =0;i<tweets.length;i++){
                console.log(tweets[i].ID,tweets[i].Reply_Content.Re_Content)
            }

            })
            .catch(function (error) {
                console.log(error);
            });


    }

    postTestt = () => {
        axios.post('/api/tweets/insert', {
            name: 'testpost',
            age: 99
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });



    }


    postT = () => {
        // axios.post('/api/customer/insert', {
        //     name: 'testpost',
        //     age: 99
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });



        axios.get('/api/customer/find')
            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    mapReduce = () =>{
        axios.get('/api/tweets/mapreduce')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            width: 150,
        }, {
            title: 'Age',
            dataIndex: 'age',
            width: 150,
        }, {
            title: 'Address',
            dataIndex: 'address',
        }];

        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`,
            });
        }
        return (
            <div>
                <h2>Bar Example (custom size)</h2>
                <Bar/>
                <Button loading={this.state.isLoading} onClick={this.postTest}> Test 1</Button>
                <Button onClick={this.postT}> Test 2</Button>
                <Button  onClick={this.postTestt}> Test 3</Button>
                <Button  onClick={this.mapReduce}> MapReduce</Button>
                <div>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />

                </div>
            </div>
        )
    }
}

