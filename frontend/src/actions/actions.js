import {getPoliticiansDataFromBackend} from "../utils/api";
import {message} from "antd";

export const changeDate = (date) => {
    return (dispatch, getState) => {

        dispatch({ type: "CHANGE_DATE",value:date })

    }
}

// export const getPoliticiansData = (date,me) => {
//
//     return (dispatch, getState) => {
//
//         getPoliticiansDataFromBackend(date).then((response) => {
//             console.log('actions',response)
//             dispatch({ type: "GET_POLITICIAN_DATA_SUCCESS",value:response });
//             me.setState({
//                 data:response
//             })
//         }).catch((err) => {
//             message.error("Error in getPoliticiansDataFromBackend");
//             // dispatch({ type: GET_ALL_STAFF_FAIL, err });
//         });
//
//     }
// }