import React, {Fragment} from 'react'
import './Datepicker.css'
import {DatePicker} from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css';
import config from '../../config'
import store from "../../store";

export default class Datepicker extends React.Component {


    constructor(props) {
        super(props)
        this.state={

        }
    }

    handleDateChange = (value)=>{
        var action = {
            type:'CHANGE_DATE',
            value:value
        }

        store.dispatch(action);
    }


    disabledDate=(disabledDate) =>{
        // Can not select days before today and today
        return disabledDate && (disabledDate < moment(config.dataStartingDate) || disabledDate > moment());
        // moment(config.dataStartingDate).format('MMMM Do YYYY')
    }

    render() {
        // console.log(moment().format(config.dateFormat))
        console.log(store.getState());
        return (
            <div className={'datepicker'}>
                <DatePicker
                    defaultValue={moment()}
                    format={config.dateFormat}
                    disabledDate={this.disabledDate}
                    onChange={this.handleDateChange}
                />
            </div>
        );
    }

}
