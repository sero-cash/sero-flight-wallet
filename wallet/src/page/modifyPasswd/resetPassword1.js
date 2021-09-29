import React, {Component} from 'react';
import {NavBar, Icon, InputItem, Button, TextareaItem, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import './resetPassword1.css';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import memberURl from './../../common/config.js';
import Axios from './../../service/service.js';
import PhonePrefix from "../../common/phone-prefix";
import {urls} from "../../common/url";

const Lang = new Language();
const _cc = new Common();
const ajax = new Axios();

class SecondStepInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: _cc.getStorage('email'),
            mobile: _cc.getStorage('mobile'),
            isEmailRegister: _cc.getStorage('isEmailRegister') === 'true'
        }
    }

    getPassValue(e) {
        this.props.getValue(e);
    }

    onchangeValueV(n,v) {
        this.setState({
            [n]:v,
        })
        this.props.changeValueV(n,v);
    }

    render() {
        const {getFieldProps} = this.props.form;
        let userName = this.state.email;
        let isEmailRegister = this.state.isEmailRegister;
        console.log(this.state)
        if (!isEmailRegister) {
            userName = this.state.mobile;
        }
        return (
            <div>
                <TextareaItem
                    {...getFieldProps('chooseCoin', {
                        initialValue: userName,
                    })}
                    title={isEmailRegister ? Lang.email[this.props.changeLanguage] : Lang.mobile[this.props.changeLanguage]}
                    editable={false}
                />
                <div className='inputPass'>
                    <InputItem
                        {...getFieldProps('pass')}
                        clear
                        placeholder={Lang.inputPassword[this.props.changeLanguage]}
                        ref={el => this.autoFocusInst = el}
                        type='password'
                        name='password'
                        maxLength={18}
                        onKeyUp={e => this.getPassValue(e)}
                        onBlur={v=> this.onchangeValueV('password',v)}
                    >{Lang.password[this.props.changeLanguage]}</InputItem>
                    <InputItem
                        {...getFieldProps('confirmPass')}
                        clear
                        placeholder={Lang.confirmPassword[this.props.changeLanguage]}
                        ref={el => this.autoFocusInst = el}
                        type='password'
                        name='passAgain'
                        maxLength={18}
                        onKeyUp={e => this.getPassValue(e)}
                        onBlur={v=> this.onchangeValueV('passAgain',v)}
                    >{Lang.confirm[this.props.changeLanguage]}</InputItem>
                </div>
            </div>
        )
    }
}

const SecondStepInputWrapper = createForm()(SecondStepInput);

class RegisterSecondStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en_US',
            password: '',
            passAgain: ''
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            this.setState({
                language: _cc.getStorage('language'),
            })
        } else {
            this.setState({
                language: 'zh_CN'
            })
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

    register() {
        var that = this;
        let password = this.state.password;
        let passAgain = this.state.passAgain;

        let isEmailRegister = _cc.getStorage('isEmailRegister') === 'true';
        let userName = '';
        if (isEmailRegister) {
            userName = _cc.getStorage('email')
        } else {
            userName = _cc.getStorage('mobile')
        }

        let biz = {
            user_name: userName,
            password: password,
            code: _cc.getStorage('code'),
        }
        let token = '';
        if (password === '' || passAgain === '') {
            Toast.fail(Lang.passwordEmpty[that.state.language], 2);
        } else if (password !== passAgain) {
            Toast.fail(Lang.differentPassword[that.state.language], 2);
        } else if (!_cc.validate('password',password)) {
            Toast.fail(Lang.invalidPassword[that.state.language], 2);
        } else {
            ajax.post(`${memberURl.member}/member/password/reset`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    Toast.success(Lang.resetSuccess[that.state.language], 2);
                    _cc.removeStorage('code');
                    _cc.removeStorage('email');
                    _cc.removeStorage('prefix');
                    _cc.removeStorage('isEmailRegister');
                    _cc.removeStorage('mobile');
                    _cc.removeStorage('nationality');
                    _cc.toPageWithTime('/login',3000);
                } else {
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                    if (res.base.code === 'F0007') {
                        _cc.toPageWithTime('/login',3000);
                    }
                }
            })

        }
    }

    changeValueV(n,v) {
        this.setState({
            [n]: v
        });
    }


    render() {
        return (
            <div className='registerSecondStepDom'>
                <NavBar
                    mode="dark"
                    leftContent={Lang.back[this.state.language]}
                    icon={<Icon type="left" />}
                    onLeftClick={() =>  {urls.login()}}
                >{Lang.resetPassword[this.state.language]}</NavBar>
                <SecondStepInputWrapper changeLanguage={this.state.language} getValue={e => this.changeInputValue(e)} changeValueV={(n,v) => this.changeValueV(n,v)}/>
                <Button type="primary" className='confirmBtn'
                        onClick={this.register.bind(this)}>{Lang.submit[this.state.language]}</Button>
            </div>
        )
    }
}

export default RegisterSecondStep;
