import React, {Component} from 'react';
import {List, Toast, Badge, TabBar, Icon, NavBar} from 'antd-mobile';
import './personalCenter.css';
import Language from './../../language/language.js';
import initAvatar from './../../img/initAvatar.png';
import Common from './../../common/common.js';
import memberURl from './../../common/config.js';
import mediaURL from './../../common/config.js';
import Axios from './../../service/service.js';
import axios from 'axios';
import {urls} from "../../common/url";
import interVal from "../../common/interval";

let Item = List.Item;
let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();

// let Brief = Item.Brief;

class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en_US',
            loginStatus: true,
            userName: '',
            nickName: '',
            address: '',
            unreadNoticeCount: '',
            menuTitle: '',
            selectedTab: 'my',
            timer:'',
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            this.setState({
                language: _cc.getStorage('language'),
                menuTitle: Lang.menus.tabBarPersonal[_cc.getStorage('language')]
            })
        } else {
            this.setState({
                language: 'zh_CN',
                menuTitle: Lang.menus.tabBarPersonal[_cc.getStorage('language')]
            })
        }
        this.getUserDetail();

        this.state.timer=interVal.setIntervalCustomer(()=>{
            let that = this;
            // that.getUnreadNoticeCount();
            if (_cc.getStorage('language')) {
                that.setState({
                    language: _cc.getStorage('language'),
                    menuTitle: Lang.menus.tabBarPersonal[_cc.getStorage('language')]
                })
            } else {
                that.setState({
                    language: 'zh_CN',
                    menuTitle: Lang.menus.tabBarPersonal[_cc.getStorage('language')]
                })
            }
        }, 500);

    }



    getUserDetail() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        if (token) {

            ajax.post(`${memberURl.member}/member/detail`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        userName: res.biz.email ? res.biz.email : res.biz.mobile,
                        nickName: res.biz.nick_name,
                        address: res.biz.address,
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
            urls.login();
        }
    }

    getUnreadNoticeCount() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        if (token) {
            that.setState({
                loginStatus: true
            })
            ajax.post(`${memberURl.message}/notice/count`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        unreadNoticeCount: res.biz
                    })
                } else {
                    // urls.login();
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                }
            })
        } else {
            that.setState({
                loginStatus: false
            })
            _cc.toPageWithTime('/login',3000);
        }
    }

    componentDidMount() {
        // document.getElementsByClassName('select')[0].style.display = 'none';
        document.getElementsByClassName('am-navbar-title')[0].style.display = 'none';
    }

    toPage(type) {
        if(document.readyState === 'complete'){
            if (this.state.loginStatus === false && type !== 5) {
                _cc.toPageWithTime('/login',3000);
            } else {
                if (type === 'address') {
                    urls.personalAddress()
                } else if (type === 'message') {
                    urls.message();
                } else if (type === 'setting') {
                    urls.settings();
                } else if (type === 'safety') {
                    urls.safety();
                } else if (type === 'contract') {
                    urls.contract();
                } else if (type === 'invite') {
                    urls.invite();
                } else if (type === 'about') {
                    urls.about()
                }
            }
        }
    }

    uploadAvatar(e) {
        console.info(e.target.files[0]);
        let formData = new FormData;
        formData.append("uploadfile", e.target.files[0]);
        axios.post(`${mediaURL.media}/upload`, formData
        ).then(function (response) {
            let data = response.data
            console.info(data);
            // if(callback){
            //   callback(data);
        }).catch(function (error) {
            // Toast.fail('请求失败，请稍后再试！', 2);
        })
    }

    renderContent(pageText) {

        if (pageText === 'home') {
            urls.assets();
        } else if (pageText === 'news') {
            urls.news()
        } else if (pageText === 'discover') {
            urls.others()
        } else if (pageText === 'my') {
            urls.personalCenter()
        }

    }


    render() {
        return (
            <div className='layoutDom'>
                <NavBar
                    mode="dark"
                    leftContent="FLIGHT"
                    style={{zIndex: 100, position: 'fixed'}}
                >
                    {Lang.menus.tabBarPersonal[this.state.language]}

                </NavBar>

                <div className='personalCenterDom'>


                    {
                        this.state.loginStatus ? (<div className='personalInfo'>
                                <div className='userAvatar'>
                                    <img src={initAvatar} className='avatarImg' alt=''/>
                                    {/*<form id="upload" encType="multipart/form-data" method="post">*/}
                                    {/*<input type="file" name="file" id="pic" onChange={e => this.uploadAvatar(e)}/>*/}
                                    {/*</form>*/}
                                </div>
                                <div className='userInfo'>
                                    <p className='userName'>
                                        Address: <small>{this.state.address.substring(0, 10) + '...' + this.state.address.substring(this.state.address.length - 10)}</small>
                                    </p>
                                    <p className='userName'>{this.state.userName}</p>
                                    <p className='userAddress'>{this.state.nickName}</p>
                                </div>
                            </div>)
                            : (<List className="user-list">
                                <Item arrow="horizontal" onClick={() => {
                                    urls.login();
                                }}>{Lang.loginRegister[this.state.language]}</Item>
                            </List>)
                    }

                    <List className="my-list">
                        {/*<Item thumb="./assets/img/address.svg"*/}
                        {/*arrow="horizontal"*/}
                        {/*onClick={() => this.toPage('address')}>{Lang.personal.address[this.state.language]}</Item>*/}
                        <Item
                            thumb="./assets/img/notice.svg"
                            arrow="horizontal" extra={<Badge text={this.state.unreadNoticeCount} overflowCount={10}/>}
                            onClick={() => this.toPage('message')}>{Lang.personal.message[this.state.language]}</Item>
                        <Item
                            thumb="./assets/img/settings.svg"
                            arrow="horizontal"
                            onClick={() => this.toPage('setting')}>{Lang.personal.setting[this.state.language]}</Item>
                        <Item
                            thumb="./assets/img/safety.svg"
                            arrow="horizontal"
                            onClick={() => this.toPage('safety')}>{Lang.personal.safety[this.state.language]}</Item>
                        <Item
                            thumb="./assets/img/term.svg"
                            arrow="horizontal"
                            onClick={() => this.toPage('contract')}>{Lang.personal.contract[this.state.language]}</Item>
                        <Item
                            thumb="./assets/img/help.svg"
                            arrow="horizontal"
                            onClick={() => this.toPage('invite')}>{Lang.personal.invite[this.state.language]}</Item>
                        <Item
                            thumb="./assets/img/about.svg"
                            arrow="horizontal"
                            onClick={() => this.toPage('about')}>{Lang.personal.about[this.state.language]}</Item>
                    </List>

                    <div style={{position: 'fixed', width: '100%', bottom: 0}}>
                        <TabBar
                            unselectedTintColor="#949494"
                            tintColor="#33A3F4"
                            barTintColor="white"
                            hidden={this.state.hidden}
                        >
                            <TabBar.Item
                                title={Lang.menus.tabBarHome[this.state.language]}
                                key={Lang.menus.tabBarHome[this.state.language]}
                                icon={<Icon type="anticon-Myassets1"/>}
                                selectedIcon={<Icon type="anticon-Myassets"/>}

                                selected={this.state.selectedTab === 'home'}
                                onPress={() => {
                                    this.renderContent('home')
                                }}
                                data-seed="logId"
                            >

                            </TabBar.Item>

                            {/*<TabBar.Item*/}
                                {/*icon={<Icon type="anticon-news"/>}*/}
                                {/*selectedIcon={<Icon type="anticon-news1"/>}*/}
                                {/*title={Lang.menus.tabBarNews[this.state.language]}*/}
                                {/*key={Lang.menus.tabBarNews[this.state.language]}*/}
                                {/*selected={this.state.selectedTab === 'news'}*/}
                                {/*onPress={() => {*/}
                                    {/*this.renderContent('news')*/}
                                {/*}}*/}
                                {/*data-seed="logId1"*/}
                            {/*>*/}
                            {/*</TabBar.Item>*/}

                            <TabBar.Item
                                icon={<Icon type="anticon-jiaoyi2"/>}
                                selectedIcon={<Icon type="anticon-jiaoyi1"/>}
                                title={Lang.menus.tabExchange[this.state.language]}
                                key={Lang.menus.tabExchange[this.state.language]}
                                selected={this.state.selectedTab === 'discover'}
                                onPress={() => {
                                    this.renderContent('discover')
                                }}
                            >
                            </TabBar.Item>

                            <TabBar.Item
                                icon={<Icon type="anticon-personal"/>}
                                selectedIcon={<Icon type="anticon-personal1"/>}
                                title={Lang.menus.tabBarPersonal[this.state.language]}
                                key={Lang.menus.tabBarPersonal[this.state.language]}
                                selected={this.state.selectedTab === 'my'}
                                onPress={() => {
                                    this.renderContent('my')
                                }}

                            >
                            </TabBar.Item>
                        </TabBar>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalCenter;
