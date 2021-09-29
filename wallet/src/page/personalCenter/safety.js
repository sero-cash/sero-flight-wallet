import React, {Component} from 'react';
import { List,WhiteSpace,NavBar,Icon } from 'antd-mobile';

import Language from './../../language/language.js';
import Axios from './../../service/service.js';
import Common from './../../common/common.js';
import {Toast} from "antd-mobile/lib/index";
import memberURl from "../../common/config";
import {urls} from "../../common/url";

let Item = List.Item;
let Brief = Item.Brief;

let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();


class Safety extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            language: 'zh_CN',
            email:'',
            mobile:'',
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
        document.title = Lang.personal.safety[_cc.getStorage('language')];

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
                        mobile: res.biz.mobile,
                        hasPayPassword: res.biz.has_pay_password,
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
            urls.login()
        }
    }

    toPage(tag){
        if(tag === 'email'){
            if(!this.state.email){
                urls.safetyEmail();
            }
        }else if(tag === 'mobile'){
            if(!this.state.mobile){
                urls.safeMobile();
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
                    onLeftClick={() =>  {urls.personalCenter()}}
                >
                    {Lang.personal.setting[this.state.language]}
                </NavBar>
                <WhiteSpace/>

                <Item arrow={this.state.email?"":"horizontal"} extra={this.state.email?"":Lang.safety.bandEmail[this.state.language]} multipleLine onClick={() => {this.toPage('email') }}>
                    {Lang.email[this.state.language]} <Brief>{this.state.email?this.state.email:Lang.safety.unbound[this.state.language]}</Brief>
                </Item>

                <Item arrow={this.state.mobile?"":"horizontal"} extra={this.state.mobile?"":Lang.safety.bandMobile[this.state.language]} multipleLine onClick={() => {this.toPage('mobile')}}>
                    {Lang.mobile[this.state.language]} <Brief>{this.state.mobile?this.state.mobile:Lang.safety.unbound[this.state.language]}</Brief>
                </Item>

                <Item arrow="horizontal" extra={Lang.findPassword[this.state.language]} multipleLine onClick={() => { urls.safePasswordModify() }}>
                    {Lang.password[this.state.language]} <Brief>{Lang.safety.hasSet[this.state.language]}</Brief>
                </Item>

                <Item arrow="horizontal" extra={this.state.hasPayPassword?Lang.findPayPassword[this.state.language]:Lang.setPayPassword[this.state.language]} multipleLine onClick={() => { urls.safePayPasswordModify() }}>
                    {Lang.payPassword[this.state.language]} <Brief>{this.state.hasPayPassword?Lang.safety.hasSet[this.state.language]:Lang.safety.notSet[this.state.language]}</Brief>
                </Item>



                <WhiteSpace/>
            </div>
        )
    }
}

export default Safety;
