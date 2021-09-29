import React, {Component} from 'react';
import { InputItem, Button, TextareaItem, Toast,NavBar,Icon} from 'antd-mobile';
import {createForm} from 'rc-form';
import './modifyPasswd1.css';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import memberURl from './../../common/config.js';
import Axios from './../../service/service.js';
import {urls} from "../../common/url";

let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();

class SecondStepInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: _cc.getStorage('email'),
            mobile:_cc.getStorage('mobile'),
            isEmail:_cc.getStorage('isEmail') === 'true',
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
        let {getFieldProps} = this.props.form;
        let userName = this.state.isEmail?_cc.getStorage('email'):_cc.getStorage('mobile');
        return (
            <div>
                <TextareaItem
                    {...getFieldProps('chooseCoin', {
                        initialValue: userName,
                    })}
                    title={this.state.isEmail?Lang.email[this.props.changeLanguage]:Lang.mobile[this.props.changeLanguage]}
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
                        onBlur={v=> this.onchangeValueV('passAgain',v)}
                        onKeyUp={e => this.getPassValue(e)}
                    >{Lang.confirm[this.props.changeLanguage]}</InputItem>
                </div>
            </div>
        )
    }
}

let SecondStepInputWrapper = createForm()(SecondStepInput);

class ModifySecondStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en_US',
            password: '',
            passAgain: '',
            sh : 'login'
        }
    }

    changeValueV(n,v) {
        this.setState({
            [n]: v
        });
    }


    componentWillMount() {
        if (_cc.getStorage('language')) {
            this.setState({
                language: _cc.getStorage('language'),
                passwordType: _cc.getStorage('passwordType')
            })
        } else {
            this.setState({
                language: 'zh_CN',
                passwordType: _cc.getStorage('passwordType')
            })
        }
        document.title = this.state.passwordType === 'login'?Lang.findPassword[_cc.getStorage('language')]:Lang.findPayPassword[_cc.getStorage('language')];
    }

    changeInputValue(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
    }

    modify(e) {
        let that = this;
        let password = this.state.password;
        let passAgain = this.state.passAgain;
        let isEmail = (_cc.getStorage('isEmail') === 'true')
        let passwordType = _cc.getStorage('passwordType')

        let userName = '';
        let reqUrl = '';
        if (isEmail) {
            userName = _cc.getStorage('email');
        } else {
            userName = _cc.getStorage('mobile');
        }
        if(passwordType === 'login'){
            reqUrl = `${memberURl.member}/member/password/set`;
        }else{
            reqUrl = `${memberURl.member}/member/payPassword/set`;
        }

        let biz = {
            user_name: userName,
            password: password,
            code: _cc.getStorage('code')
        }
        let token = _cc.getStorage('token');
        if (token) {
            if (password === '' || passAgain === '') {
                Toast.fail(Lang.passwordEmpty[that.state.language], 2);
            } else if (password !== passAgain) {
                Toast.fail(Lang.differentPassword[that.state.language], 2);
            } else if (!_cc.validate('password',password)) {
                Toast.fail(Lang.invalidPassword[that.state.language], 2);
            } else {
                ajax.post(reqUrl, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {
                        _cc.removeStorage('email');
                        _cc.removeStorage('prefix');
                        _cc.removeStorage('mobile');
                        _cc.removeStorage('code');
                        _cc.removeStorage('isEmail');
                        _cc.removeStorage('passwordType');

                        Toast.success(Lang.updateSucc[that.state.language], 2);
                        _cc.toPageWithTime('/personal/safety',2000);
                    }
                    else {
                        Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                        if (res.base.code === 'F0007') {
                            _cc.toPageWithTime('/login',3000);
                        }
                    }
                })

            }
        } else {
            that.setState({
                loginStatus: false
            })
            _cc.toPageWithTime('/login',3000);
        }

    }

    render() {
        return (
            <div className='modifySecondStepDom'>
                <NavBar
                    mode="dark"
                    leftContent={Lang.back[this.state.language]}
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        urls.back()
                    }}
                >{this.state.passwordType === 'login'?Lang.findPassword[this.state.language]:Lang.findPayPassword[this.state.language]}</NavBar>
                <SecondStepInputWrapper changeLanguage={this.state.language} getValue={e => this.changeInputValue(e)} changeValueV={(n,v) => this.changeValueV(n,v)}/>
                <Button type="primary" className='confirmBtn'
                        onClick={e => this.modify(e)}>{Lang.submit[this.state.language]}</Button>
            </div>
        )
    }
}

export default ModifySecondStep;
