import React from 'react'
import Bar from './script'
import axios from 'axios'
import {Button} from "antd";


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

        return (
            <div>
                <h2>Bar Example (custom size)</h2>
                <Bar/>
                <Button loading={this.state.isLoading} onClick={this.postTest}> Test 1</Button>
                <Button onClick={this.postT}> Test 2</Button>
                <Button  onClick={this.postTestt}> Test 3</Button>
                <Button  onClick={this.mapReduce}> MapReduce</Button>
            </div>
        )
    }
}

