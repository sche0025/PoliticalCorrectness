import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import store from './store'
import oriGeoJsonList from './utils/GeojsonReader'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const geoJsonList = oriGeoJsonList
export default geoJsonList
ReactDOM.render(

    <Provider store={store}>
<BrowserRouter>
         {/*<Provider {...store}>*/}
        <App/>
      {/*</Provider>*/}
</BrowserRouter>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
