import React, {Component} from 'react';
import { Button,WhiteSpace ,InputItem,Picker,List,NavBar,Icon} from 'antd-mobile';

import messageURL from './../../common/config.js';
import Language from './../../language/language.js';
import Axios from './../../service/service.js';
import Common from './../../common/common.js';
import {Modal, Toast} from "antd-mobile/lib/index";
import memberURl from "../../common/config";
import {createForm} from "rc-form";
import {StickyContainer, Sticky} from 'react-sticky';
import PhonePrefix from './../../common/phone-prefix.js';
import NationalityEN from "../../common/nationality-en";
import NationalityZH from "../../common/nationality-zh";
import {urls} from "../../common/url";
import interVal from "../../common/interval";

let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();
const alert = Modal.alert;
const prompt = Modal.prompt;
const nationalityEN = new NationalityEN().data;
const nationalityZH = new NationalityZH().data;
const phonePrefix = new PhonePrefix().prefix;

class InputDom extends Component {
    constructor(props) {
        super(props);
        let initTxt = Lang.getCode[this.props.changeLanguage];
        this.state = {
            language: 'en_US',
            clicking: false,
            sendText: initTxt,
            mobile: '',
            captcha: '',
            captchaPic: '',
            captchaCode: '',
            nationality: [37],
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

    onNationalityChange(v) {
        this.setState({
            nationality: v,
            prefix: phonePrefix[v[0]]
        })
        this.props.changeNationality(v);
    }

    captcha(e) {
        let that = this;
        let reqUrl = `${messageURL.message}/verify/captcha`;
        let biz = {}
        let phone = that.state.mobile;
       if (phone === '') {
            Toast.fail(Lang.phoneEmpty[that.props.changeLanguage], 2);
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
        let mobile = this.state.mobile;
        let nationality = that.props.nationality;
        let prefix = phonePrefix[nationality];
        let token = '';
        if(mobile === ''){
            Toast.fail(Lang.phoneEmpty[that.props.changeLanguage], 2);
        }else if(prefix === ''){
            Toast.fail(Lang.captchaEmpty[that.props.changeLanguage], 2);
        }else{
            let reqUrl=`${messageURL.message}/mobile/code/send`;
            let biz = {
                nationality:nationality,
                mobile:mobile,
                prefix:prefix,
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

                    <Picker
                        data={this.props.changeLanguage === 'en_US' ? nationalityEN : nationalityZH}
                        value={this.state.nationality}
                        cached
                        cols={1}
                        title={Lang.member.nationality[this.props.changeLanguage]}
                        onChange={v => this.onNationalityChange(v)}
                        name='nationality'
                        id='nationality'
                    >
                        <List.Item
                            arrow="horizontal">{Lang.member.nationality[this.props.changeLanguage]}</List.Item>
                    </Picker>

                    <div className='emailCode'>
                        <InputItem
                            {...getFieldProps('autofocus')}
                            clear
                            placeholder={Lang.inputMobile[this.props.changeLanguage]}
                            ref={el => this.autoFocusInst = el}
                            name='mobile'
                            id='mobile'
                            onKeyUp={e => this.inputValue(e)}
                            onBlur={v=> this.onchangeValueV('mobile',v)}
                        >{phonePrefix[this.props.nationality]}</InputItem>
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
            mobile:'',
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
        document.title = Lang.safety.bandMobile[_cc.getStorage('language')];
        this.getUserDetail();

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
            let history = that.props.history;
            ajax.post(`${memberURl.member}/member/detail`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        email: res.biz.email,
                        mobile: res.biz.mobile,
                        hasPayPassword: res.biz.has_pay_password,
                        nationality:res.biz.nationality,
                    })
                } else {
                    // urls.login();
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
            urls.login()
        }
    }

    changeInputValue(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
    }

    changeNationality(n) {
        this.setState({
            "nationality": n
        });
    }

    next(e) {
        let that = this;
        let mobile = this.state.mobile;
        let captcha = this.state.captcha;

        console.log(this.state.nationality)

        if(mobile === ''){
            Toast.fail(Lang.phoneEmpty[that.state.language], 2);
        }else if(captcha === ''){
            Toast.fail(Lang.captchaEmpty[that.state.language], 2);
        }else{
            let that = this;
            let token = _cc.getStorage('token');;
            let biz = {
                prefix:phonePrefix[this.state.nationality],
                mobile: mobile,
                code: captcha
            }
            if(mobile === ''){
                Toast.fail(Lang.phoneEmpty[that.state.language], 2);
            }else if(captcha === ''){
                Toast.fail(Lang.captchaEmpty[that.state.language], 2);
            }else{
                ajax.post(`${memberURl.member}/member/mobile/set`, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {
                        Toast.success(Lang.updateSucc[that.state.language], 2);
                        setTimeout(function () {
                             urls.safety()
                        }, 1500)
                    } else {
                        if(res.base.desc.indexOf('Duplicate')>-1){
                            Toast.fail(Lang.errorCode[that.state.language].MOBILEHASBADING, 2);
                        }else{
                            Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                        }
                        if (res.base.code === 'F0007') {
                            _cc.toPageWithTime('/login',3000);
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

                <InputDomWrapper changeLanguage={this.state.language} nationality={this.state.nationality} changeValue={e => this.changeInputValue(e)} changeValueV={(n,v) => this.changeValueV(n,v)} changeNationality={n => this.changeNationality(n)}/>
                <Button type='primary' className='registerBtn'
                        onClick={e => this.next(e)}>{Lang.submit[this.state.language]}</Button>

                <WhiteSpace/>
            </div>
        )
    }
}

export default SafetyMobile;
