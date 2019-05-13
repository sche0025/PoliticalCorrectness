import React, {Fragment} from 'react'
import './Datepicker.css'
import {DatePicker,Tooltip,Button} from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css';
import config from '../../config'
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
        })
    }

    handleDateSubmit = ()=>{
        this.props.changeDate(this.state.date)
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
                        allowClear={false}
                        defaultValue={moment()}
                        format={config.dateFormat}
                        disabledDate={this.disabledDate}
                        onChange={this.handleDateChange}
                    />

                <Tooltip title="Select a date to see historical data" placement="right">
                    <Button type={'primary'} onClick={this.handleDateSubmit}><Icon type={"search"}/></Button>
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