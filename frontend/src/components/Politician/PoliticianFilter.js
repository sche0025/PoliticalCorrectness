import React, {Fragment} from 'react'
import './PoliticianFilter.css'
import {Card, Input, Select, Radio, Button} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import store from '../../store/index'
import RadioGroup from "antd/es/radio/group";


export default class PoliticianFilter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            input: store.getState().politiciansFilter.input,
            party: store.getState().politiciansFilter.party,
            order: store.getState().politiciansFilter.order
        }
    }

    componentDidMount() {

    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }


    handleInputChange = (e) => {
        this.setState({
            input: e.target.value
        })

        // const action = {
        //     type: "UPDATE_POLITICIAN_INPUT",
        //     value: e.target.value
        // };
        // store.dispatch(action)
    }

    handlePartyChange = (e) => {
        // console.log(e)
        this.setState({
            party: e.target.value
        })

        // const action = {
        //     type: "UPDATE_POLITICIAN_PARTY",
        //     value: e
        // };
        // store.dispatch(action)
    }

    handleOrderChange = (e) => {
        this.setState({
            order: e
        })

        // const action = {
        //     type: "UPDATE_POLITICIAN_ORDER",
        //     value: e
        // };
        // store.dispatch(action)
    }

    handleResetClick = () => {
        this.setState({
            input: "",
            party: "",
            order: 'popularity'
        },()=>{
            this.handleSearch()
        })
    }

    handleSearch = ()=>{
        const action = {
            type: "UPDATE_POLITICIAN_FILTERING",
            value: {
                input:this.state.input,
                party:this.state.party,
                order:this.state.order
            }
        };
        store.dispatch(action)
    }

    render() {

        const Search = Input.Search;
        const Option = Select.Option;
        // const RadioButton = Radio.Button;
        // const RadioGroup = Radio.Group;
        return (
            <div className={'filters'}>
                <div>Filters</div>
                {/*<Search*/}
                {/*placeholder="input politician's name"*/}
                {/*enterButton="Search"*/}
                {/*size="large"*/}
                {/*onSearch={this.handleSearch}*/}
                {/*className={'search'}*/}
                {/*onChange={(e)=>this.handleInputChange(e)}*/}
                {/*/>*/}

                <Input
                    placeholder="input politician name"
                    value={this.state.input}
                    size="large"
                    className={'search'}
                    onChange={(e) => this.handleInputChange(e)}
                    allowClear={true}
                    onPressEnter={this.handleSearch}
                />

                <Input
                    placeholder="input party name"
                    value={this.state.party}
                    size="large"
                    className={'search'}
                    onChange={(e) => this.handlePartyChange(e)}
                    allowClear={true}
                    onPressEnter={this.handleSearch}
                />

                {/*<Select className={'select'}*/}
                        {/*size={'large'}*/}
                        {/*value={this.state.party}*/}
                        {/*onChange={(e) => this.handlePartyChange(e)}*/}
                {/*>*/}
                    {/*<Option value="all">All</Option>*/}
                    {/*<Option value="ag">Australian Greens</Option>*/}
                    {/*<Option value="alp">Australian Labor Party</Option>*/}
                    {/*<Option value="ca">Centre Alliance</Option>*/}
                    {/*<Option value="i">Independent</Option>*/}
                    {/*<Option value="kap">Katter's Australian Party</Option>*/}
                    {/*<Option value="lpa">Liberal Party of Australia</Option>*/}
                    {/*<Option value="tn">The Nationals</Option>*/}
                {/*</Select>*/}

                <div>Sort by</div>
                <Select className={'select'}
                        size={'large'}
                        placeholder="Select an order"
                    // defaultValue={'popularity'}
                        value={this.state.order}
                        onChange={(e) => this.handleOrderChange(e)}
                >
                    <Option value="popularity">Sentiment Score</Option>
                    <Option value="posts">Total Number of Posts</Option>
                    <Option value="replies">Total Number of Replies</Option>
                    <Option value="likes">Total Number of Likes</Option>
                </Select>

                <div style={{paddingTop: 10}}>
                    {/*<RadioGroup style={{display: 'inline'}} defaultValue="a" size="large" className={'radio-group'}>*/}
                    {/*<RadioButton value="a">All</RadioButton>*/}
                    {/*<RadioButton value="m">Male</RadioButton>*/}
                    {/*<RadioButton value="f">Female</RadioButton>*/}
                    {/*</RadioGroup>*/}
                    <Button className={'button'} type="primary" onClick={this.handleSearch}>Search</Button>
                    <Button className={'button'} type="primary" onClick={this.handleResetClick}>Reset</Button>
                </div>
            </div>
        );
    }

}
