import React, {Component} from 'react';
import {Icon, NavBar, List, WhiteSpace,Button} from 'antd-mobile';

import Language from './../../language/language.js';
import Common from './../../common/common.js';
import accountURL from "../../common/config";
import Axios from "../../service/service";
import Utils from "../../common/utils";
import {Toast} from "antd-mobile/lib/index";
import BigNumber from "bignumber.js/bignumber";
import base64 from 'base-64'
import copy from "copy-text-to-clipboard/index";
import {urls} from "../../common/url";

let Item = List.Item;
let ajax = new Axios();

let Lang = new Language();
let _cc = new Common();
let utils = new Utils();


class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            language: 'en_US',
            tx: '',
            pkr:'',
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

        document.title = Lang.tx[_cc.getStorage('language')].detail.title

    }

    getUserDetail() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        if (token) {
            that.setState({
                loginStatus: true
            })
            ajax.post(`${accountURL.member}/member/detail`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        pkr: res.biz.address,
                    })
                    that.getTxDetail();
                } else {
                    // urls.login();
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                    if (res.base.code === 'F0007') {
                        _cc.toPage('/login');
                    }
                }
            })
        } else {
            that.setState({
                loginStatus: false
            })
            _cc.toPage('/login');
        }
    }

    decodeBase64(str){
        try{
            return decodeURI(base64.decode(str));
        }catch(e) {
            console.log('decode err ,',e);
            return str;
        }
        return str;
    }

    getTxDetail() {
        let that = this;
        let biz = {
            tx_no: this.props.match.params.txNo,
        };
        let token = _cc.getStorage('token');
        if (token) {
            ajax.post(`${accountURL.account}/assets/tx/detail`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    let data = res.biz;
                    let amount = new BigNumber(data.amount);
                    let fee = new BigNumber(data.fee);
                    let total = new BigNumber(0);
                    let digits = new BigNumber(10);
                    let decimals = digits.pow(data.decimals);
                    let toFixed = (data.decimals >6?6:data.decimals)
                    let inT = <small style={{fontSize:'50%'}}>{'('+Lang.tx[that.state.language].fee+':'+fee.dividedBy(new BigNumber(10).pow(18)).toFixed(toFixed)+' SERO)'}</small>;
                    let type = '';
                    let fh = '';
                    if(data.to === that.state.pkr){
                        total = amount.dividedBy(decimals).toFixed(toFixed);
                        inT = '';
                        type = Lang.tx[that.state.language].type.in;
                        fh = '+';
                    }else{
                        total = amount.dividedBy(decimals).toFixed(toFixed);
                        type = Lang.tx[that.state.language].type.out
                        fh = '-'
                    }

                    if(data.from !== data.feePkr){
                        inT = '';
                    }


                    let state = data.state === 4 ? Lang.tx[that.state.language].status.completed : (data.state === 5 ?Lang.tx[that.state.language].status.fail :Lang.tx[that.state.language].status.processing);
                    let tx = <div className='txDetail'>
                        <h1 style={{textAlign: 'center'}}>{fh + ' ' + total + " " + data.currency}<br/>
                            {inT}
                            </h1>

                        <Item multipleLine>
                            <span className="txDetailLeft">{Lang.tx[that.state.language].detail.type}: </span><span className="txDetailRight">{type}</span>
                        </Item>
                        <Item multipleLine>
                            <span className="txDetailLeft">{Lang.tx[that.state.language].detail.state}: </span><span className="txDetailRight">{state}</span>
                        </Item>
                        <Item>
                            <span className="txDetailLeft">{Lang.tx[that.state.language].detail.time}: </span><span className="txDetailRight">{utils.convertUTCDate(data.created_at)}</span>
                        </Item>
                        <Item multipleLine>
                            <span className="txDetailLeft">{Lang.tx[that.state.language].detail.receiveAddress}: </span><span className="txDetailRight2">{data.to}<Button className='copyTxt' onClick={()=>{copy(data.to);Toast.success(Lang.copySucc[that.state.language], 1);}}>{Lang.copy[that.state.language]}</Button></span>
                        </Item>
                        <Item multipleLine>
                            <span className="txDetailLeft">{Lang.tx[that.state.language].detail.remark}: </span><span className="txDetailRight2">
                            {that.decodeBase64(data.remark)  }
                            </span>
                        </Item>
                        {
                            data.tx_hash?
                            <Item multipleLine>
                            <span className="txDetailLeft">{Lang.tx[that.state.language].detail.txHash}: </span><span className="txDetailRight2">
                                {data.tx_hash }
                            </span>
                            </Item>:""
                        }

                    </div>;

                    that.setState({
                        tx: tx,
                    })
                } else {
                    _cc.toPage('/login');
                }
            })
        } else {
             _cc.toPage('/login');
        }
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    leftContent={Lang.back[this.state.language]}
                    onLeftClick={() => {
                        urls.back()
                    }}
                >
                    {Lang.tx[this.state.language].detail.title}
                </NavBar>
                <WhiteSpace/>

                {this.state.tx}
            </div>
        )
    }
}

export default News;
