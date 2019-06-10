import React, {Fragment} from 'react'
import './Datepicker.css'
import {DatePicker,Tooltip,Button,message} from 'antd'
import moment from 'moment'
import config from '../../config'
import 'antd/dist/antd.css';

import store from "../../store";
import {changeDate} from "../../actions/actions";
import connect from "react-redux/es/connect/connect";
import Icon from "antd/es/icon";

class Datepicker extends React.Component {


    constructor(props) {
        super(props)
        this.state={
            date:store.getState().date
        }
    }

    handleDateChange = (value)=>{

        this.setState({
            date:moment(value).format(config.dateFormat)
        },()=>{
            message.success("Date updated, now you are viewing the data from "+this.state.date)
            this.props.changeDate(this.state.date)
        })
    }

    disabledDate=(disabledDate) =>{
        return disabledDate && (disabledDate < moment(config.dataStartingDate) || disabledDate > moment(config.dataEndingDate));
    }

    render() {
        return (
            <div className={'datepicker'}>
                <Tooltip title="Select a date to see historical data" placement="right">
                    <DatePicker
                        allowClear={false}
                        defaultValue={moment(config.dataEndingDate)}
                        format={config.dateFormat}
                        disabledDate={this.disabledDate}
                        onChange={this.handleDateChange}
                        showToday={false}
                    />
                </Tooltip>

            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {

    return {
        changeDate: (date) => dispatch(changeDate(date))
    }
};

export default connect(null, mapDispatchToProps)(Datepicker)