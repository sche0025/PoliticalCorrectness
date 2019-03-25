import React from 'react'
import BGParticle from '../../utils/BGParticle'
import {Form, Input, Row, Col, notification, message, Icon} from 'antd'
import './style.css'
import {randomNum, calculateWidth} from '../../utils/utils'
import PromptBox from '../../components/PromptBox'
import {withRouter} from 'react-router-dom'

import Loading from '../../components/Loading'
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


class LoginForm extends React.Component {
    state = {
        focusItem: -1,   //保存当前聚焦的input
        code: ''         //验证码
    }

    loginSubmit = () => {

        this.setState({
            focusItem: -1
        })

        this.props.obj.props.history.push("/home/dashboard")


    }


    render() {

        return (
            <div className={this.props.className}>
                <h3 className='title'>Please Login</h3>
                <Form>

                    <Form.Item>
                        <Input
                            onFocus={() => this.setState({focusItem: 0})}
                            onBlur={() => this.setState({focusItem: -1})}
                            maxLength={16}
                            placeholder='username'
                            addonBefore={<span className='iconfont icon-User' style={styles.focus}/>}/>
                    </Form.Item>

                    <Form.Item>
                        <Input
                            onFocus={() => this.setState({focusItem: 0})}
                            onBlur={() => this.setState({focusItem: -1})}
                            maxLength={16}
                            type='password'
                            placeholder='password'
                            addonBefore={<span className='iconfont icon-suo1' style={styles.focus}/>}
                        />
                    </Form.Item>


                    <div>
                        <button className='loginBtn' onClick={this.loginSubmit}>Login</button>

                    </div>
                </Form>
                <div className='footer'>
                    <div>Login Page</div>
                </div>
            </div>
        )
    }
}

// @inject('appStore') @observer @Form.create()


// @withRouter @inject('appStore') @observer
class Login extends React.Component {
    state = {
        showBox: 'login',   //展示当前表单
        url: '',  //背景图片
        loading: false,
        loading2: false,
    }

    componentDidMount() {
        const isLogin = this.props.appStore
        if (isLogin) {
            this.props.history.go(1)     //当浏览器用后退按钮回到登录页时，判断登录页是否登录，是登录就重定向上个页面
            // this.props.appStore.toggleLogin(false) //也可以设置退出登录
        }
        this.initPage()
        preloadingImages(imgs)  //预加载下一个页面的图片，预加载了第二次为什么还会去请求图片资源？
    }

    componentWillUnmount() {
        this.particle && this.particle.destory()
        notification.destroy()
    }

    //载入页面时的一些处理
    initPage = () => {
        this.setState({
            loading: true
        })
        // this.props.appStore.initUsers()
        this.loadImageAsync(url).then(url => {
            this.setState({
                loading: false,
                url
            })
        })
    }

    //切换showbox
    switchShowBox = (box) => {
        this.setState({
            showBox: box
        })
    }

    //登录的背景图太大，等载入完后再显示，实际上是图片预加载，
    loadImageAsync(url) {
        return new Promise(function (resolve, reject) {
            const image = new Image();
            image.onload = function () {
                resolve(url);
            };
            image.onerror = function () {
                console.log('图片载入错误')
            };
            image.src = url;
        });
    }

    render() {
        const {showBox, loading} = this.state
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
                                <LoginForm
                                    obj={this}
                                    className={showBox === 'login' ? 'box showBox' : 'box hiddenBox'}
                                    switchShowBox={this.switchShowBox}/>

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
