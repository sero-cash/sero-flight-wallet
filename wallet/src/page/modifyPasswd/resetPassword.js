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
import './resetPassword.css';
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

const alert = Modal.alert;
const prompt = Modal.prompt;
const Item = Popover.Item;
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
            language: 'en_US',
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

    onchangeValueV(n,v) {
        this.setState({
            [n]:v,
        })
        this.props.changeValueV(n,v);
    }

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
                } else {
                    Toast.fail(Lang.errorCode[that.props.changeLanguage][res.base.code], 2);
                }
            })
        }

    }

    getCode(e) {
        let that = this;
        let email = this.state.email;
        let phone = this.state.mobile;
        let prefix = this.state.prefix;
        let isEmailRegister = this.state.isEmailRegister;
        let nationality = this.state.nationality;
        let token = '';
        let reqUrl = `${messageURL.message}/email/code/send`;
        let biz = {
            nationality: nationality[0],
            captcha_id: that.state.captchaPic,
            pic_code: that.state.captchaCode,
        }
        console.log(this.state)
        if (isEmailRegister && email === '') {
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

    onTabClick(title, index) {
        console.log(title, index)
        if (index === 1) {
            this.setState({
                isEmailRegister: true,
            })
            this.props.changeTab(true);
        } else {
            this.setState({
                isEmailRegister: false,
            })
            this.props.changeTab(false);
        }

        console.log(this.state.isEmailRegister)
    }


    render() {
        const {getFieldProps} = this.props.form;
        let that = this;
        return (
            <div className='registerInput'>

                <StickyContainer>
                    <Tabs tabs={Lang.member.tabs[that.props.changeLanguage]}
                          initalPage={'t1'}
                          renderTabBar={this.renderTabBar}
                          onChange={(a, b) => this.onTabClick(a, b)}
                          onTabClick={(a, b) => this.onTabClick(a, b)}
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
                                    ref={el => this.autoFocusInst = el}
                                    name='mobile'
                                    id='mobile'
                                    type='number'
                                    onKeyUp={e => this.inputValue(e)}
                                    onBlur={v=> this.onchangeValueV('mobile',v)}
                                ><span>{that.state.prefix}</span></InputItem>

                                <div className='sendCaptcha'>
                                    <Button className='sendTxt' disabled={this.state.clicking}
                                            onClick={e => this.captcha(e)}>{this.state.sendText}</Button>
                                </div>
                                <InputItem
                                    clear
                                    placeholder={Lang.inputCaptcha[this.props.changeLanguage]}
                                    ref={el => this.autoFocusInst = el}
                                    name='captcha'
                                    maxLength="6"
                                    onKeyUp={e => this.inputValue(e)}
                                    onBlur={v=> this.onchangeValueV('captcha',v)}
                                >{Lang.captcha[this.props.changeLanguage]}</InputItem>
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
                                    {...getFieldProps('autofocus')}
                                    clear
                                    placeholder={Lang.inputEmail[this.props.changeLanguage]}
                                    ref={el => this.autoFocusInst = el}
                                    name='email'
                                    id='email'
                                    maxLength="64"
                                    onKeyUp={e => this.inputValue(e)}
                                    onBlur={v=> this.onchangeValueV('email',v)}
                                >{Lang.email[this.props.changeLanguage]}</InputItem>
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
                                    maxLength="6"
                                    onKeyUp={e => this.inputValue(e)}
                                    onBlur={v=> this.onchangeValueV('captcha',v)}
                                >{Lang.captcha[this.props.changeLanguage]}</InputItem>
                            </div>

                        </div>

                    </Tabs>
                </StickyContainer>
                <WhiteSpace/>


            </div>
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
            selected: '',
            prefix: '0086',
            isEmailRegister: false,
            nationality: [37],
            inviteCode:'',
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

        }
        document.title = Lang.resetPassword[_cc.getStorage('language')];
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
                ajax.post(`${messageURL.message}/email/code/check`, token, biz, function (res) {
                    console.log(res, res.base.code === 'SUCCESS', nationality)
                    if (res.base.code === 'SUCCESS') {
                        _cc.setStorage('email', email);
                        _cc.setStorage('isEmailRegister', isEmailRegister);
                        _cc.setStorage('nationality', nationality[0]);
                        _cc.setStorage('code', captcha);
                        _cc.setStorage('inviteCode', inviteCode);
                        urls.passwordReset2()
                    } else {
                        Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                        if (res.base.code === 'F0007') {
                            setTimeout( urls.login() , 1500);
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
                ajax.post(`${messageURL.message}/mobile/code/check`, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {
                        _cc.setStorage('prefix', PhonePrefix[nationality[0]]);
                        _cc.setStorage('mobile', mobile);
                        _cc.setStorage('isEmailRegister', isEmailRegister);
                        _cc.setStorage('nationality', nationality[0]);
                        _cc.setStorage('code', captcha);
                        _cc.setStorage('inviteCode', inviteCode);
                        urls.passwordReset2()
                    } else {
                        Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                        if (res.base.code === 'F0007') {
                            _cc.toPageWithTime('/login',3000);
                        }
                    }
                })
            }
        }


    }


    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    }

    onSelect = (opt) => {
        let that = this;
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        if (opt.props.value === 'home') {
            urls.assets()
        } else if (opt.props.value === 'language') {
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
                    {
                        text: Lang.OK[that.state.language], onPress: () => {
                            console.log('ok');
                        }
                    },
                ])
        } else if (opt.props.value === 'help') {
        }
        // (<Item key="4" value="home" icon={<Icon type="anticon-shouye3" className='selfIcon'/>} data-seed="logId">{Lang.home[this.state.language]}</Item>),
    }

    onChange = (value) => {
        this.setLanguageValue(value);
    }
    onScrollChange = (value) => {
        this.setLanguageValue(value);
    }

    setLanguageValue(value) {
        console.log(value,value[1] === "繁體中文");
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

    changeValueV(n,v) {
        this.setState({
            [n]: v
        });
    }


    render() {
        return (
            <div className='registerDom'>
                <NavBar
                    mode="dark"
                    leftContent={Lang.back[this.state.language]}
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  {urls.login()}}
                    rightContent={
                        <Icon type="ellipsis" className='selfIcon' onClick={()=>this.topLanguage()}/>

                    }
                >{Lang.resetPassword[this.state.language]}</NavBar>

                {/*<Picker*/}
                {/*data={language}*/}
                {/*value={this.state.languageValue}*/}
                {/*cols={1}*/}
                {/*title={Lang.language.title[this.state.language]}*/}
                {/*onChange={this.onChangeLanguage.bind(this)}*/}
                {/*>*/}
                {/*<List.Item arrow="horizontal">{Lang.language.title[this.state.language]}</List.Item>*/}
                {/*</Picker>*/}

                <InputDomWrapper changeLanguage={this.state.language} changeValue={e => this.changeInputValue(e)}
                                 changeTab={isEmailRegister => this.changeTab(isEmailRegister)} changeValueV={(n,v) => this.changeValueV(n,v)}
                                 changeNationality={n => this.changeNationality(n)}/>
                <Button type='primary' className='registerBtn'
                        onClick={e => this.next(e)}>{Lang.next[this.state.language]}</Button>
            </div>
        )
    }
}

export default Register;
