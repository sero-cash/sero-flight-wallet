import React, {Component} from 'react';
import './login.css';
import {Button, NavBar, Icon, InputItem, Popover, Toast, Modal, PickerView} from 'antd-mobile';
import {createForm} from 'rc-form';
import './../../fonts/iconfont/iconfont.css';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import memberURl from './../../common/config.js';
import Axios from './../../service/service.js';
import messageURL from "../../common/config";
import {urls} from "../../common/url";
import interVal from "../../common/interval";

const Item = Popover.Item;
const alert = Modal.alert;
const prompt = Modal.prompt;
const Lang = new Language();
const _cc = new Common();
const ajax = new Axios();
const choose = Lang.language.title['zh_CN'];

class InputDom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // language:'en_US',
        }
    }

    getValue(e) {
        this.props.getValue(e);
    }




    render() {
        return (
            <div className='loginInput'>
                <InputItem
                    clear
                    placeholder={Lang.inputAccount[this.props.changeLang]}
                    ref={el => this.autoFocusInst = el}
                    name='userName'
                    defaultValue={_cc.getStorage('user_name')}
                    onBlur={v => this.props.changeValueBlur('userName',v)}
                >{Lang.account[this.props.changeLang]}</InputItem>
                <InputItem
                    clear
                    placeholder={Lang.inputPassword[this.props.changeLang]}
                    ref={el => this.autoFocusInst = el}
                    type='password'
                    name='password'
                    onBlur={v => this.props.changeValueBlur('password',v)}
                >{Lang.password[this.props.changeLang]}</InputItem>
            </div>
        )
    }
}

const InputDomWrapper = createForm()(InputDom);


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: '',
            language: 'zh_CN',
            userName: '',
            password: '',
            loading: false,
            value: null,
            captchaCode:"",
            languageData: [
                [{
                    label: choose,
                    value: 'choose'
                }],
                [{
                    label: 'English',
                    value: 'English'
                },{
                    label: '简体中文',
                    value: '简体中文'
                }]
            ],

        }
    }


    componentWillMount() {
        this.setState({
            userName:_cc.getStorage('user_name'),
        })
        interVal.clearInterValCustomer(0);
        if (_cc.getStorage('language')) {
            this.setState({
                language: _cc.getStorage('language'),
                value:['choose',Lang.language.value[_cc.getStorage('language')]],
            })
        } else {

            //根据时间戳设置语言
            var now = new Date().toString();
            if(now.indexOf('中国')>-1){

                this.setState({
                    language: 'zh_CN',
                    value:['choose','简体中文'],
                })
                _cc.setStorage('language','zh_CN')
            }else{
                this.setState({
                    language: 'en_US',
                    value:['choose','English'],
                })
                _cc.setStorage('language','en_US')
            }
        }

    }

    onChange = (value) => {
        this.setLanguageValue(value);
    }
    onScrollChange = (value) => {
        this.setLanguageValue(value);
    }

    setLanguageValue(value) {
        this.setState({
            value:value,
        })
        if (value[1] === '简体中文') {
            this.setStateLang('zh_CN');
        } else if (value[1] === '繁體中文') {
            this.setStateLang('zh_TW');
        } else {
            this.setStateLang('en_US');
        }
    }

    setStateLang(str) {
        let choosed = Lang.language.title[str];
        _cc.setStorage('language', str);
        document.getElementsByClassName('am-picker-col-item-selected')[0].innerHTML = choosed;
        this.setState({
            language: str
        });
    }

    topLanguage(){
        let that = this;
        alert(Lang.language.title[that.state.language],
                    <PickerView
                        onChange={that.onChange}
                        onScrollChange={that.onScrollChange}
                        value={that.state.value}
                        data={that.state.languageData}
                        cascade={false}
                    />
                    , [
                        {text: Lang.cancel[that.state.language], onPress: () => console.log('cancel')},
                        {text: Lang.OK[that.state.language], onPress: () => console.log('ok')},
                    ])
    }

    changeInputValue(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
    }


    changeValueBlur(key,value){
        let that = this;
        that.setState({
            [key]:value,
        })
    }


    login(e) {

        let that = this;
        let user_name = that.state.userName;
        let password = that.state.password;

        if (user_name === '') {
            Toast.fail(Lang.accountEmpty[that.state.language], 2);
        } else if (password === '') {
            Toast.fail(Lang.passwordEmpty[that.state.language], 2);
        } else {
            let reqUrl = `${messageURL.member}/member/verify/captcha`;
            ajax.post(reqUrl, "", {}, function (res) {
                if (res.base.code === 'SUCCESS') {
                    prompt(Lang.picCaptcha[that.props.changeLanguage], <img src={`${messageURL.member}/member/captcha/${res.biz}.png`}/>,
                        [
                            {
                                text: Lang.cancel[that.state.language],
                                onPress: () =>{
                                    console.log('cancel')
                                },
                            },
                            {
                                text: Lang.OK[that.state.language],
                                onPress: value => {
                                    that.loginAj(user_name,password,value,res.biz);
                                },
                            },
                        ], 'default', null, [ Lang.inputPicCaptcha[that.props.changeLanguage]]);
                }
            })
        }
    }

    loginAj(user_name,password,captchaCode,cpId){
        let that = this;
        let biz = {
            user_name:user_name,
            password:password,
            captcha_id:cpId,
            captcha_code:captchaCode
        }
        this.setState({
            loading: true
        })
        ajax.post(`${memberURl.member}/member/login`, '', biz, function (res) {
            if (res.base.code === 'SUCCESS') {
                _cc.setStorage('user_name', user_name);
                _cc.setStorage('token', res.biz.token);
                Toast.success(Lang.loginSuccess[that.state.language], 2);
                urls.assets();
            } else {
                that.setState({
                    loading: false
                })
                Toast.fail(Lang.loginFail[that.state.language], 2);
            }
        })
    }

    render() {
        return (
            <div className="loginDom">
                <NavBar
                    mode="dark"
                    // leftContent={Lang.back[this.state.language]}
                    leftContent="SERO Flight"
                    // icon={<Icon type="anticon-yuyanqiehuan" className='selfIcon'/>/>}
                    // onLeftClick={() => window.history.go(-1)}
                    rightContent={
                        <Icon type="anticon-language" onClick={()=>this.topLanguage()}/>
                    }
                />{/*{Lang.login[this.state.language]}</NavBar>*/}
                <InputDomWrapper getValue={e => this.changeInputValue(e)} changeLang={this.state.language} changeValueBlur={(key,value)=>this.changeValueBlur(key,value)}/>
                <div className='toForgetPass'>
                    {/*<span onClick={()=>{*/}
                    {/*    interVal.clearInterValCustomer(0)*/}
                    {/*    urls.register()*/}
                    {/*}} className='toRegister'>{Lang.register1[this.state.language]}</span>*/}
                    <span onClick={()=>{
                        urls.passwordReset()
                    }} className='forget'>{Lang.forgetPassword[this.state.language]}</span>
                </div>
                <Button type="primary" className='loginBtn' onClick={e => this.login(e)}
                        loading={this.state.loading}>{Lang.login[this.state.language]}</Button>
            </div>
        );
    }
}

export default Login;
