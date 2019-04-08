import React, {Component} from 'react';
import logo from './logo.svg';
import {Route, Switch} from 'react-router-dom'
import Login from './routes/Login/index'
import Home from './routes/Home/index'
import Map from './routes/Map/index'
import Dashboard from './routes/Dashboard/index'
import Politician from './routes/Politician/index'
import About from './routes/About/index'
import Test from './components/Test/index'
import './App.css';
import './assets/font/iconfont.css'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/login' component={Login}/>


                <Route path='/home/' render={() =>
                    <Home>
                        <Route path='/home/map' component={Map}/>
                        <Route path='/home/dashboard' component={Dashboard}/>
                        <Route path='/home/politician' component={Politician}/>
                        <Route path='/home/about' component={About}/>
                        <Route path='/home/test' component={Test}/>
                        <Route exact path='/home' component={Dashboard}/>
                    </Home>
                }/>
            </Switch>
        );
    }
}

export default App;
