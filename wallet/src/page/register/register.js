import React, {Component} from 'react';
import {
    NavBar,
    Icon,
    Picker,
    Modal,
    List,
    InputItem,
    Popover,
    Button,
    Toast,
    Tabs,
    WhiteSpace,
    PickerView
} from 'antd-mobile';
import './register.css';
import {createForm} from 'rc-form';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import messageURL from './../../common/config.js';
import Axios from './../../service/service.js';
import NationalityEN from './../../common/nationality-en.js';
import PhonePrefix from './../../common/phone-prefix.js';
import NationalityZH from './../../common/nationality-zh.js';
import {StickyContainer, Sticky} from 'react-sticky';
import {urls} from "../../common/url";
import interVal from "../../common/interval";

const prompt = Modal.prompt;

const Lang = new Language();
const _cc = new Common();
const ajax = new Axios();

let choose = Lang.language.title['zh_CN'];
const nationalityEN = new NationalityEN().data;
const nationalityZH = new NationalityZH().data;
const phonePrefix = new PhonePrefix().prefix;

class InputDom extends Component {
    constructor(props) {
        super(props);

        let initTxt = Lang.getCode[this.props.changeLanguage];
        this.state = {
            language: 'zh_CN',
            clicking: false,
            sendText: initTxt,
            email: '',
            mobile: '',
            captcha: '',
            nationality: [37],
            tabs: [],
            prefix: '0086',
            isEmailRegister: false,
            captchaPic: '',
            captchaCode: ''
        }
    }


