import React, {Component} from 'react';
import { Button,WhiteSpace,InputItem,NavBar,Icon} from 'antd-mobile';

import messageURL from './../../common/config.js';
import Language from './../../language/language.js';
import Axios from './../../service/service.js';
import Common from './../../common/common.js';
import {Modal, Toast} from "antd-mobile/lib/index";
import memberURl from "../../common/config";
import {createForm} from "rc-form";
import {StickyContainer, Sticky} from 'react-sticky';
import {urls} from "../../common/url";
import interVal from "../../common/interval";

let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();
const alert = Modal.alert;
const prompt = Modal.prompt;

class InputDom extends Component {
    constructor(props) {
        super(props);
        let initTxt = Lang.getCode[this.props.changeLanguage];
        this.state = {
            language: 'en_US',
            clicking: false,
            sendText: initTxt,
            email: '',
            captcha: '',
            captchaPic: '',
            captchaCode: ''
        }
    }


    componentWillMount() {
        this.countDown();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.changeLanguage !== this.props.changeLanguage) {
            this.fetchData(nextProps.changeLanguage)
        }
    }

    fetchData(lang) {
        this.setState({
            sendText: Lang.getCode[lang]
        })
    }

    captcha(e) {
        let that = this;
        let reqUrl = `${messageURL.message}/verify/captcha`;
        let biz = {}
        let email = that.state.email;
        if (email === '') {
            Toast.fail(Lang.emailEmpty[that.props.changeLanguage], 2);
        }else{
            ajax.post(reqUrl, "", biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        captchaPic: res.biz,
                    });
                    prompt(Lang.picCaptcha[that.props.changeLanguage], <img src={`${messageURL.message}/captcha/${res.biz}.png`}/>,
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
                                    console.log('value:',value);
                                    that.setState({
                                        captchaCode:value,
                                    });
                                    setTimeout(()=>{
                                        that.getCode(e);
                                    },100);
                                },
                            },
                        ], 'default', null, [ Lang.inputPicCaptcha[that.props.changeLanguage]]);
                } else {
                    Toast.fail(Lang.errorCode[that.props.changeLanguage][res.base.code], 2);
                }
            })
        }

    }

    getCode(e) {
        let that = this;
        let email = this.state.email;
        let nationality = that.props.nationality;
        let token = '';
        if(email === ''){
            Toast.fail(Lang.phoneEmpty[that.props.changeLanguage], 2);
        }else{
            let reqUrl=`${messageURL.message}/email/code/send`;
            let biz = {
                nationality:nationality,
                email:email,
                captcha_id: that.state.captchaPic,
                pic_code: that.state.captchaCode,
            }
            ajax.post(reqUrl, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    Toast.success(Lang.successCode[that.props.changeLanguage].sendCode, 2);
                    that.countDown(e);
                } else {
                    Toast.fail(Lang.errorCode[that.props.changeLanguage][res.base.code], 2);
                    if (res.base.code === 'F0007') {
                        _cc.toPageWithTime('/login',3000);
                    }
                }
            })
        }
    }

    onchangeValueV(n,v) {
        this.setState({
            [n]:v,
        })
        this.props.changeValueV(n,v);
    }

    countDown(e) {
        let that = this;

        let count = 0;
        if(!e){
            let latestTimestamp = _cc.getStorage('latestTimestamp');
            if(latestTimestamp){
                let timestamp = Math.round(new Date().getTime()/1000);
                if(timestamp - latestTimestamp>0){
                    count =  parseFloat(latestTimestamp) + 60 - timestamp;
                }
            }
        }else{
            count = 59;
            _cc.setStorage('latestTimestamp',Math.round(new Date().getTime()/1000))
        }
        if(count>0){
            this.setState({
                clicking: true,
                sendText: `60s${Lang.resend[that.props.changeLanguage]}`
            })

            let countdown = interVal.setIntervalCustomer(function () {
                if (count >= 1) {
                    let newText = `${count}s${Lang.resend[that.props.changeLanguage]}`;
                    that.setState({
                        sendText: newText
                    })
                    count--;
                } else {
                    that.setState({
                        clicking: false,
                        sendText: Lang.getCode[that.props.changeLanguage]
                    })
                    interVal.clearInterValCustomer(countdown);
                }
            }, 1000)
        }
    }

    inputValue(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });

        this.props.changeValue(e);
    }


    render() {
        let {getFieldProps} = this.props.form;
        return (
            <div className='registerInput'>
                <div style={{
                    backgroundColor: '#fff'
                }}>
                    <div className='emailCode'>

                        <InputItem
                            {...getFieldProps('autofocus')}
                            clear
                            placeholder={Lang.inputEmail[this.props.changeLanguage]}
                            ref={el => this.autoFocusInst = el}
                            name='email'
                            id='email'
                            onKeyUp={e => this.inputValue(e)}
                            onBlur={v=> this.onchangeValueV('email',v)}
                        />
                        <div className='sendCaptcha'>
                            <Button className='sendTxt' disabled={this.state.clicking}
                                    onClick={e => this.captcha(e)}>{this.state.sendText}</Button>
                        </div>
                        <InputItem
                            {...getFieldProps('focus')}
                            clear
                            placeholder={Lang.inputCaptcha[this.props.changeLanguage]}
                            ref={el => this.autoFocusInst = el}
                            name='captcha'
                            onKeyUp={e => this.inputValue(e)}
                            onBlur={v=> this.onchangeValueV('captcha',v)}
                        >{Lang.captcha[this.props.changeLanguage]}</InputItem>
                    </div>

                </div>

            </div>
        )
    }
}

