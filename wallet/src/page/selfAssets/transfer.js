import React, {Component} from 'react';
import {Modal, List, InputItem, Button, TextareaItem, WhiteSpace, NavBar, Icon, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import BigNumber from "bignumber.js"
import base64 from 'base-64'

import './selfAssets.css';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import Axios from "../../service/service";
import accountURL from "../../common/config";
import {urls} from "../../common/url";
import interVal from "../../common/interval";


const Lang = new Language();
const _cc = new Common();
const alert = Modal.alert;
const Item = List.Item;
const ajax = new Axios();
const prompt = Modal.prompt;

const digits = new BigNumber(10);

class InputList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'zh_CN',
        }
    }

    inputValue(e) {
        this.props.changeInputValue(e);
    }

    changeAmountValue(n, v) {
        this.props.changeAmountValue(n, v);
    }

    render() {
        const {getFieldProps} = this.props.form;
        let that = this;
        let toPkr = that.props.toPkr;
        return (
            <div>
                <WhiteSpace/>

                <div>
                    <div className='coin'>
                        <div className='title'>
                            <div className='left'><strong>{that.props.currency}</strong></div>
                            <div className='right'>
                                {Lang.tx[that.props.language].transfer.balance}: {that.props.amount} {that.props.currency}
                            </div>
                        </div>
                        <div className='content'>
                            <InputItem
                                placeholder={Lang.tx[that.props.language].transfer.inputAmount}
                                type='money'
                                name='amountIn'
                                id='amountIn'
                                onBlur={v => this.changeAmountValue('amountIn', v)}
                                onChange={v => this.changeAmountValue('amountIn', v)}
                                moneyKeyboardAlign='left'
                            />
                        </div>
                    </div>

                    <WhiteSpace/>
                    <div className='address'>
                        <div className='title'>
                            <div className='left'>{Lang.tx[that.props.language].transfer.address}</div>
                            <div className='right'>
                            </div>
                        </div>
                        <div className='content'>
                            <TextareaItem
                                placeholder={Lang.tx[that.props.language].transfer.addressPlace}
                                rows='3'
                                name='address'
                                id='address'
                                style={{fontSize: ' 12px'}}
                                defaultValue={toPkr}
                                onBlur={v => this.changeAmountValue('address', v)}
                                onChange={v => this.changeAmountValue('address', v)}
                            />
                        </div>
                    </div>


                    <WhiteSpace/>
                    <div className='address'>
                        <div className='title'>
                            <div className='left'>
                                    <span
                                        style={{fontSize: ' 14px'}}>{Lang.tx[that.props.language].transfer.remark}</span>
                            </div>
                            <div className='right'>
                            </div>
                        </div>
                        <div className='content'>
                            <TextareaItem
                                placeholder={Lang.tx[that.props.language].transfer.remarkPlace}
                                rows='2'
                                name='remark'
                                id='remark'
                                style={{fontSize: ' 12px'}}
                                maxLength="200"
                                onBlur={v => this.changeAmountValue('remark', v)}
                                onChange={v => this.changeAmountValue('remark', v)}
                                count="200"
                            />
                        </div>
                    </div>
                    <WhiteSpace/>
                    <div className='fee'>
                        <div className='title'>
                            <div className='left'>{Lang.tx[that.props.language].fee} </div>
                            <div className='right' style={{textAligh: 'left'}}>
                                <span style={{fontSize: '14px'}}>{that.props.fee} SERO</span>
                            </div>
                        </div>
                    </div>

                    <WhiteSpace/>

                </div>

            </div>
        )
    }
}


const InputListWrapper = createForm()(InputList);

