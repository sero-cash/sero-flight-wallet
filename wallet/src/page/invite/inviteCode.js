import React, {Component} from 'react';
import {Button, NavBar, Icon, WhiteSpace, List, Toast, Modal, Card} from 'antd-mobile';
import './../../fonts/iconfont/iconfont.css';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import memberURl from './../../common/config.js';
import Axios from './../../service/service.js';
import "./inviteCode.css"
import Utils from "../../common/utils";
import copy from "copy-text-to-clipboard/index";
import {urls} from "../../common/url";

let Item = List.Item
let utils = new Utils();
const Lang = new Language();
const _cc = new Common();
const ajax = new Axios();
let choose = Lang.language.title['zh_CN'];


class InviteCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en_US',
            mobile:'',
            email:'',
            address:'',
            inviteCode:'',
            inviteList:'',
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            this.setState({
                language: _cc.getStorage('language'),
                value:['choose',Lang.language.value[_cc.getStorage('language')]],
            })
        } else {
            this.setState({
                language: 'zh_CN',
                value:['choose','简体中文'],
            })
        }
        document.title = Lang.personal.invite[_cc.getStorage('language')];
        this.getMyInviteCode();

    }
    componentDidMount() {
        let that = this;
    }

    dataList = [
        { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
        { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
        { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
        { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
        { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
    ].map(obj => ({
        icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
        title: obj.title,
    }));

    // showShareActionSheetMulpitleLine = () => {
    //     const data = [[...this.dataList]];
    //     ActionSheet.showShareActionSheetWithOptions({
    //             options: data,
    //             message: '分享',
    //         },
    //         (buttonIndex, rowIndex) => {
    //             this.setState({ clicked2: buttonIndex > -1 ? data[rowIndex][buttonIndex].title : 'cancel' });
    //         });
    // }

    getMyInviteCode() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        if (token) {
            ajax.post(`${memberURl.member}/member/invite/my`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        inviteCode:res.biz,
                    });
                    that.getMyInviteUser(res.biz);
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
    hideMobileInfo = mobile => {
        let newMobile = '';
        if (mobile.length > 7) {
            newMobile=mobile.substr(0, 3) + '****' + mobile.substr(7);
            return newMobile;
        } else {
            return mobile;
        }
    }

    hideEmailInfo= email => {
        if (String (email).indexOf ('@') > 0) {
            let newEmail, str = email.split('@'), _s = '';

            if (str[0].length > 4) {
                _s = str[0].substr (0, 4);
                for (let i = 0; i < str[0].length - 4; i++) {
                    _s += '*';
                }
            } else {
                _s = str[0].substr (0, 1);
                for (let i = 0; i < str[0].length - 1; i++) {
                    _s += '*';
                }
            }
            newEmail = _s + '@' + str[1];
            return newEmail;
        } else {
            return email;
        }
    };

    getMyInviteUser(inviteCode) {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {
            invite_code:inviteCode,
        }
        if (token) {
            let history = that.props.history;

            let i = 1;
            ajax.post(`${memberURl.member}/member/invite/user`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    let dataList = res.biz;
                    let inviteListA = [];
                    if(dataList.length >0){
                        for (let data of dataList){
                            var userName = data.user_name;
                            if(!_cc.validate('email',userName)){
                                userName = that.hideMobileInfo(userName)
                            }else{
                                userName = that.hideEmailInfo(userName)
                            }
                            inviteListA.push(<Item>
                                <div className="listItemDiv">
                                    <div className="l">{i++}</div>
                                    <div className="m">{userName}</div>
                                    <div className="r">{utils.convertUTCDate(data.created_at).substr(0,15)}</div>
                                </div>
                            </Item>);
                        }
                        that.setState({
                            inviteList:inviteListA,
                        })
                    }
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

    // getUserDetail() {
    //     let that = this;
    //     let token = _cc.getStorage('token');
    //     let biz = {}
    //     if (token) {
    //         let history = that.props.history;
    //         ajax.post(`${memberURl.member}/member/detail`, token, biz, function (res) {
    //             if (res.base.code === 'SUCCESS') {
    //                 that.setState({
    //                     mobile:res.biz.mobile,
    //                     email:res.biz.email,
    //                 });
    //             } else {
    //                 Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
    //                 if (res.base.code === 'F0007') {
    //                     setTimeout(  urls.login()) , 1500);
    //                 }
    //             }
    //         })
    //     } else {
    //         that.setState({
    //             loginStatus: false
    //         })
    //          urls.login());
    //     }
    // }

    render() {
        return (
            <>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    leftContent={Lang.back[this.state.language]}
                    onLeftClick={() => {
                        urls.personalCenter()
                    }}
                >
                    {Lang.personal[this.state.language].invite}
                </NavBar>

                <div className="loginDom">
                    <Card full>
                        <Card.Header
                            title={Lang.personal[this.state.language].invite}
                            // extra={<Icon type="ellipsis" onClick={()=>this.showShareActionSheetMulpitleLine()}/>}
                        />
                        <Card.Body>
                            <div className="cardBody">
                                {this.state.inviteCode} <br/>
                                <Button className='copyTxt' type="ghost" onClick={()=>{copy(this.state.inviteCode);Toast.success(Lang.copySucc[this.state.language], 1);}}>{Lang.copy[this.state.language]}</Button>
                            </div>
                            <WhiteSpace size="lg" />
                        </Card.Body>
                    </Card>

                    <WhiteSpace size="lg" />
                    <h2 style={{textAlign:'center'}}>{Lang.myRecord[this.state.language]}</h2>
                    <List>
                        {this.state.inviteList?this.state.inviteList:<Item><span style={{color: 'gray'
                        }}>{Lang.noRecord[this.state.language]}</span></Item>}
                    </List>
                    {/*<div className='bottom'>*/}
                    {/*<Button type="primary">{Lang.genInvite[this.state.language]}</Button>*/}
                    {/*</div>*/}
                </div>
            </>

        );
    }
}

export default InviteCode;