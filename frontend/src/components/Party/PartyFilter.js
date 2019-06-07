import React, {Fragment} from 'react'
import './PartyFilter.css'
import {Card, Input, Select, Radio, Button} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import store from '../../store/index'
import RadioGroup from "antd/es/radio/group";


export default class PartyFilter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            input: store.getState().partyFilter.input,
            order: store.getState().partyFilter.order

        }
    }

    componentDidMount() {

    }

    // filter change
    handleInputChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    // filter change
    handleOrderChange = (e) => {
        this.setState({
            order: e
        })
    }

    // reset filter
    handleResetClick = () => {
        this.setState({
            input: "",

            order: 'popularity'
        },()=>{
            this.handleSearch()
        })
    }

    //search
    handleSearch = ()=>{
        const action = {
            type: "UPDATE_PARTY_FILTERING",
            value: {
                input:this.state.input,
                order:this.state.order
            }
        };
        store.dispatch(action)
    }


    render() {
        const Option = Select.Option;

        return (
            <div className={'filters'}>
                <div>Filter</div>
                <Input
                    placeholder="input party name"
                    value={this.state.input}
                    size="large"
                    className={'search'}
                    onChange={(e) => this.handleInputChange(e)}
                    allowClear={true}
                    onPressEnter={this.handleSearch}
                />


                <div>Sort by</div>
                <Select className={'select'}
                        size={'large'}
                        placeholder="Select an order"

                        value={this.state.order}
                        onChange={(e) => this.handleOrderChange(e)}
                >
                    <Option value="popularity">Sentiment Score</Option>
                    <Option value="posts">Total Number of Posts</Option>
                    <Option value="replies">Total Number of Mentions</Option>
                    <Option value="likes">Total Number of Likes</Option>
                </Select>

                <div style={{paddingTop: 10}}>

                    <Button className={'button'} type="primary" onClick={this.handleSearch}>Search</Button>
                    <Button className={'button'} type="primary" onClick={this.handleResetClick}>Reset</Button>
                </div>
            </div>
        );
    }

}
