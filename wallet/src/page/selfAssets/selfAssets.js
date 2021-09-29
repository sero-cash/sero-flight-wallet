import React, {Component} from 'react';
import {Modal, Button, Toast, TabBar, Card, WingBlank, WhiteSpace, NavBar, Icon} from 'antd-mobile';

import './selfAssets.css';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import accountURL from './../../common/config.js';
import Axios from './../../service/service.js';
import QRCode from 'qrcode';

import memberURl from "../../common/config";
import copy from "copy-text-to-clipboard/index"
import BigNumber from "bignumber.js/bignumber";
import {urls} from "../../common/url";
import interVal from "../../common/interval";

let alert = Modal.alert;
let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();

let digits = new BigNumber(10);

class SelfAssets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: '',
            language: 'zh_CN',
            symbol: '',
            address: '',
            balance: '',
            accountList: '',
            account_id: '',
            monValue: '',
            addressValue: '',
            menuTitle: 'SERO FLIGHT',
            selectedTab: 'home',
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            this.setState({
                language: _cc.getStorage('language'),
            })
        } else {
            this.setState({
                language: 'zh_CN',
            })
            _cc.setStorage('language','zh_CN')
        }
        this.getAssets();
        this.getUserDetail();

        this.state.timer = interVal.setIntervalCustomer(() => {
            let that = this;
            that.getAssets();
        }, 10000);


        // console.log("5:",new BigNumber(5).multipliedBy(new BigNumber(10).pow(18)).toString(16));
        // console.log("10:",new BigNumber(10).multipliedBy(new BigNumber(10).pow(18)).toString(16));
        // console.log("15:",new BigNumber(15).multipliedBy(new BigNumber(10).pow(18)).toString(16));
        // console.log("20:",new BigNumber(20).multipliedBy(new BigNumber(10).pow(18)).toString(16));
        // console.log("25:",new BigNumber(25).multipliedBy(new BigNumber(10).pow(18)).toString(16));
        // console.log("35:",new BigNumber(35).multipliedBy(new BigNumber(10).pow(18)).toString(16));
        // console.log("40:",new BigNumber(40).multipliedBy(new BigNumber(10).pow(18)).toString(16));
        // console.log("50:",new BigNumber(50).multipliedBy(new BigNumber(10).pow(18)).toString(16));
        // console.log("80:",new BigNumber(80).multipliedBy(new BigNumber(10).pow(18)).toString(16));
        // console.log("220:",new BigNumber(220).multipliedBy(new BigNumber(10).pow(18)).toString(16));

    }


    componentDidMount() {
        let hei = this.state.height;
        setTimeout(() => this.setState({
            height: hei
        }), 0);

    }

    getAssets() {
        let that = this;
        let biz = {};
        let token = _cc.getStorage('token');
        let llanguage = _cc.getStorage('language')
        if (token) {
            let available = Lang.assets[llanguage].amountTitle.available;
            let frozen = Lang.assets[llanguage].amountTitle.frozen;
            let total = Lang.assets[llanguage].amountTitle.total;

            ajax.post(`${accountURL.account}/assets`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    let arrList = [];
                    let dataList = res.biz;
                    let count = 1;
                    for (let data of dataList) {
                        that.setState({
                            [`visible${count}`]: false
                        });
                        let decimals_t = digits.pow(data.decimals);
                        let frozen_t = new BigNumber(data.frozen).dividedBy(decimals_t);
                        let amount_t = new BigNumber(data.amount).dividedBy(decimals_t);
                        let currency_t = data.currency;

                        let toFixed = (data.decimals >6?6:data.decimals);

                        arrList.push(
                            <div className="assetsDom">

                                <WingBlank size="lg">
                                    <WhiteSpace size="lg"/>
                                    <Card onClick={() => {
                                        _cc.toPage("/assets/tx/" + currency_t)
                                    }}  key={count}>
                                        <Card.Header
                                            title={<span style={{
                                                color: '#008cec',
                                                fontWeight: 'bold',
                                            }}>{currency_t.toUpperCase()}</span>}
                                            extra={<span style={{color: 'rgb(0, 140, 236)'}}>&gt;</span>}
                                        />
                                        <Card.Body>
                                            <div>
                                                <div className='account'>
                                                    <span>{available}</span><br/>
                                                    {amount_t.minus(frozen_t).toFixed(toFixed)}
                                                </div>
                                                <div className='account'>
                                                    <span>{frozen}</span><br/>
                                                    {frozen_t.toFixed(toFixed)}
                                                </div>
                                                <div className='account'>
                                                    <span>{total}</span><br/>
                                                    {amount_t.toFixed(toFixed)}
                                                </div>
                                            </div>
                                        </Card.Body>
                                        {/*<Card.Footer content="footer content" extra={<Button type="ghost" size="small">充值</Button>} />*/}
                                    </Card>
                                </WingBlank>


                            </div>
                        )
                        count++;
                    }
                    if(arrList.length >0){
                        arrList.push(<div style={{height:60}}></div>)
                    }
                    that.setState({
                        accountList: arrList
                    })
                } else {
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                    if (res.base.code === 'F0007') {
                        _cc.toPageWithTime('/login',3000);
                    }
                }
            })
        } else {
            _cc.toPageWithTime('/login',3000);
        }
    }

    //充值
    rechargeFun(address) {
        let that = this;
        // let newAddress = '';
        // if (address.length > 20) {
        // let str1 = address.substring(0, 10);
        // let str2 = address.substring(address.length - 10, address.length)
        // newAddress = str1 + '...' + str2;
        // } else {
        //     newAddress = address;
        // }
        alert(Lang.tx[that.state.language].button.in,
            <div>
                <canvas id="qrImg"/>
                <p style={{marginTop: '0', fontSize: '12px'}} className='paymentPassword'>{address}</p>
                <Button className='copyTxt' onClick={()=>{copy(address);Toast.success(Lang.copySucc[that.state.language], 1);}}>{Lang.copy[that.state.language]}</Button>
            </div>
            , [
                {text: Lang.cancel[that.state.language], onPress: () => console.log('cancel')},
                {text: Lang.OK[that.state.language], onPress: () => console.log('ok')},
            ])
        var canvas = document.getElementById('qrImg')
        QRCode.toCanvas(canvas, address, function (error) {
            if (error) console.error(error)
            console.log('success!');
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
                    _cc.setStorage('pkrAddress', res.biz.address)
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
            _cc.toPageWithTime('/login',3000);
        }
    }


    render() {
        return (

            <div>
                <div style={{position: 'fixed', width: '100%', top: 0,zIndex:'999' }}>
                <NavBar
                    mode="dark"
                    leftContent={<Icon type="anticon-qr_code_icon"
                                       onClick={e => this.rechargeFun(this.state.address)}/>}
                    rightContent={
                        <Icon type="anticon-saomiao" onClick={() =>  {window.location.href="./scan.html"}}/>
                    }
                >
                    {this.state.menuTitle}

                </NavBar>
                </div>
                <div className='selfAssetsDom'>
                    <div>

                        {
                            this.state.accountList.length > 0 ? (this.state.accountList) : (
                                <div className="noAssets">{Lang.noAssets[this.state.language]}</div>)
                        }

                    </div>
                </div>
                <div style={{position: 'fixed', width: '100%', bottom: 0,zIndex:999 }}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"

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
        )
    }
}

export default SelfAssets;