class Transfer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            language: 'en_US',
            amount: 0,
            address: '',
            addressO: '',
            remark: '',
            amountIn: '',
            hasPayPassword: false,
            payPassword: '',
            toPkr: '',
            decimals: '18',
            fee: 0,
            modal2: false,

        }
    }

    componentWillMount() {

        this.setState({
            currency: this.props.match.params.currency,
        })

        if (_cc.getStorage('language')) {
            this.setState({
                language: _cc.getStorage('language'),
            })
        } else {
            this.setState({
                language: 'zh_CN'
            })
        }
        this.getUserDetail();
        this.getAssets();
        this.getDecimals();
        let pkrStg = _cc.getStorage('toPkr');
        if (pkrStg) {
            this.setState({
                toPkr: pkrStg,
                address: pkrStg,
            })
            _cc.removeStorage('toPkr')
        }

        if (this.props.match.params.address) {
            this.setState({
                toPkr: this.props.match.params.address,
                address: this.props.match.params.address,
            })
        }

        this.state.timer = interVal.setIntervalCustomer(() => {
            let that = this;
            that.getAssets();
        }, 5000);

        document.title = Lang.tx[_cc.getStorage('language')].transfer.title;

        // console.log('111:',new BigNumber('111000000000000000000').toString(16));

    }

    getAssets() {
        let that = this;
        let tcurrency = this.props.match.params.currency
        let biz = {
            currency: tcurrency
        };
        let token = _cc.getStorage('token');
        if (token) {

            ajax.post(`${accountURL.account}/assets`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    let dataList = res.biz;
                    for (let data of dataList) {
                        if (tcurrency === data.currency) {
                            let amountR = new BigNumber(data.amount);
                            let frozenR = new BigNumber(data.frozen);
                            let decimals = digits.pow(data.decimals);
                            let toFixed = (data.decimals > 6 ? 6 : data.decimals)
                            that.setState({
                                amount: amountR.minus(frozenR).dividedBy(decimals).toFixed(toFixed),
                                decimals: decimals,
                            })
                        }
                    }
                } else {
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                    if (res.base.code === 'F0007') {
                        _cc.toPageWithTime('/login', 3000);
                    }
                }
            })
        } else {
            _cc.toPage('/login');
        }
    }

    getDecimals() {
        let that = this;
        let tcurrency = this.props.match.params.currency
        let biz = {
            currency: tcurrency
        };
        let token = _cc.getStorage('token');
        if (token) {

            ajax.post(`${accountURL.account}/assets/decimals`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    let theCurrencyFee = res.biz;
                    that.setState({
                        fee: new BigNumber(theCurrencyFee).dividedBy(new BigNumber(10).pow(18)).toFixed(6)
                    })
                }
            })
        } else {
            _cc.toPageWithTime('/login', 3000);
        }
    }

    getUserDetail() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        if (token) {
            let history = that.props.history;
            ajax.post(`${accountURL.member}/member/detail`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        hasPayPassword: res.biz.has_pay_password,
                        addressO: res.biz.address,
                    });
                    if (res.biz.mobile === '') {
                        Toast.fail(Lang.errorCode[that.state.language]["F0010"], 5);

                        setTimeout(() => {
                            _cc.toPage('/personal/safety/mobile');
                        }, 3000);
                    }
                } else {
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 3);
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

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    transferConfirm() {
        let that = this;
        if (!that.state.hasPayPassword) {
            Toast.fail(Lang.failCode[that.state.language].noPaymentPasswrord, 2);
            setTimeout(() => {
                _cc.toPage('/personal/safety/payPassword/modify')
            }, 3000);
        } else {

            let amountIn = new BigNumber(this.state.amountIn);//输入框
            let amountT = new BigNumber(this.state.amount);//账户
            let toAddress = this.state.address;

            if (this.state.amountIn === '' || amountIn.eq(0)) {
                Toast.fail(Lang.failCode[that.state.language].inputAmount, 1.5);
            } else if (toAddress === '') {
                Toast.fail(Lang.failCode[that.state.language].inputAddress, 1.5);
            } else if (toAddress === this.state.addressO) {
                Toast.fail(Lang.failCode[that.state.language].receiveAddress, 1.5);
            } else if (!_cc.validate('address', toAddress)) {
                Toast.fail(Lang.failCode[that.state.language].invalidAddress, 1.5);
            } else {
                // console.log(amountT * 1e18, amountIn * 1e18, amountT * 1e18 < amountIn * 1e18)
                if (amountT.comparedTo(amountIn) < 0) {
                    Toast.fail(Lang.failCode[that.state.language].noEnoughAmount, 1.5);
                } else {

                    this.setState({
                        modal2: true,
                    });
                }
            }
        }
    }

    transferTo(paypassword) {

        let that = this;
        let amountIn = new BigNumber(this.state.amountIn);//输入框
        let toAddress = this.state.address;

        let biz = {
            to: toAddress,
            amount: amountIn.times(that.state.decimals).toString(16),
            currency: this.props.match.params.currency,
            pay_password: paypassword,
            remark: base64.encode(encodeURI(that.state.remark))
        };
        if (paypassword === '') {
            Toast.fail(Lang.failCode[that.state.language].inputPaymentPasswrord, 1.5);
        } else {
            let token = _cc.getStorage('token');
            if (token) {
                ajax.post(`${accountURL.account}/assets/tx/transfer`, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {
                        Toast.success(Lang.successCode[that.state.language].transfer, 5);
                        _cc.toPageWithTime(`/assets/tx/${that.state.currency}`, 3000)
                    } else {
                        that.setState({
                            payPassword: '',
                        });
                        if (res.base.message === 'Insufficient balance') {
                            Toast.fail(Lang.errorCode[that.state.language].INSUFFICIENTBALANCE, 2);
                        } else if (res.base.desc.indexOf('convert') > -1 && res.base.desc.indexOf('to BigInt') > -1) {
                            Toast.fail(Lang.errorCode[that.state.language].MoreThanMaximumDecimal, 2);
                        } else if (res.base.desc.indexOf('Not enough') > -1) {
                            Toast.fail(res.base.desc, 2);
                        } else {
                            Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                        }
                        if (res.base.code === 'F0007') {
                            _cc.toPage('/login');
                        }
                    }
                })
            } else {
                _cc.toPage('/login');
            }
        }
    }

    changeInputValue(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue.trim()
        });
    }

    changeAmountValue(n, v) {
        this.setState({
            [n]: v.trim()
        });
    }

    payPassword(v) {
        this.setState({
            payPassword: v.trim()
        });
    }


    promptConfirm() {

        prompt(Lang.paymentCode[this.state.language], '',
            [
                {
                    text: Lang.cancel[this.state.language],
                    onPress: () => {
                        console.log('cancel')
                    },
                },
                {
                    text: Lang.OK[this.state.language],
                    onPress: paypassword => {
                        this.transferTo(paypassword);
                    },
                },
            ], 'secure-text', null, [Lang.inputPayPassword[this.state.language]]);

    }


    render() {
        return (
            <div>
                <NavBar
                mode="dark"
                icon={<Icon type="left"/>}
                leftContent={Lang.back[this.state.language]}
                // onLeftClick={() => this.props.history.go()}
                onLeftClick={() =>  {urls.assets()}}
                >
                {Lang.tx[this.state.language].transfer.title}
                </NavBar>


                <div className='withdraw'>
                    <InputListWrapper amount={this.state.amount} changeInputValue={e => this.changeInputValue(e)}
                                      language={this.state.language} fee={this.state.fee}
                                      currency={this.props.match.params.currency}
                                      changeAmountValue={(n, v) => this.changeAmountValue(n, v)}
                                      toPkr={this.state.toPkr}/>
                    <div className='bottom'>
                        <Button type="primary" disabled={(this.state.amountIn && this.state.address) ? false : true}
                                onClick={() => this.transferConfirm()
                                }>{Lang.tx[this.state.language].transfer.button}</Button>
                    </div>
                </div>


                <WhiteSpace/>
                <Modal
                    popup
                    visible={this.state.modal2}
                    // visible={true}
                    onClose={this.onClose('modal2')}
                    animationType="slide-up"
                    // afterClose={() => { alert('afterClose'); }}
                >
                    <div>
                        <h2 style={{color: '#000'}}>{new BigNumber(this.state.amountIn).toFixed(6)} {this.props.match.params.currency}</h2>
                        <List className="my-list">
                            <Item>
                                <div className="payConfirm">
                                    <div className="l"><span>{Lang.tx[this.state.language].detail.type}</span></div>
                                    <div className="r"><span>{Lang.tx[this.state.language].type.out}</span></div>
                                </div>
                            </Item>
                            <Item>
                                <div className="payConfirm">
                                    <div className="l"><span className='paymentPassword'
                                                             style={{fontSize: '10px;'}}>{Lang.tx[this.state.language].detail.receiveAddress}</span>
                                    </div>
                                    <div className="r">
                                        <span className='paymentPassword'>{this.state.address}</span>
                                    </div>
                                </div>
                            </Item>
                            <Item>
                                <div className="payConfirm">
                                    <div className="l"><span>{Lang.tx[this.state.language].detail.fee}</span></div>
                                    <div className="r">
                                        <span>{this.state.fee} SERO</span>
                                    </div>
                                </div>
                            </Item>
                            <Item>
                                <div className="payConfirm">
                                    <div className="l"><span>{Lang.tx[this.state.language].detail.remark}</span></div>
                                    <div className="r">
                                        <span className='textAutoHidden'>{this.state.remark}</span>
                                    </div>
                                </div>
                            </Item>

                            <Item>
                                <Button type="primary"
                                        onClick={() => this.promptConfirm()}>{Lang.submit[this.state.language]}</Button>
                            </Item>
                        </List>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default Transfer;
