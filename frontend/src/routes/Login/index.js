import React from 'react'
import {Form, Input ,message} from 'antd'
import './style.css'
import Loading2 from '../../components/Loading2'
import {preloadingImages} from '../../utils/utils'
import 'animate.css'
const url = 'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg1.jpg?raw=true'
const imgs = [
    'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/slide1.jpg?raw=true',
    'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/slide2.jpg?raw=true',
    'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/slide3.jpg?raw=true',
    'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/slide4.jpg?raw=true'
]

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showBox: 'login',
            url: '',
            loading: false,
            loading2: false,
            account:"",
            password:""
        }
    }

    componentDidMount() {
        const isLogin = this.props.appStore
        if (isLogin) {
            this.props.history.go(1)

        }
        this.initPage()
        preloadingImages(imgs)
    }

    initPage = () => {
        this.setState({
            loading: true
        })
        this.loadImageAsync(url).then(url => {
            this.setState({
                loading: false,
                url
            })
        })
    }

    //submit
    loginSubmit = () => {

        if(this.state.password=='admin' &&this.state.account=='admin'){
            message.success('Login successfully.')
            localStorage.setItem("isLoggedIn",'true');
            this.props.history.push("/home/dashboard")
        }else {
            return  message.error('Sorry, invalid combination, please try again.')
        }
    }

    handleAccountChange = (e)=>{

        this.setState({
            account:e.target.value
        })
    }

    handlePasswordChange = (e) =>{
     this.setState({
         password:e.target.value
     })
    }

    //preload img
    loadImageAsync(url) {
        return new Promise(function (resolve, reject) {
            const image = new Image();
            image.onload = function () {
                resolve(url);
            };
            image.onerror = function () {
                console.log('error')
            };
            image.src = url;
        });
    }

    render() {
        const { loading} = this.state
        return (
            <div id='login-page'>
                {
                    loading ?
                        <div>
                            <h3 style={styles.loadingTitle} className='animated bounceInLeft'>loading...</h3>
                            <Loading2/>
                        </div> :
                        <div>
                            <div id='backgroundBox' style={styles.backgroundBox}/>
                            <div className='container'>
                                <div className={'box showbox'}>
                                    <h3 className='title'>Please Login</h3>
                                    <Form>

                                        <Form.Item>
                                            <Input
                                                onFocus={() => this.setState({focusItem: 0})}
                                                onBlur={() => this.setState({focusItem: -1})}
                                                maxLength={16}
                                                placeholder='username'
                                                addonBefore={<span className='iconfont icon-User' style={styles.focus}/>}
                                                onChange={(e)=>this.handleAccountChange(e)}
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <Input
                                                onFocus={() => this.setState({focusItem: 0})}
                                                onBlur={() => this.setState({focusItem: -1})}
                                                maxLength={16}
                                                type='password'
                                                placeholder='password'
                                                onChange={(e)=>this.handlePasswordChange(e)}
                                                addonBefore={<span className='iconfont icon-suo1' style={styles.focus}/>}
                                            />
                                        </Form.Item>


                                        <div>
                                            <button className='loginBtn' onClick={this.loginSubmit}>Login</button>

                                        </div>
                                    </Form>
                                    {/*<div className='footer'>*/}
                                        {/*<div>Login Page</div>*/}
                                    {/*</div>*/}
                                </div>

                            </div>
                        </div>
                }
            </div>
        )
    }
}

const styles = {
    backgroundBox: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        // backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg5.jpg?raw=true)',
        backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg1.jpg?raw=true)',
        backgroundSize: '100% 100%',
        transition: 'all .5s'
    },
    focus: {
        // transform: 'scale(0.7)',
        width: '20px',
        opacity: 1
    },
    loadingBox: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    loadingTitle: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: -45,
        marginTop: -18,
        color: '#000',
        fontWeight: 500,
        fontSize: 24
    },
}

export default Login