let InputDomWrapper = createForm()(InputDom);


class SafetyMobile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            language: 'en_US',
            captcha:'',
            email:'',
            nationality:'',
            hasPayPassword:false,
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            if (_cc.getStorage('language') === 'zh_CN') {
                this.setState({
                    languageValue: ['简体中文'],
                    language: 'zh_CN',
                })
            } else if (_cc.getStorage('language') === 'zh_TW') {
                this.setState({
                    languageValue: ['繁體中文'],
                    language: 'zh_TW',
                })
            } else {
                this.setState({
                    languageValue: ['English'],
                    language: 'en_US',
                })
            }
        }

        this.getUserDetail();
        document.title = Lang.safety.bandEmail[_cc.getStorage('language')];
    }

    changeValueV(n,v) {
        this.setState({
            [n]: v
        });
    }

    getUserDetail() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        if (token) {
            that.setState({
                loginStatus: true
            })
            ajax.post(`${memberURl.member}/member/detail`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        email: res.biz.email,
                        hasPayPassword: res.biz.has_pay_password,
                        nationality:res.biz.nationality,
                    })
                } else {
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                    if (res.base.code === 'F0007') {
                        _cc.toPageWithTime('/login',3000);
                    }
                }
            })
        } else {
            that.setState({
                loginStatus: false
            })
            _cc.toPageWithTime('/login',3000);
        }
    }

    changeInputValue(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
    }

    next(e) {
        let that = this;
        let email = this.state.email;
        let captcha = this.state.captcha;

        console.log(this.state.nationality)

        if(email === ''){
            Toast.fail(Lang.phoneEmpty[that.state.language], 2);
        }else if(captcha === ''){
            Toast.fail(Lang.captchaEmpty[that.state.language], 2);
        }else{
            let that = this;
            let token = _cc.getStorage('token');;
            let biz = {
                email: email,
                code: captcha
            }
            if(email === ''){
                Toast.fail(Lang.phoneEmpty[that.state.language], 2);
            }else if(captcha === ''){
                Toast.fail(Lang.captchaEmpty[that.state.language], 2);
            }else{
                ajax.post(`${memberURl.member}/member/email/set`, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {
                        Toast.success(Lang.updateSucc[that.state.language], 2);
                        setTimeout(function () {
                            urls.safety()
                        }, 1500)
                    } else {
                        if(res.base.desc.indexOf('Duplicate')>-1){
                            Toast.fail(Lang.errorCode[that.state.language].EMAILHASBADING, 2);
                        }else{
                            Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                        }
                        if (res.base.code === 'F0007') {
                            setTimeout( urls.login() , 1500);
                        }
                    }
                })
            }

        }


    }

    render() {
        return (
            <div>
                <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                leftContent={Lang.back[this.state.language]}
                onLeftClick={() =>  {urls.safety()}}
                >
                {Lang.safety.bandMobile[this.state.language]}
                </NavBar>

                <InputDomWrapper changeLanguage={this.state.language} nationality={this.state.nationality} changeValue={e => this.changeInputValue(e)} changeValueV={(n,v) => this.changeValueV(n,v)}/>
                <Button type='primary' className='registerBtn'
                        onClick={e => this.next(e)}>{Lang.submit[this.state.language]}</Button>

                <WhiteSpace/>
            </div>
        )
    }
}

export default SafetyMobile;