    componentWillMount() {
        this.countDown();
        this.setState({
            tabs: Lang.member.tabs[this.state.language]
        })


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

    // http://localhost:8002/message/captcha/t7jtbcJfQuZYrVMyRKyo.png

    captcha(e) {
        let that = this;
        let reqUrl = `${messageURL.message}/verify/captcha`;
        let biz = {}
        let email = that.state.email;
        let phone = that.state.mobile;
        let isEmailRegister = that.state.isEmailRegister;
        if (isEmailRegister && email === '') {
            Toast.fail(Lang.emailEmpty[that.props.changeLanguage], 2);
        } else if (isEmailRegister && !_cc.validate('email', email)) {
            Toast.fail(Lang.invalidEmail[that.props.changeLanguage], 2);
        } else if (!isEmailRegister && phone === '') {
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


                    // alert(Lang.picCaptcha[that.props.changeLanguage],
                    //     <div>
                    //         <img src={`${messageURL.message}/captcha/${res.biz}.png`}/>
                    //         <InputItem maxLength="4" placeholder={Lang.inputPicCaptcha[that.props.changeLanguage]} onChange={(v) => that.setState({captchaCode: v})}/>
                    //     </div>
                    //     , [
                    //         {text: Lang.cancel[that.state.language], onPress: () => console.log('cancel')},
                    //         {
                    //             text: Lang.OK[that.state.language], onPress: () => {
                    //                 that.getCode(e)
                    //             }
                    //         },
                    //     ])
                } else {
                    Toast.fail(Lang.errorCode[that.props.changeLanguage][res.base.code], 2);
                }
            })
        }

    }

    getCode(e) {
        let that = this;

        let email = that.state.email;
        let phone = that.state.mobile;
        let prefix = that.state.prefix;
        let isEmailRegister = that.state.isEmailRegister;
        let nationality = that.state.nationality;
        let token = '';
        let reqUrl = `${messageURL.message}/email/code/send`;

        let biz = {
            nationality: nationality[0],
            captcha_id: that.state.captchaPic,
            pic_code: that.state.captchaCode,
        }
        if(that.state.captchaCode === '' || that.state.captchaCode.length !== 4){
            Toast.fail(Lang.captchaEmpty[that.props.changeLanguage], 2);
        }else if (isEmailRegister && email === '') {
            Toast.fail(Lang.emailEmpty[that.props.changeLanguage], 2);
        } else if (isEmailRegister && !_cc.validate('email', email)) {
            Toast.fail(Lang.invalidEmail[that.props.changeLanguage], 2);
        } else if (!isEmailRegister && phone === '') {
            Toast.fail(Lang.phoneEmpty[that.props.changeLanguage], 2);
        } else {
            if (isEmailRegister) {
                biz['email'] = email;
            } else {
                biz['mobile'] = phone
                biz['prefix'] = prefix
                reqUrl = `${messageURL.message}/mobile/code/send`;
            }
            that.setState({
                clicking: true,
            });
            ajax.post(reqUrl, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    Toast.success(Lang.successCode[that.props.changeLanguage].sendCode, 2);
                    that.countDown(e);
                } else {
                    Toast.fail(Lang.errorCode[that.props.changeLanguage][res.base.code], 2);
                    that.setState({
                        clicking: false,
                    });
                    if (res.base.code === 'F0007') {
                        _cc.toPageWithTime('/login',3000);
                    }
                }
            })
        }

    }


    countDown(e) {
        let that = this;

        let count = 0;
        if(!e){
            console.log("刷新页面重新计算");
            let latestTimestamp = _cc.getStorage('latestTimestamp');
            if(latestTimestamp){
                let timestamp = Math.round(new Date().getTime()/1000);
                if(timestamp - latestTimestamp>0){
                    count =  parseFloat(latestTimestamp) + 60 - timestamp;
                    console.log("刷新页面重新计算,count:",count);
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

    renderTabBar(props) {
        return (<Sticky>
            {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    onNationalityChange(v) {
        this.setState({
            nationality: v,
            prefix: phonePrefix[v[0]]
        })
        this.props.changeNationality(v);
    }

    onchangeValueV(n, v) {
        this.setState({
            [n]: v,
        })
        this.props.changeValueV(n, v);
    }


    onTabClick(title, index) {
        console.log(title, index)
        if (index === 0) {
            this.setState({
                isEmailRegister: false,
            })
            this.props.changeTab(false);
        } else {
            this.setState({
                isEmailRegister: true,
            })
            this.props.changeTab(true);
        }

        console.log(this.state.isEmailRegister)
    }

    render() {
        let that = this;
        return (
            <>
                <NavBar
                    mode="dark"
                    leftContent={Lang.login[this.state.language]}
                    onLeftClick={() => {urls.back()}}
                >
                {Lang.register[this.state.language]}
                </NavBar>

                <div className='registerInput'>

                    <StickyContainer>
                        <Tabs tabs={Lang.member.tabs[that.props.changeLanguage]}
                              initalPage={'t1'}
                              renderTabBar={this.renderTabBar}
                              onChange={(a, b) => this.onTabClick(a, b)}
                        >
                            <div style={{
                                // alignItems: 'center',
                                // justifyContent: 'center',
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
                                        clear
                                        placeholder={Lang.inputMobile[this.props.changeLanguage]}
                                        name='mobile'
                                        id='mobile'
                                        type='number'
                                        disabled
                                        onKeyUp={e => this.inputValue(e)}
                                        onBlur={v => this.onchangeValueV('mobile', v)}
                                    ><span>{that.state.prefix}</span></InputItem>

                                    <div className='sendCaptcha'>
                                        <Button className='sendTxt' disabled={this.state.clicking}
                                                onClick={e => this.captcha(e)}>{this.state.sendText}</Button>
                                    </div>
                                    <InputItem
                                        clear
                                        placeholder={Lang.inputCaptcha[this.props.changeLanguage]}
                                        name='captcha'
                                        maxLength="6"
                                        disabled
                                        onKeyUp={e => this.inputValue(e)}
                                        onBlur={v => this.onchangeValueV('captcha', v)}
                                    >{Lang.captcha[this.props.changeLanguage]}</InputItem>
                                    <InputItem
                                        clear
                                        placeholder={Lang.optional[this.props.changeLanguage]}
                                        name='inviteCode'
                                        id='inviteCode'
                                        maxLength="4"
                                        onKeyUp={e => this.inputValue(e)}
                                        onBlur={v => this.onchangeValueV('inviteCode', v)}
                                    ><span
                                        style={{fontSize: '16px'}}>{Lang.inviteCode[this.props.changeLanguage]}</span></InputItem>
                                </div>

                            </div>

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
                                        clear
                                        placeholder={Lang.inputEmail[this.props.changeLanguage]}
                                        name='email'
                                        disabled
                                        id='email'
                                        maxLength="64"
                                        onKeyUp={e => this.inputValue(e)}
                                        onBlur={v => this.onchangeValueV('email', v)}
                                    >{Lang.email[this.props.changeLanguage]}</InputItem>
                                    <div className='sendCaptcha'>
                                        <Button className='sendTxt' disabled={this.state.clicking}
                                                onClick={e => this.captcha(e)}>{this.state.sendText}</Button>
                                    </div>
                                    <InputItem
                                        clear
                                        placeholder={Lang.inputCaptcha[this.props.changeLanguage]}
                                        name='captcha'
                                        maxLength="6"
                                        disabled
                                        onKeyUp={e => this.inputValue(e)}
                                        onBlur={v => this.onchangeValueV('captcha', v)}
                                    >{Lang.captcha[this.props.changeLanguage]}</InputItem>
                                    <InputItem
                                        clear
                                        placeholder={Lang.optional[this.props.changeLanguage]}
                                        name='inviteCode'
                                        id='inviteCode'
                                        maxLength="4"
                                        onKeyUp={e => this.inputValue(e)}
                                        onBlur={v => this.onchangeValueV('inviteCode', v)}
                                    >{Lang.inviteCode[this.props.changeLanguage]}</InputItem>
                                </div>

                            </div>

                        </Tabs>
                    </StickyContainer>
                    <WhiteSpace/>


                </div>
            </>

        )
    }
}

const InputDomWrapper = createForm()(InputDom);

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageValue: ['English'],
            language: 'en_US',
            init: '',
            email: '',
            mobile: '',
            captcha: '',
            visible: false,
            value: null,
            clicking: false,
            selected: '',
            prefix: '0086',
            isEmailRegister: false,
            nationality: [37],
            inviteCode: '',
            languageData: [
                [{
                    label: choose,
                    value: 'choose'
                }],
                [{
                    label: 'English',
                    value: 'English'
                }, {
                    label: '简体中文',
                    value: '简体中文'
                }]
            ],
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            if (_cc.getStorage('language') === 'zh_CN') {
                this.setState({
                    languageValue: ['简体中文'],
                    language: 'zh_CN',
                    value: ['choose', Lang.language.value[_cc.getStorage('language')]]
                })
            } else if (_cc.getStorage('language') === 'zh_TW') {
                this.setState({
                    languageValue: ['繁體中文'],
                    language: 'zh_TW',
                    value: ['choose', Lang.language.value[_cc.getStorage('language')]]
                })
            } else {
                this.setState({
                    languageValue: ['English'],
                    language: 'en_US',
                    value: ['choose', Lang.language.value[_cc.getStorage('language')]]
                })
            }

            document.title = Lang.register[_cc.getStorage('language')];
        }
    }


    changeInputValue(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
    }

    changeTab(isEmailRegister) {
        this.setState({
            "isEmailRegister": isEmailRegister
        });
    }

    changeNationality(n) {
        this.setState({
            "nationality": n
        });
    }

    changeValueV(n, v) {
        this.setState({
            [n]: v
        });
    }

    next(e) {
        let email = this.state.email;
        let mobile = this.state.mobile;
        let captcha = this.state.captcha;
        let nationality = this.state.nationality;
        let isEmailRegister = this.state.isEmailRegister;
        let inviteCode = this.state.inviteCode;

        let that = this;
        let token = '';
        if (isEmailRegister) {
            let biz = {
                email: email,
                code: captcha
            }
            if (email === '') {
                Toast.fail(Lang.emailEmpty[that.state.language], 2);
            } else if (!_cc.validate('email', email)) {
                Toast.fail(Lang.invalidEmail[that.state.language], 2);
            } else if (captcha === '') {
                Toast.fail(Lang.captchaEmpty[that.state.language], 2);
            } else {
                let historyBrower = that.props.history;
                that.setState({
                    clicking: true,
                });
                ajax.post(`${messageURL.message}/email/code/check`, token, biz, function (res) {
                    console.log(res, res.base.code === 'SUCCESS', nationality)
                    if (res.base.code === 'SUCCESS') {
                        _cc.setStorage('email', email);
                        _cc.setStorage('isEmailRegister', isEmailRegister);
                        _cc.setStorage('nationality', nationality[0]);
                        _cc.setStorage('code', captcha);
                        _cc.setStorage('inviteCode', inviteCode);
                        urls.setPassword();
                        // historyBrower.push('/register/setPassword');
                    } else {
                        that.setState({
                            clicking: false,
                        });
                        Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                        if (res.base.code === 'F0007') {
                            setTimeout(urls.login, 1500);
                        }
                    }
                })
            }
        } else {
            let biz = {
                mobile: mobile,
                prefix: PhonePrefix[this.state.nationality[0]],
                code: captcha
            }
            if (mobile === '') {
                Toast.fail(Lang.phoneEmpty[that.state.language], 2);
            } else if (captcha === '') {
                Toast.fail(Lang.captchaEmpty[that.state.language], 2);
            } else {
                that.setState({
                    clicking: true,
                });
                ajax.post(`${messageURL.message}/mobile/code/check`, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {
                        _cc.setStorage('prefix', PhonePrefix[nationality[0]]);
                        _cc.setStorage('mobile', mobile);
                        _cc.setStorage('isEmailRegister', isEmailRegister);
                        _cc.setStorage('nationality', nationality[0]);
                        _cc.setStorage('code', captcha);
                        _cc.setStorage('inviteCode', inviteCode);
                        urls.setPassword();
                    } else {
                        that.setState({
                            clicking: false,
                        });
                        Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                        if (res.base.code == 'F0007') {
                            _cc.toPageWithTime('/login',3000);
                        }
                    }
                })
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
        console.log(value, value[1] === "繁體中文");
        this.setState({
            value: value,
        })
        console.log('value:', value)
        if (value[1] === '简体中文') {
            this.setStateLang('zh_CN');
        } else if (value[1] === "繁體中文") {
            this.setStateLang('zh_TW');
        } else {
            this.setStateLang('en_US');
        }
    }

    setStateLang(str) {
        // let choosed = Lang.language.title[str];
        _cc.setStorage('language', str);
        // document.getElementsByClassName('am-picker-col-item-selected')[0].innerHTML = choosed;
        this.setState({
            language: str
        });
    }

    // topLanguage() {
    //     let that = this;
    //     alert(Lang.language.title[that.state.language],
    //         <PickerView
    //             onChange={that.onChange}
    //             onScrollChange={that.onScrollChange}
    //             value={that.state.value}
    //             data={that.state.languageData}
    //             cascade={false}
    //         />
    //         , [
    //             {text: Lang.cancel[that.state.language], onPress: () => console.log('cancel')},
    //             {text: Lang.OK[that.state.language], onPress: () => console.log('ok')},
    //         ])
    // }

    render() {
        return (
            <div className='registerDom'>


                <InputDomWrapper changeLanguage={this.state.language} changeValue={e => this.changeInputValue(e)}
                                 changeValueV={(n, v) => this.changeValueV(n, v)}
                                 changeTab={isEmailRegister => this.changeTab(isEmailRegister)}
                                 changeNationality={n => this.changeNationality(n)}/>
                <Button type='warning' className='registerBtn' disabled
                        onClick={e => this.next(e)}>Flight wallet has stopped new user registration</Button>
            </div>
        )
    }
}

export default Register;
