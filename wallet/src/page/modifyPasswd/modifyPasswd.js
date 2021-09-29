import React, {Component} from 'react';
import {NavBar, Icon, Picker, List, Tabs, InputItem, Button, Toast} from 'antd-mobile';
import './modifyPasswd.css';
import {createForm} from 'rc-form';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import messageURL from './../../common/config.js';
import Axios from './../../service/service.js';
import {StickyContainer, Sticky} from 'react-sticky';
import PhonePrefix from './../../common/phone-prefix.js';
import memberURl from "../../common/config";
import {Modal} from "antd-mobile/lib/index";
import {urls} from "../../common/url";
import interVal from "../../common/interval";

let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();
let phonePrefix = new PhonePrefix().prefix;
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
            nationality: 37,
            email: '',
            mobile: '',
            isEmail: false,
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

    renderTabBar(props) {
        return (<Sticky>
            {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    onTabClick(title, index) {
        console.log(title, index)
        if (index === 1) {
            this.setState({
                isEmail: true,
            })
            this.props.changeTab(true);
        } else {
            this.setState({
                isEmail: false,
            })
            this.props.changeTab(false);
        }

        console.log(this.state.isEmail)
    }

    onchangeValueV(n, v) {
        this.setState({
            [n]: v,
        })
        this.props.changeValueV(n, v);
    }

    captcha(e) {
        let that = this;
        let reqUrl = `${messageURL.message}/verify/captcha`;
        let biz = {}
        let email = that.props.email;
        let phone = that.props.mobile;
        let isEmailT = that.props.isEmail;
        console.log(email, phone, isEmailT)
        if (isEmailT && email === '') {
            Toast.fail(Lang.emailEmpty[that.props.changeLanguage], 2);
        } else if (isEmailT && !_cc.validate('email', email)) {
            Toast.fail(Lang.invalidEmail[that.props.changeLanguage], 2);
        } else if (!isEmailT && phone === '') {
            Toast.fail(Lang.phoneEmpty[that.props.changeLanguage], 2);
        } else {
            ajax.post(reqUrl, "", biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        captchaPic: res.biz,
                    });
                    prompt(Lang.picCaptcha[that.props.changeLanguage], <img
                            src={`${messageURL.message}/captcha/${res.biz}.png`}/>,
                        [
                            {
                                text: Lang.cancel[that.state.language],
                                onPress: () => {
                                    console.log('cancel')
                                },
                            },
                            {
                                text: Lang.OK[that.state.language],
                                onPress: value => {
                                    console.log('value:', value);
                                    that.setState({
                                        captchaCode: value,
                                    });
                                    setTimeout(() => {
                                        that.getCode(e);
                                    }, 100);
                                },
                            },
                        ], 'default', null, [Lang.inputPicCaptcha[that.props.changeLanguage]]);
                } else {
                    Toast.fail(Lang.errorCode[that.props.changeLanguage][res.base.code], 2);
                }
            })
        }

    }

    getCode(e) {
        let that = this;
        let email = that.props.email;
        let mobile = that.props.mobile;
        let isEmailT = that.props.isEmail;
        if (isEmailT) {
            let token = '';
            let biz = {
                email: email,
                captcha_id: that.state.captchaPic,
                pic_code: that.state.captchaCode,
            }
            if (email === '') {
                Toast.fail(Lang.emailEmpty[that.props.changeLanguage], 2);
            } else {
                that.setState({
                    clicking: true,
                });
                ajax.post(`${messageURL.message}/email/code/send`, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {
                        Toast.success(Lang.successCode[that.props.changeLanguage].sendCode, 2);
                        that.countDown(e);
                    } else {
                        Toast.fail(Lang.errorCode[that.props.changeLanguage][res.base.code], 2);
                        that.setState({
                            clicking: false,
                        });
                        if (res.base.code === 'F0007') {
                            _cc.toPageWithTime('/login', 3000);
                        }
                    }
                })
            }
        } else {
            let token = '';
            let biz = {
                prefix: phonePrefix[that.props.nationality],
                mobile: mobile,
                captcha_id: that.state.captchaPic,
                pic_code: that.state.captchaCode,
            }
            if (mobile === '') {
                Toast.fail(Lang.phoneEmpty[that.props.changeLanguage], 2);
            } else {
                let history = that.props.history;
                that.setState({
                    clicking: true,
                });
                ajax.post(`${messageURL.message}/mobile/code/send`, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {
                        Toast.success(Lang.successCode[that.props.changeLanguage].sendCode, 2);
                        that.countDown(e);
                    } else {
                        Toast.fail(Lang.errorCode[that.props.changeLanguage][res.base.code], 2);
                        that.setState({
                            clicking: false,
                        });
                        if (res.base.code === 'F0007') {
                            setTimeout(urls.login, 1500);
                        }
                    }
                });
            }
        }

    }

    countDown(e) {
        let that = this;

        let count = 0;
        if (!e) {
            let latestTimestamp = _cc.getStorage('latestTimestamp');
            if (latestTimestamp) {
                let timestamp = Math.round(new Date().getTime() / 1000);
                if (timestamp - latestTimestamp > 0) {
                    count = parseFloat(latestTimestamp) + 60 - timestamp;
                }
            }
        } else {
            count = 59;
            _cc.setStorage('latestTimestamp', Math.round(new Date().getTime() / 1000))
        }
        if (count > 0) {
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
        let that = this;
        return (<div>
            <div className='modifyPasswdInput'>
                <div className='modiEmailCode'>
                    <InputItem
                        clear
                        value={that.props.mobile}
                        ref={el => this.autoFocusInst = el}
                        name='mobile'
                        editable="false"
                        disabled="true"
                        onKeyUp={e => this.inputValue(e)}
                    >{phonePrefix[this.props.nationality]}</InputItem>
                    <div className='sendCaptcha'>
                        <Button className='sendTxt' disabled={this.state.clicking}
                                onClick={e => this.captcha(e)}>{this.state.sendText}</Button>
                    </div>
                </div>
                <InputItem
                    clear
                    placeholder={Lang.inputCaptcha[this.props.changeLanguage]}
                    ref={el => this.autoFocusInst = el}
                    name='captcha'
                    onKeyUp={e => this.inputValue(e)}
                    onBlur={v => this.onchangeValueV('captcha', v)}

                >{Lang.captcha[this.props.changeLanguage]}</InputItem>
            </div>

        </div>)
    }
}

