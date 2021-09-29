import React, {Component} from 'react';
import {Button, NavBar, Icon, WhiteSpace, List, Toast, Modal, Card} from 'antd-mobile';
import './../../fonts/iconfont/iconfont.css';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import memberURl from './../../common/config.js';
import Axios from './../../service/service.js';
import "./withdrawReview.css"
import Utils from "../../common/utils";
import BigNumber from "bignumber.js/bignumber";
import {urls} from "../../common/url";

let Item = List.Item
let utils = new Utils();
const Lang = new Language();
const _cc = new Common();
const ajax = new Axios();
const operation = Modal.operation;


class WithdrawReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en_US',
            amount: '',

        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            this.setState({
                language: _cc.getStorage('language'),
                value: ['choose', Lang.language.value[_cc.getStorage('language')]],
            })
        } else {
            this.setState({
                language: 'zh_CN',
                value: ['choose', '简体中文'],
            })
        }
        this.getWithdrawAmount();
        this.getWithdrawList();
    }

    componentDidMount() {
    }


    getWithdrawAmount() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        if (token) {
            ajax.post(`${memberURl.account}/withdraw/amount`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        amount: res.biz.SERO,
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
            urls.login();
        }
    }

    hideMobileInfo = mobile => {
        let newMobile = '';
        if (mobile.length > 7) {
            newMobile = mobile.substr(0, 8) + '****';
            return newMobile;
        } else {
            return mobile;
        }
    }

    hideEmailInfo = email => {
        if (String(email).indexOf('@') > 0) {
            let newEmail, str = email.split('@'), _s = '';

            if (str[0].length > 4) {
                _s = str[0].substr(0, 4);
                for (let i = 0; i < str[0].length - 4; i++) {
                    _s += '*';
                }
            } else {
                _s = str[0].substr(0, 1);
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

    getWithdrawList() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        let page = {
            page_no: 1,
            page_size: 50,
        }
        if (token) {
            ajax.postPages(`${memberURl.account}/withdraw/list`, token, biz, page, function (res) {
                if (res.base.code === 'SUCCESS') {
                    let dataList = res.biz;
                    let inviteListA = [];
                    if (dataList.length > 0) {
                        inviteListA.push(<Item>
                            <div className="listItemDiv">
                                <div className="l">交易号</div>
                                <div className="l">from_pkr</div>
                                <div className="l">金额</div>
                            <div className="l">交易创建时间</div>
                            <div className="l">操作</div>
                            </div>
                        </Item>);

                        for (let data of dataList) {
                            var address = that.hideMobileInfo(data.from);

                            inviteListA.push(<Item>
                                <div className="listItemDiv">
                                    <div className="l">{data.tx_no}</div>
                                    <div className="l">{address}</div>
                                    <div
                                        className="l">{new BigNumber(data.amount).dividedBy(new BigNumber(10).pow(18)).toFixed(2)} {data.currency}</div>
                                    <div className="l">{utils.convertUTCDate(data.created_at)}</div>
                                    <div className="l">{data.verify_state === 1 ? <Button type="ghost" inline size="small"
                                        onClick={() => operation([
                                            { text: <small>{data.tx_no}</small>, onPress: () => console.log("cancel") },
                                            { text: <small>审核通过</small>, onPress: () => that.review(data.tx_no,'passed') },
                                            { text: <small>审核不通过</small>, onPress: () => that.review(data.tx_no,'fail') },
                                        ])}
                                    >审核</Button> : (data.verify_state === 2 ? "已审核" : "审核不通过")}</div>
                                </div>
                            </Item>);
                        }
                        that.setState({
                            inviteList: inviteListA,
                        })
                    }
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
            urls.login();
        }
    }

    review(tx_no,state) {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {
            tx_no: tx_no,
            state:state,
        }
        if (token) {
            ajax.post(`${memberURl.account}/withdraw/review`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    Toast.success('操作成功', 3);
                    window.location.reload();
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
            <div className="loginDom">
                <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                leftContent={Lang.back[this.state.language]}
                onLeftClick={() =>  {urls.personalCenter()}}
                >
                {Lang.personal.invite[this.state.language]}
                </NavBar>

                {/*<WhiteSpace size="lg" />*/}
                <Card full>
                    <Card.Header
                        title=""
                        // extra={<Icon type="ellipsis" onClick={()=>this.showShareActionSheetMulpitleLine()}/>}
                    />
                    <Card.Body>
                        <div className="cardBody">
                            可提现余额: <br/>
                            {new BigNumber(this.state.amount).dividedBy(new BigNumber(10).pow(18)).toFixed(4)} SERO
                        </div>
                        <WhiteSpace size="lg"/>
                    </Card.Body>
                </Card>

                <WhiteSpace size="lg"/>
                <h2 style={{textAlign: 'center'}}>待审核的提现列表</h2>
                <List>
                    {this.state.inviteList ? this.state.inviteList : <Item><span style={{
                        color: 'gray'
                    }}>没有待审核的提现记录</span></Item>}
                </List>
                {/*<div className='bottom'>*/}
                {/*<Button type="primary">{Lang.genInvite[this.state.language]}</Button>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default WithdrawReview;