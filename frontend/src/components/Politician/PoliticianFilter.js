import React, {Fragment} from 'react'
import './PoliticianFilter.css'
import {Card, Input, Select, Radio, Button} from 'antd'
import 'antd/dist/antd.css';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import RadioGroup from "antd/es/radio/group";


export default class PoliticianFilter extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    render() {
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
                    onSearch={value => console.log(value)}
                    className={'search'}
                />

                <Select defaultValue="0" className={'select'} onChange={this.handleChange}
                        size={'large'}
                >
                    <Option value="0">All</Option>
                    <Option value="1">Australian Greens</Option>
                    <Option value="2">Australian Labor Party</Option>
                    <Option value="3">Centre Alliance</Option>
                    <Option value="4">Independent</Option>
                    <Option value="5">Katter's Australian Party</Option>
                    <Option value="6">Liberal Party of Australia</Option>
                    <Option value="7">The Nationals</Option>
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
