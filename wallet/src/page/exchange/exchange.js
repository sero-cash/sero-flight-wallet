import React, {Component} from 'react';
import {
    NavBar,
    Icon,
    Drawer,
    Toast,
    List,
    Flex,
    WhiteSpace,
    InputItem,
    Slider,
    Button,
    Tabs,
    Modal,
    Card,
    TabBar
} from 'antd-mobile';

import Language from './../../language/language.js';
import Common from './../../common/common.js';
import memberURl from "../../common/config";
import Axios from './../../service/service.js';
import "./exchange.css"
import BigNumber from "bignumber.js/bignumber";
import {urls} from "../../common/url";
import interVal from "../../common/interval";

let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();
const digits = new BigNumber(10);
const decimal = new BigNumber(10).pow(8);
const prompt = Modal.prompt;

class Exchange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: _cc.getLanguage(),
            selectedTab: 'discover',
            userId: '',
            open: false,
            iconType: 'anticon-zhankai',
            coinsArray: [],
            marketsArray: [],
            exchangeCoinNo: '',
            currency: '',
            baseCurrency: '',
            price: "0.000",
            account: "0.0000",
            available: "",
            buyAmount: 0,
            buyPrice: 0,
            sellAmount: 0,
            sellPrice: 0,
            sellAvailable: "",
            tradeOrders: [],
            sellArray: [],
            buyArray: [],
            currentTradeArray: [],
            avgPrice: 0,
            baseCurrencyDecimal: 18,

            currency_decimal: 6,
            base_currency_decimal: 6,
            showOrders:true,

        }
    }

    componentWillMount() {

        window.removeEventListener('resize', this.resize) // 移除监听

        this.getUserDetail();
        this.getExchangeCoins();

        this.state.timer = interVal.setIntervalCustomer(() => {
            let that = this;
            if (that.state.currency) {
                that.getExchangeMarketView(that.state.currency);
                that.getExchangeMarketOrders(that.state.currency)
                that.getTradeStatic(that.state.currency)
            }
        }, 10000);

    }

    resize = () => {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        if (this.state.clientHeight > clientHeight) { // 键盘弹出
            this.inputClickHandle()
        } else { // 键盘收起
            this.inputBlurHandle()
        }
    }

    // 这里处理键盘弹出的事件
    inputClickHandle = () => {
        this.setState({
            showOrders:false,
        })
    }

    // 这里处理键盘收起的事件
    inputBlurHandle = () => {
        this.setState({
            showOrders:true,
        })
    }

    componentDidMount() {

        document.title = Lang.exchange[this.state.language].title;

        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        this.setState({ clientHeight })
        window.addEventListener('resize', this.resize)
    }


    getTradeStatic(currency) {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {
            currency: currency
        }
        if (token) {

            ajax.post(`${memberURl.account}/market/trade/static`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {

                    let avg = "0.000000"
                    if (res.biz.sum_amount) {
                        let amount = new BigNumber(res.biz.sum_amount).dividedBy(decimal);
                        let total = new BigNumber(res.biz.sum_total).dividedBy(new BigNumber(10).pow(new BigNumber(that.state.baseCurrencyDecimal)));
                        avg = total.dividedBy(amount).toFixed(that.state.base_currency_decimal);

                    }
                    that.setState({
                        avgPrice: avg,
                    })

                }
            });
        } else {
            that.setState({
                loginStatus: false
            })
            urls.login();
        }
    }


    onOpenChange = (...args) => {
        console.log(args);
        let itype = 'anticon-shouqi';
        if (this.state.open) {
            itype = 'anticon-zhankai';
        } else {
            itype = 'anticon-shouqi';
        }
        this.setState({open: !this.state.open, iconType: itype});
    }

    getUserDetail() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        if (token) {

            ajax.post(`${memberURl.member}/member/detail`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    that.setState({
                        userId: res.biz.user_id,
                    })
                    if (!res.biz.has_pay_password) {
                        Toast.info(Lang.failCode[that.state.language].noPaymentPasswrord);
                        _cc.toPageWithTime('/personal/safety/payPassword/modify', 2000);
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


    getAsset(c) {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {
            //currency: c,
        }
        if (token) {

            ajax.post(`${memberURl.account}/assets`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    let available = new BigNumber(0);
                    let sellAvailable = new BigNumber(0);
                    let account = {}
                    if (res.biz.length > 0) {
                        let dataArray = res.biz;
                        for (let data of dataArray) {
                            if (data.currency === that.state.currency) {
                                sellAvailable = (new BigNumber(data.amount).minus(new BigNumber(data.frozen))).dividedBy(digits.pow(new BigNumber(data.decimals)));
                            }
                            if (data.currency === that.state.baseCurrency) {
                                available = (new BigNumber(data.amount).minus(new BigNumber(data.frozen))).dividedBy(digits.pow(new BigNumber(data.decimals)));
                            }
                        }

                        account = res.biz[0];
                    }
                    that.setState({
                        account: account,
                        available: available.toFixed(that.state.base_currency_decimal),
                        sellAvailable: sellAvailable.toFixed(that.state.currency_decimal),
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

    tradeConfirm(type) {


        let that = this;
        // 以下为测试信息

        console.log("exchangeCoinNo:", that.state.exchangeCoinNo)
        //

        let available = new BigNumber(that.state.available);
        let total = new BigNumber(that.state.buyAmount).multipliedBy(new BigNumber(that.state.buyPrice));
        let tipCurrency = that.state.baseCurrency;
        let price = that.state.buyPrice;
        let amount = that.state.buyAmount;
        if (type === 'sell') {
            available = new BigNumber(that.state.sellAvailable);
            total = new BigNumber(that.state.sellAmount);
            tipCurrency = that.state.currency;
            price = that.state.sellPrice;
            amount = that.state.sellAmount;
        }

        if (!price || parseFloat(price) === 0) {
            Toast.fail(Lang.exchange[that.state.language].inputPrice, 2);
        } else if (!amount || parseFloat(amount) === 0) {
            Toast.fail(Lang.exchange[that.state.language].inputAmount, 2);
        } else if (available.comparedTo(total) === -1) {
            Toast.fail(tipCurrency + Lang.exchange[that.state.language].amountNotEnough, 2);
        } else {
            prompt(Lang.paymentCode[that.state.language], '',
                [
                    {
                        text: Lang.cancel[that.state.language],
                        onPress: () => {
                            console.log('cancel')
                        },
                    },
                    {
                        text: Lang.OK[that.state.language],
                        onPress: paypassword => {
                            // for(let i=0;i<100;i++){
                                this.trade(type, paypassword);
                            // }
                        },
                    },
                ], 'secure-text', null, [Lang.inputPayPassword[that.state.language]]);
        }

    }


    trade(type, paypassword) {
        let that = this;
        let token = _cc.getStorage('token');
        let price = 0;
        let amount = 0;

        if (!paypassword) {
            Toast.fail(Lang.inputPayPassword[that.state.language], 2);
        } else {
            if (type === 'buy') {
                price = that.state.buyPrice;
                amount = that.state.buyAmount;
            } else if (type === 'sell') {
                amount = that.state.sellAmount;
                price = that.state.sellPrice;
            }


            let biz = {
                price: new BigNumber(price).multipliedBy(decimal).toString(16),
                amount: new BigNumber(amount).multipliedBy(decimal).toString(16),
                pay_password: paypassword,
                type: type,
                exchange_coin_no: that.state.exchangeCoinNo,
            }
            if (token) {

                ajax.post(`${memberURl.account}/market/trade`, token, biz, function (res) {
                    if (res.base.code === 'SUCCESS') {

                        Toast.success(Lang.exchange[that.state.language].subTradeSuccess, 2);
                        that.setState({
                            buyPrice: "",
                            sellPrice: "",
                            buyAmount: "",
                            sellAmount: "",
                        })
                        that.getExchangeCoins(that.state.currency);

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

    }

    getExchangeCoins(currency, isSearch) {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {
            display: 1,
        }
        if (isSearch) {
            biz["currency"] = currency;
        }
        //
        if (token) {

            ajax.post(`${memberURl.account}/coins`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    // let dataArray = res.biz;
                    let existCurrency = false;

                    //查询币种
                    if (currency || _cc.getStorage('exchange_currency')) {

                        let c = currency ? currency : _cc.getStorage('exchange_currency');
                        ajax.post(`${memberURl.account}/coins`, token, {
                            currency: c,
                            exact_search: '1'
                        }, function (res2) {
                            if (res2.base.code === 'SUCCESS') {
                                if (res2.biz.length > 0) {
                                    existCurrency = true;
                                    let data = res2.biz[0];
                                    let currency_decimal = parseFloat(data.currency_decimal) > 6 ? 6 : parseFloat(data.currency_decimal);
                                    let base_currency_decimal = parseFloat(data.base_currency_decimal) > 6 ? 6 : parseFloat(data.base_currency_decimal);
                                    that.setState({
                                        exchangeCoinNo: data.exchange_coin_no,
                                        currency: data.currency,
                                        baseCurrency: data.base_currency,
                                        baseCurrencyDecimal: data.base_currency_decimal,

                                        currency_decimal: currency_decimal,
                                        base_currency_decimal: base_currency_decimal,

                                    });
                                    that.getAsset(data.base_currency)
                                    that.getExchangeMarketView(data.currency);
                                    that.getExchangeMarketOrders(data.currency);
                                    that.getTradeStatic(data.currency)
                                    _cc.setStorage('exchange_currency', data.currency);
                                }
                            }
                        });
                    }else{



                        if (!existCurrency && res.biz.length > 0) {
                            let currency_decimal = parseFloat(res.biz[0].currency_decimal) > 6 ? 6 : parseFloat(res.biz[0].currency_decimal);
                            let base_currency_decimal = parseFloat(res.biz[0].base_currency_decimal) > 6 ? 6 : parseFloat(res.biz[0].base_currency_decimal);

                            that.setState({
                                exchangeCoinNo: res.biz[0].exchange_coin_no,
                                currency: res.biz[0].currency,
                                baseCurrency: res.biz[0].base_currency,

                                currency_decimal: currency_decimal,
                                base_currency_decimal: base_currency_decimal,

                            });
                            that.getAsset(res.biz[0].base_currency)
                            that.getExchangeMarketView(res.biz[0].currency);
                            that.getExchangeMarketOrders(res.biz[0].currency);
                            that.getTradeStatic(res.biz[0].currency)
                            _cc.setStorage('exchange_currency', res.biz[0].currency);
                        }
                    }

                    that.setState({
                        coinsArray: res.biz,
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

    cancelExchangeOrder(exchangeOrderNo) {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {
            exchange_order_no: exchangeOrderNo
        }
        // if (currency) {
        //     biz["currency"] = currency;
        // }
        if (token) {

            ajax.post(`${memberURl.account}/market/trade/cancel`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    if (res.biz === false) {
                        Toast.fail(Lang.exchange[that.state.language].cancelFail, 2);
                    } else {
                        Toast.success(Lang.exchange[that.state.language].cancelSuccess, 2);
                        that.getExchangeMarketOrders(that.state.currency);
                        that.getAsset(that.state.base_currency)
                        that.getExchangeMarketView(that.state.currency);
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

    nFormatter(num, digits) {
        const si = [
            {value: 1, symbol: ""},
            {value: 1E3, symbol: "K"},
            {value: 1E6, symbol: "M"},
            {value: 1E9, symbol: "G"},
            {value: 1E12, symbol: "T"},
            {value: 1E15, symbol: "P"},
            {value: 1E18, symbol: "E"}
        ];
        // const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits) + si[i].symbol;
    }


    getExchangeMarketView(_currency) {
        let that = this;
        let token = _cc.getStorage('token');

        let biz = {
            currency: _currency,
        }
        if (token) {

            ajax.post(`${memberURl.account}/market/trade/view`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {

                    let _dataArray = res.biz;
                    let _buyArray = []
                    let _sellArray = []

                    if (_dataArray.length > 0) {
                        let index = 0;
                        for (let data of _dataArray) {
                            // if (_buyArray.length === 5 && _sellArray.length === 5) {
                            //     break;
                            // }

                            if (data.type === 1 && _buyArray.length < 5) {
                                _buyArray.push(
                                    <Flex key={index++}>
                                        <Flex.Item>
                                        <span onClick={() => {
                                            that.setState({
                                                buyPrice: new BigNumber(data.price).dividedBy(decimal).toFixed(that.state.base_currency_decimal),
                                                sellPrice: new BigNumber(data.price).dividedBy(decimal).toFixed(that.state.base_currency_decimal),

                                                buyAmount: (new BigNumber(data.amount).minus(new BigNumber(data.already_trade_amount))).dividedBy(decimal).toFixed(that.state.currency_decimal),
                                                sellAmount: (new BigNumber(data.amount).minus(new BigNumber(data.already_trade_amount))).dividedBy(decimal).toFixed(that.state.currency_decimal)
                                            })
                                        }}
                                              className="ex-price-buy">{new BigNumber(data.price).dividedBy(decimal).toFixed(that.state.base_currency_decimal)}</span>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <div
                                                className="ex-price-buy">{that.nFormatter((new BigNumber(data.amount).minus(new BigNumber(data.already_trade_amount))).dividedBy(decimal).toFixed(2), 2)}</div>
                                        </Flex.Item>
                                    </Flex>
                                );
                            } else if (data.type === 2 && _sellArray.length < 5) {
                                _sellArray.push(
                                    <Flex key={index++}>
                                        <Flex.Item>
                                        <span onClick={() => {
                                            that.setState({
                                                buyPrice: new BigNumber(data.price).dividedBy(decimal).toFixed(that.state.base_currency_decimal),
                                                sellPrice: new BigNumber(data.price).dividedBy(decimal).toFixed(that.state.base_currency_decimal),

                                                buyAmount: (new BigNumber(data.amount).minus(new BigNumber(data.already_trade_amount))).dividedBy(decimal).toFixed(that.state.currency_decimal),
                                                sellAmount: (new BigNumber(data.amount).minus(new BigNumber(data.already_trade_amount))).dividedBy(decimal).toFixed(that.state.currency_decimal)
                                            })
                                        }}
                                              className="ex-price-sell">{new BigNumber(data.price).dividedBy(decimal).toFixed(that.state.base_currency_decimal)}</span>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <div
                                                className="ex-price-sell">{that.nFormatter((new BigNumber(data.amount).minus(new BigNumber(data.already_trade_amount))).dividedBy(decimal).toFixed(2), 2)}</div>
                                        </Flex.Item>
                                    </Flex>
                                );
                            } else if (data.type === 2 && _sellArray.length === 5) {
                                _sellArray.splice(0, 1);
                                _sellArray.push(
                                    <Flex key={index++}>
                                        <Flex.Item>
                                        <span onClick={() => {
                                            that.setState({
                                                buyPrice: new BigNumber(data.price).dividedBy(decimal).toFixed(that.state.base_currency_decimal),
                                                sellPrice: new BigNumber(data.price).dividedBy(decimal).toFixed(that.state.base_currency_decimal),

                                                buyAmount: (new BigNumber(data.amount).minus(new BigNumber(data.already_trade_amount))).dividedBy(decimal).toFixed(that.state.currency_decimal),
                                                sellAmount: (new BigNumber(data.amount).minus(new BigNumber(data.already_trade_amount))).dividedBy(decimal).toFixed(that.state.currency_decimal)
                                            })
                                        }}
                                              className="ex-price-sell">{new BigNumber(data.price).dividedBy(decimal).toFixed(that.state.base_currency_decimal)}</span>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <div
                                                className="ex-price-sell">{that.nFormatter((new BigNumber(data.amount).minus(new BigNumber(data.already_trade_amount))).dividedBy(decimal).toFixed(2), 2)}</div>
                                        </Flex.Item>
                                    </Flex>
                                )
                            }

                        }
                    }
                    that.setState({
                        buyArray: _buyArray,
                        sellArray: _sellArray,
                        // avgPrice: _dataArray[0].average_price ? _dataArray[0].average_price : 0,

                    })

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

    getExchangeMarketOrders(_currency) {
        let that = this;
        let token = _cc.getStorage('token');

        let biz = {
            currency: _currency,
            state: 1,
        }
        let page = {
            page_no: 1,
            page_size: 10,
        }

        if (token) {

            ajax.postPages(`${memberURl.account}/market/trade/orders`, token, biz, page, function (res) {
                if (res.base.code === 'SUCCESS') {

                    let _dataArray = res.biz;

                    let length = _dataArray.length;
                    let _currentTradeArray = [];
                    if (length > 0) {
                        for (let i = 0; i < length; i++) {

                            let dateTimestamp = _dataArray[i].CreatedAt;
                            let cDate = new Date(dateTimestamp);

                            let fomatDate = (cDate.getMonth() + 1) + "/" + cDate.getDate() + " " + cDate.getHours() + ":" + cDate.getMinutes();

                            _currentTradeArray.push(
                                <Card full key={i}>
                                    <Card.Header
                                        title={_dataArray[i].type === 1 ?
                                            <span> <strong
                                                style={{color: 'green'}}>{Lang.exchange[that.state.language].buy} </strong>{fomatDate}</span> :
                                            <span> <strong
                                                style={{color: 'red'}}>{Lang.exchange[that.state.language].sell} </strong>{fomatDate}</span>}
                                        extra={<Button size="small" inline={true} onClick={() => {
                                            that.cancelExchangeOrder(_dataArray[i].exchange_order_no)
                                        }
                                        }><span style={{color: '#2196f3'}}>撤销</span></Button>}
                                    />
                                    <Card.Body>
                                        <div>
                                            <Flex>
                                                <Flex.Item>
                                                    <div className='placeholder'>
                                                        {Lang.exchange[that.state.language].price}({_dataArray[i].base_currency})
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div className='placeholder'>
                                                        {Lang.exchange[that.state.language].amount}({_dataArray[i].currency})
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div className='placeholder'>
                                                        {Lang.exchange[that.state.language].total}({_dataArray[i].currency})
                                                    </div>
                                                </Flex.Item>
                                            </Flex>

                                            <Flex>
                                                <Flex.Item>
                                                    <div className='placeholder-order'>
                                                        {new BigNumber(_dataArray[i].price).dividedBy(decimal).toFixed(that.state.base_currency_decimal)}
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div className='placeholder-order'>
                                                        {that.nFormatter(new BigNumber(_dataArray[i].amount).dividedBy(decimal).toFixed(3), 3)}
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div className='placeholder-order'>
                                                        {that.nFormatter(new BigNumber(_dataArray[i].already_trade_amount).dividedBy(decimal).toFixed(that.state.currency_decimal), that.state.currency_decimal)}
                                                    </div>
                                                </Flex.Item>
                                            </Flex>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        }


                    }
                    if (_currentTradeArray.length == 0) {
                        _currentTradeArray.push(
                            <div>
                                <Icon style={{width: '100px', height: '100px'}} type="anticon-wushuju"/><br/>
                                <span> {Lang.exchange[that.state.language].noRecord}</span>
                            </div>
                        )
                    } else {
                        _currentTradeArray.push(
                            <div style={{height: '50px'}}></div>
                        )
                    }

                    that.setState({
                        currentTradeArray: _currentTradeArray,

                    })
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

        let that = this;
        let array = that.state.coinsArray;

        // fix in codepen
        const sidebar = (
            <div className="sidebar-div">
                <InputItem
                    clear
                    placeholder={Lang.exchange[that.state.language].searchCurrency}
                    ref={el => this.inputRef = el}
                    onChange={(v) => {
                        that.getExchangeCoins(v, true);
                    }
                    }
                ><Icon type="anticon-sousuo"/></InputItem>
                <List>
                    {array.map((coin, index) => {
                        return (
                            <List.Item key={index} thumb={coin.icon}
                                       multipleLine onClick={() => {
                                console.log("coin.exchange_coin_no:", coin.exchange_coin_no);
                                _cc.setStorage('exchange_currency', coin.currency);
                                let currency_decimal = parseFloat(coin.currency_decimal) > 6 ? 6 : parseFloat(coin.currency_decimal);
                                let base_currency_decimal = parseFloat(coin.base_currency_decimal) > 6 ? 6 : parseFloat(coin.base_currency_decimal);

                                that.setState({
                                    currency: coin.currency,
                                    baseCurrency: coin.base_currency,
                                    exchangeCoinNo: coin.exchange_coin_no,
                                    baseCurrencyDecimal: coin.base_currency_decimal,

                                    currency_decimal:currency_decimal,
                                    base_currency_decimal:base_currency_decimal,

                                    buyPrice: "",
                                    sellPrice: "",
                                    buyAmount: "",
                                    sellAmount: "",

                                })
                                // that.getExchangeCoins(coin.currency);

                                that.getAsset(coin.base_currency)
                                that.getExchangeMarketView(coin.currency);
                                that.getExchangeMarketOrders(coin.currency);
                                that.getTradeStatic(coin.currency);


                                that.onOpenChange();
                            }}>
                                <span>{coin.currency}</span>
                                <span style={{color: 'gray'}}>/{coin.base_currency}</span>
                            </List.Item>
                        );
                    })}
                </List></div>);

        var tabs = [
            {
                title: <Button type="primary" size="small"
                               style={{display: 'block'}}>{Lang.exchange[that.state.language].buy}</Button>, sub: '1'
            },
            {
                title: <Button type="warning" size="small"
                               style={{display: 'block'}}>{Lang.exchange[that.state.language].sell}</Button>, sub: '2'
            },
        ];

        if ("THE_CONTRIBUTION_CERTIFICATE"===this.state.currency){
            tabs = [
                {
                    title: <Button type="primary" size="small"
                                   style={{display: 'block'}}>{Lang.exchange[that.state.language].buy}</Button>, sub: '1'
                }
            ];
        }


        return (
            <div>
                <div className="exchange">

                    <div style={{position: 'fixed', width: '100%', top: 0, zIndex: '999'}}>
                        <NavBar icon={<Icon type={this.state.iconType}/>} mode="dark"
                                onLeftClick={this.onOpenChange}><span>{this.state.currency}/{this.state.baseCurrency}</span></NavBar>
                    </div>
                    <Drawer
                        className="my-drawer"
                        style={{minHeight: document.documentElement.clientHeight - 45, marginTop: '45px'}}
                        enableDragHandle
                        contentStyle={{color: '#A6A6A6', textAlign: 'center', backgroundColor: "white", padding: 15}}
                        sidebar={sidebar}
                        open={this.state.open}
                        onOpenChange={this.onOpenChange}
                    >

                        <Flex>
                            <Flex.Item style={{width: '70%'}}>
                                <div style={{width: '65%', float: 'left', marginRight: '10px'}}>
                                    <Tabs tabs={tabs}
                                          initialPage={0}
                                          onChange={(tab, index) => {
                                              if (index == 0) {
                                                  this.getAsset(this.state.baseCurrency);
                                              } else {
                                                  this.getAsset(this.state.currency);
                                              }
                                              console.log('onChange', index, tab);
                                          }}
                                          animated={false}

                                    >
                                        <div style={{backgroundColor: '#fff', height: '100%', marginRight: '20px'}}>
                                            <div className="flex-container" style={{width: '100%'}}>
                                                <Flex>
                                                    <Flex.Item>
                                                        <WhiteSpace/>
                                                        <div>
                                                            <List className="priceList">
                                                            <InputItem className="input-item"
                                                                       extra={this.state.baseCurrency}
                                                                       value={this.state.buyPrice === 0 ? "" : this.state.buyPrice}
                                                                       placeholder={Lang.exchange[this.state.language].price}
                                                                       type="digit"

                                                                       onChange={(v) => {
                                                                           this.setState({
                                                                               buyPrice: v
                                                                           });
                                                                       }}

                                                                       onBlur={(v) => {
                                                                           this.setState({
                                                                               buyPrice: parseFloat(v).toFixed(that.state.base_currency_decimal),
                                                                           });
                                                                       }}/>
                                                            </List>
                                                        </div>
                                                    </Flex.Item>
                                                </Flex>
                                                <WhiteSpace/>
                                                <Flex>
                                                    <Flex.Item>
                                                        <div>
                                                            <List className="priceList">
                                                            <InputItem className="input-item"
                                                                       placeholder={Lang.exchange[this.state.language].amount}
                                                                       extra={this.state.currency.length>8?this.state.currency.substring(0,8)+'...':this.state.currency}
                                                                       type="digit"
                                                                       defaultValue={this.state.buyAmount === 0 ? "" : this.state.buyAmount}
                                                                       value={this.state.buyAmount === 0 ? "" : this.state.buyAmount}

                                                                       onChange={(v) => {

                                                                           this.setState({
                                                                               buyAmount: v
                                                                           });

                                                                       }}

                                                                       onBlur={(v) => {
                                                                           this.setState({
                                                                               buyAmount: parseFloat(v).toFixed(that.state.currency_decimal),
                                                                           })
                                                                       }}
                                                            />
                                                            </List>
                                                            <br/>
                                                            <small>{Lang.exchange[this.state.language].available}: {isNaN(this.state.available) ? "0" : new BigNumber(this.state.available).toFixed(this.state.base_currency_decimal)} {this.state.baseCurrency}</small>
                                                        </div>
                                                    </Flex.Item>
                                                </Flex>

                                                <WhiteSpace/>
                                                <Flex>
                                                    <Flex.Item>
                                                        <div style={{height: '50px', marginTop: '15px'}}>
                                                            <Slider
                                                                style={{marginLeft: 10, marginRight: 15}}
                                                                defaultValue={2}
                                                                min={0}
                                                                max={100}
                                                                marks={{
                                                                    0: "0%",
                                                                    25: "",
                                                                    50: "50%",
                                                                    75: "",
                                                                    100: "100%"
                                                                }}
                                                                onChange={(v) => {
                                                                    console.log(v);
                                                                    this.setState({
                                                                        buyAmount: new BigNumber(v).multipliedBy(new BigNumber(this.state.available)).dividedBy(new BigNumber(100)).dividedBy(new BigNumber(this.state.buyPrice)).toFixed(that.state.currency_decimal)
                                                                    })
                                                                }}
                                                                onAfterChange={console.log('afterChange')}
                                                            />
                                                        </div>
                                                    </Flex.Item>
                                                </Flex>

                                                <WhiteSpace/>
                                                <Flex>
                                                    <Flex.Item>
                                                        <div>
                                                            <span>{Lang.exchange[this.state.language].total}: { parseFloat(this.state.buyAmount)>0&&parseFloat(this.state.buyPrice)>0.?new BigNumber(this.state.buyAmount).multipliedBy(new BigNumber(this.state.buyPrice)).toFixed(that.state.base_currency_decimal):new BigNumber(0).toFixed(that.state.base_currency_decimal)} {this.state.baseCurrency}</span>
                                                        </div>
                                                    </Flex.Item>
                                                </Flex>

                                                <WhiteSpace/>
                                                <Flex>
                                                    <Flex.Item>
                                                        <div>
                                                            <Button type="primary" onClick={() => {
                                                                this.tradeConfirm('buy')
                                                            }}>{Lang.exchange[this.state.language].buy + ' ' + this.state.currency}</Button>
                                                        </div>
                                                    </Flex.Item>
                                                </Flex>
                                            </div>
                                        </div>
                                        <div style={{marginRight: '20px', height: '100%', backgroundColor: '#fff'}}>
                                            <div className="flex-container" style={{width: '100%', float: 'left'}}>
                                                <Flex>
                                                    <Flex.Item>
                                                        <WhiteSpace/>
                                                        <div>
                                                            <List className="priceList">
                                                            <InputItem className="input-item"
                                                                       value={this.state.sellPrice === 0 ? "" : this.state.sellPrice}
                                                                       placeholder={Lang.exchange[this.state.language].price}
                                                                // extra={this.state.currency}
                                                                       extra={this.state.baseCurrency}
                                                                       type="digit"

                                                                       onChange={(v) => {
                                                                           this.setState({
                                                                               sellPrice: v
                                                                           });
                                                                       }}

                                                                       onBlur={(v) => {
                                                                           this.setState({
                                                                               sellPrice: parseFloat(v).toFixed(that.state.base_currency_decimal),
                                                                           })
                                                                       }}
                                                            />
                                                            </List>

                                                        </div>
                                                    </Flex.Item>
                                                </Flex>
                                                <WhiteSpace/>
                                                <Flex>
                                                    <Flex.Item>
                                                        <div>
                                                            <List className="priceList">
                                                            <InputItem className="input-item"
                                                                       placeholder={Lang.exchange[this.state.language].amount}
                                                                       extra={this.state.currency.length>8?this.state.currency.substring(0,8)+'...':this.state.currency}
                                                                       type="digit"
                                                                       defaultValue={this.state.sellAmount === 0 ? "" : this.state.sellAmount}
                                                                       value={this.state.sellAmount === 0 ? "" : this.state.sellAmount}
                                                                       onBlur={(v) => {
                                                                           this.setState({
                                                                               sellAmount: parseFloat(v).toFixed(that.state.currency_decimal),
                                                                           })
                                                                       }}

                                                                       onChange={(v) => {

                                                                           this.setState({
                                                                               sellAmount: v
                                                                           });

                                                                       }}



                                                            />
                                                            </List><br/>
                                                            <small>{Lang.exchange[this.state.language].available}: {this.state.sellAvailable} {this.state.currency}</small>
                                                        </div>

                                                    </Flex.Item>
                                                </Flex>

                                                <WhiteSpace/>
                                                <Flex>
                                                    <Flex.Item>
                                                        <div style={{height: '50px', marginTop: '15px'}}>
                                                            <Slider
                                                                style={{marginLeft: 10, marginRight: 15,}}
                                                                defaultValue={2}
                                                                min={0}
                                                                max={100}
                                                                marks={{0: "0", 25: "", 50: "50%", 75: "", 100: "100%"}}
                                                                onChange={(v) => {
                                                                    console.log(v);
                                                                    this.setState({
                                                                        sellAmount: new BigNumber(v).multipliedBy(new BigNumber(this.state.sellAvailable)).dividedBy(new BigNumber(100)).toFixed(that.state.currency_decimal)
                                                                    })
                                                                }}
                                                                onAfterChange={console.log('afterChange')}

                                                            />
                                                        </div>
                                                    </Flex.Item>
                                                </Flex>

                                                <WhiteSpace/>
                                                <Flex>
                                                    <Flex.Item>
                                                        <div>
                                                            <span>{Lang.exchange[this.state.language].totalIn}: {parseFloat(this.state.sellAmount)>0&&parseFloat(this.state.sellPrice)>0?new BigNumber(this.state.sellAmount).multipliedBy(new BigNumber(this.state.sellPrice)).toFixed(that.state.base_currency_decimal):new BigNumber(0).toFixed(that.state.base_currency_decimal)} {this.state.baseCurrency}</span>
                                                        </div>
                                                    </Flex.Item>
                                                </Flex>

                                                <WhiteSpace/>
                                                <Flex>
                                                    <Flex.Item>
                                                        <div>
                                                            <Button type="warning" onClick={() => {
                                                                this.tradeConfirm('sell')
                                                            }}>{Lang.exchange[this.state.language].sell + ' ' + this.state.currency}</Button>
                                                        </div>
                                                    </Flex.Item>
                                                </Flex>

                                            </div>

                                        </div>
                                    </Tabs>
                                </div>
                                <div className="ex-price">
                                    <Flex>
                                        <Flex.Item><span
                                            className="ex-price-head">{Lang.exchange[this.state.language].price}</span></Flex.Item>
                                        <Flex.Item>
                                            <div
                                                className="ex-price-head">{Lang.exchange[this.state.language].amount}</div>
                                        </Flex.Item>
                                    </Flex>

                                    <div>
                                        {this.state.sellArray}
                                    </div>
                                    <div>
                                        <Flex>
                                            <Flex.Item>
                                                <div className="ex-price-buynow" onClick={() => {
                                                    this.setState({
                                                        buyPrice: new BigNumber(this.state.avgPrice).toFixed(that.state.base_currency_decimal),
                                                        sellPrice: new BigNumber(this.state.avgPrice).toFixed(that.state.base_currency_decimal)
                                                    })
                                                }}>{new BigNumber(this.state.avgPrice).toFixed(that.state.base_currency_decimal)}</div>
                                            </Flex.Item>
                                        </Flex>
                                    </div>
                                    <div>
                                        {this.state.buyArray}
                                    </div>
                                </div>

                            </Flex.Item>
                        </Flex>

                        <WhiteSpace/>
                        <div style={{display:this.state.showOrders?'block':'none'}}>
                            <Flex>
                                <Flex.Item>
                                    <h2 style={{
                                        textAlign: 'left',
                                        color: '#000'
                                    }}>{Lang.exchange[this.state.language].openOrders}</h2>
                                </Flex.Item>
                                <Flex.Item>
                                    <div style={{textAlign: 'right', color: 'rgb(14, 142, 233)', marginRight: '15px'}}
                                         onClick={() => {
                                             _cc.toPage(`/others/exchange/orders/${this.state.currency}`);
                                         }}>{Lang.exchange[this.state.language].all
                                    }
                                    </div>
                                </Flex.Item>
                            </Flex>

                            <Flex>
                                <Flex.Item style={{textAlign: 'center'}}>


                                    {this.state.currentTradeArray}


                                    <WhiteSpace/>
                                </Flex.Item>
                            </Flex>
                        </div>

                    </Drawer>
                </div>
                <div style={{position: 'fixed', width: '100%', bottom: 0,display:this.state.showOrders?'block':'none',zIndex:999}} >
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

export default Exchange;

