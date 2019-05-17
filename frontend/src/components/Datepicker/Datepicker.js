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

        // this.props.changeDate(moment(value).format(config.dateFormat))
        this.setState({
            date:moment(value).format(config.dateFormat)
        },()=>{
            message.success("Date updated, now you are viewing the data from "+this.state.date)
            this.props.changeDate(this.state.date)
        })
    }

    handleDateSubmit = ()=>{
        this.props.changeDate(this.state.date)
    }


    disabledDate=(disabledDate) =>{
        // Can not select days before today and today
        return disabledDate && (disabledDate < moment(config.dataStartingDate) || disabledDate > moment().subtract(1,"days"));
        // moment(config.dataStartingDate).format('MMMM Do YYYY')
    }

    render() {

        // console.log()
        // console.log(store.getState());
        return (
            <div className={'datepicker'}>

                <Tooltip title="Select a date to see historical data" placement="right">
                    <DatePicker
                        allowClear={false}
                        defaultValue={moment().subtract(1,"days")}
                        format={config.dateFormat}
                        disabledDate={this.disabledDate}
                        onChange={this.handleDateChange}
                        showToday={false}
                    />
                </Tooltip>
                {/*<Tooltip title="Select a date to see historical data" placement="right">*/}
                    {/*<Button type={'primary'} onClick={this.handleDateSubmit}><Icon type={"search"}/></Button>*/}
                {/*</Tooltip>*/}

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