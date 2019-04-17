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
        this.state={
            input:"",
            party:"all",
            gender:'all'
        }
    }

    componentDidMount() {

    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    handleInputChange = (e) =>{
        this.setState({
            input:e.target.value
        })
    }

    handlePartyChange = (e) =>{
        // console.log(e)
        this.setState({
            party:e
        },()=>{
            const action = {
                type: "UPDATE_PARTY",
                value: e
            };
            store.dispatch(action)
        })
    }

    handleSearch = ()=>{
        const action = {
            type: "UPDATE_INPUT",
            value: this.state.input
        };
        store.dispatch(action)
    }

    render() {
        // console.log(this.state)
        const Search = Input.Search;
        const Option = Select.Option;
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        return (
            <div className={'filters'}>
                <Search
                    placeholder="input politician's name"
                    enterButton="Search"
                    size="large"
                    onSearch={this.handleSearch}
                    className={'search'}
                    onChange={(e)=>this.handleInputChange(e)}
                />

                <Select defaultValue="0" className={'select'} onChange={this.handleChange}
                        size={'large'}
                        defaultValue={'all'}
                        onChange={(e)=>this.handlePartyChange(e)}
                >
                    <Option value="all">All</Option>
                    <Option value="ag">Australian Greens</Option>
                    <Option value="alp">Australian Labor Party</Option>
                    <Option value="ca">Centre Alliance</Option>
                    <Option value="i">Independent</Option>
                    <Option value="kap">Katter's Australian Party</Option>
                    <Option value="lpa">Liberal Party of Australia</Option>
                    <Option value="tn">The Nationals</Option>
                </Select>

                <div style={{paddingTop: 10}}>
                    <RadioGroup style={{display: 'inline'}} defaultValue="a" size="large" className={'radio-group'}>
                        <RadioButton value="a">All</RadioButton>
                        <RadioButton value="m">Male</RadioButton>
                        <RadioButton value="f">Female</RadioButton>
                    </RadioGroup>

                    <Button className={'button'} type="primary">Reset</Button>
                </div>
            </div>
        );
    }

}
