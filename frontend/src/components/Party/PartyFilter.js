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
            input: "",
            order: "",

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
        },()=>{
            const action = {
                type: "UPDATE_PARTY_INPUT",
                value: this.state.input
            };
            store.dispatch(action)
        })
    }

    handlePartyChange = (e) => {
        // console.log(e)
        this.setState({
            order: e
        }, () => {
            const action = {
                type: "UPDATE_PARTY_ORDER",
                value: e
            };
            store.dispatch(action)
        })
    }

    handleSearch = () => {

    }

    render() {
        // console.log(this.state)
        const Search = Input.Search;
        const Option = Select.Option;
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        return (
            <div className={'filters'}>
                <div>Filter</div>
                <Search
                    placeholder="input politician's name"
                    onSearch={value => console.log(value)}
                    size="large"
                    className={'search'}
                    onChange={(e)=>this.handleInputChange(e)}
                />

                {/*<Select  className={'select'}*/}
                {/*size={'large'}*/}
                {/*placeholder="Select an order"*/}
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
                >
                    <Option value="popularity">Popularity</Option>
                    <Option value="posts">Total Number of Posts</Option>
                    <Option value="replies">Total Number of Replies</Option>
                    <Option value="followers">Total Number of Followers</Option>
                </Select>

                <div style={{paddingTop: 10}}>
                    <Button className={'filter_button'} type="primary">Reset</Button>
                </div>
            </div>
        );
    }

}