let InputDomWrapper = createForm()(InputDom);

class ModifyPasswd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageValue: ['English'],
            language: 'en_US',
            email: '',
            mobile: '',
            isEmail: false,
            nationality: 37,
            captcha: '',
            passwordType: 'login',
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

        if (window.location.hash.indexOf("safety/password/modify") > -1) {
            this.setState({
                passwordType: 'login'
            })
            document.title = Lang.findPassword[_cc.getStorage('language')];
        } else if (window.location.hash.indexOf("safety/payPassword/modify") > -1) {
            this.setState({
                passwordType: 'payment'
            })
            document.title = Lang.findPayPassword[_cc.getStorage('language')];
        }

        this.getUserDetail();

    }

    changeValueV(n, v) {
        this.setState({
            [n]: v
        });
    }

    nextStep(e) {

        let that = this;
        let captcha = that.state.captcha;
        let passwordType = that.state.passwordType;
        let token = '';

        let isEmail = this.state.isEmail;
        if (isEmail) {
            let email = that.state.email;
            let biz = {
                email: email,
                code: captcha
            }
            if (email === '') {
                Toast.fail(Lang.emailEmpty[that.state.language], 2);
            } else if (captcha === '') {
                Toast.fail(Lang.captchaEmpty[that.state.language], 2);
            } else {
                let history = this.props.history;
                ajax.post(`${messageURL.message}/email/code/check`, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {
                        _cc.setStorage('email', email);
                        _cc.setStorage('code', captcha);
                        _cc.setStorage('isEmail', isEmail);
                        _cc.setStorage('passwordType', passwordType);

                        urls.safePasswordSet()
                    } else {
                        Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                        if (res.base.code === 'F0007') {
                            _cc.toPageWithTime('/login', 3000);
                        }
                    }
                })
            }
        } else {
            let mobile = this.state.mobile;
            let biz = {
                prefix: phonePrefix[this.state.nationality],
                mobile: mobile,
                code: captcha
            }
            if (mobile === '') {
                Toast.fail(Lang.phoneEmpty[that.state.language], 2);
            } else if (captcha === '') {
                Toast.fail(Lang.captchaEmpty[that.state.language], 2);
            } else {
                ajax.post(`${messageURL.message}/mobile/code/check`, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {
                        _cc.setStorage('mobile', mobile);
                        _cc.setStorage('prefix', mobile);
                        _cc.setStorage('code', captcha);
                        _cc.setStorage('isEmail', isEmail);
                        _cc.setStorage('passwordType', passwordType);
                        urls.safePasswordSet()
                    } else {
                        Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                        if (res.base.code === 'F0007') {
                            setTimeout(urls.login, 1500);
                        }
                    }
                })
            }
        }

    }

    getUserDetail() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        if (token) {
            ajax.post(`${memberURl.member}/member/detail`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {

                    var isEmail = false;
                    if (res.biz.email != '' && res.biz.mobile == '') {
                        isEmail = true;
                    }

                    that.setState({
                        email: res.biz.email,
                        mobile: res.biz.mobile,
                        nationality: res.biz.nationality,
                        isEmail: isEmail,
                    });

                } else {
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                    if (res.base.code === 'F0007') {
                        _cc.toPageWithTime('/login', 3000);
                    }
                }
            })
        } else {
            that.setState({
                loginStatus: false
            })
            _cc.toPageWithTime('/login', 3000);
        }
    }

    changeInputValue(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
    }

    changeTab(isEmail) {
        this.setState({
            isEmail: isEmail
        });
    }

    render() {
        return (
            <div className='modifyPasswdDom'>
                <NavBar
                mode="dark"
                leftContent={Lang.back[this.state.language]}
                icon={<Icon type="left"/>}
                onLeftClick={() =>  {urls.back()}}
                >{"login" === this.state.passwordType ? Lang.findPassword[this.state.language] : Lang.findPayPassword[this.state.language]}</NavBar>

                <InputDomWrapper changeLanguage={this.state.language} changeValue={e => this.changeInputValue(e)}
                                 nationality={this.state.nationality} changeTab={v => this.changeTab(v)}
                                 email={this.state.email} mobile={this.state.mobile}
                                 changeValueV={(n, v) => this.changeValueV(n, v)} isEmail={this.state.isEmail}
                />
                <Button type='primary' className='modifyPasswdBtn'
                        onClick={e => this.nextStep(e)}>{Lang.next[this.state.language]}</Button>
            </div>
        )
    }
}

export default ModifyPasswd;
