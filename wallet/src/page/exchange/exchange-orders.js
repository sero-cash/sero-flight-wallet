import React, {Component} from 'react';
import {Toast, Card, Flex, WhiteSpace, Icon, Menu, ActivityIndicator, NavBar, PullToRefresh, Button} from 'antd-mobile';
import ReactDOM from 'react-dom';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import memberURl from "../../common/config";
import Axios from './../../service/service.js';
import "./exchange.css"
import BigNumber from "bignumber.js/bignumber";
import {urls} from "../../common/url";

let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();
const decimal = new BigNumber(10).pow(8);


class ExchangeOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: _cc.getLanguage(),
            tradeOrders: [],
            initData: '',
            show: false,
            selectedStateValue: [],
            selectedTypeValue: [],
            selectedValue: [],
            selectData: [],

            pageNo: 1,

            refreshing: false,
            down: false,
            height: document.documentElement.clientHeight,

            hasMore: false
        }
    }

    componentWillMount() {

        this.getTradeOrders();


    }


    componentDidMount() {
        document.title = "交易记录";

        // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        // console.log(this.state.height,ReactDOM.findDOMNode(this.ptr).offsetTop);
        // setTimeout(() => this.setState({
        //     height: hei,
        // }), 0);

    }


    getTradeOrders(pageno) {


        let that = this;
        let token = _cc.getStorage('token');


        let biz = {
            currency: that.props.match.params.currency,
        }

        let selectedValue = that.state.selectedValue;
        if (selectedValue.length > 0) {
            if (selectedValue[0] === 1) {
                biz["type"] = selectedValue[1];
            } else if (selectedValue[0] === 2) {
                biz["state"] = selectedValue[1];
            }
        }

        let page = {
            page_no: pageno ? pageno : that.state.pageNo,
            page_size: 10,
        }
        if (token) {

            let tradeOrdersTmp = new Array();
            ajax.postPages(`${memberURl.account}/market/trade/orders`, token, biz, page, function (res) {
                if (res.base.code === 'SUCCESS') {
                    let dataArray = res.biz;
                    let index = 1;
                    if (dataArray.length > 0) {
                        that.setState({pageNo: that.state.pageNo + 1});
                    }
                    if (dataArray.length < 10) {
                        that.setState({hasMore: false});
                    } else {
                        that.setState({hasMore: true});
                    }

                    for (let order of dataArray) {

                        let timestamp = Date.parse(order.CreatedAt);
                        var dateP = new Date(timestamp);

                        let timeStr = dateP.getHours() + ':' + dateP.getMinutes() + ' ' + (dateP.getMonth() + 1) + '/' + dateP.getDate();

                        let orderType = order.type === 1 ?
                            <strong style={{color: 'green'}}>{Lang.exchange[that.state.language].buy}</strong> :
                            <strong style={{color: 'red'}}>{Lang.exchange[that.state.language].sell}</strong>;
                        let orderState = order.state === 1 ? <span style={{
                            color: "#2196f3",
                            fontSize: '14px'
                        }}>{Lang.exchange[that.state.language].stateProcessing}</span> : (order.state === 2 ? <span
                            style={{
                                color: "green",
                                fontSize: '14px'
                            }}>{Lang.exchange[that.state.language].stateCompleted}</span> : <span style={{
                            color: "red",
                            fontSize: '14px'
                        }}>{Lang.exchange[that.state.language].stateCancel}</span>);


                        let sumAmount = "0.000000";
                        let sumTotal = "0.000000";
                        let avgPrice = "0.000000";

                        let currency_decimal = parseFloat(order.currency_decimal) > 6 ? 6 : order.currency_decimal;
                        let base_currency_decimal = parseFloat(order.base_currency_decimal) > 6 ? 6 : order.base_currency_decimal;

                        if (order.sum_amount) {
                            sumAmount = new BigNumber(parseFloat(order.sum_amount)).dividedBy(decimal).toFixed(currency_decimal);
                            sumTotal = new BigNumber(order.sum_total).dividedBy(new BigNumber(10).pow(new BigNumber(order.base_currency_decimal))).toFixed(base_currency_decimal);
                            avgPrice = new BigNumber(sumTotal).dividedBy(sumAmount).toFixed(base_currency_decimal);
                        }


                        tradeOrdersTmp.push(
                            <div key={index++}>
                                <Card full onClick={() => {
                                    if (new BigNumber(order.already_trade_amount).comparedTo(new BigNumber(0)) > 0) {
                                        _cc.toPage(`/others/exchange/order/info/${order.exchange_order_no}`)
                                    }
                                }}>
                                    <Card.Header
                                        title={<span style={{fontSize: '14px'}}><strong
                                            style={{color: 'green'}}>{orderType}</strong> {order.currency}/{order.base_currency}</span>}
                                        extra={
                                            orderState
                                        }
                                    />
                                    <Card.Body>
                                        <div>
                                            <Flex>
                                                <Flex.Item>
                                                    <div className='placeholder'>
                                                        {Lang.exchange[that.state.language].time}
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div className='placeholder'>
                                                        {Lang.exchange[that.state.language].price}({order.base_currency})
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div className='placeholder'>
                                                        {Lang.exchange[that.state.language].amount}({order.currency})
                                                    </div>
                                                </Flex.Item>
                                            </Flex>
                                            <Flex>
                                                <Flex.Item>
                                                    <div className='placeholder-c'>{timeStr}</div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div
                                                        className='placeholder-c'>{new BigNumber(order.price).dividedBy(decimal).toFixed(base_currency_decimal)}</div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div
                                                        className='placeholder-c'>{new BigNumber(order.amount).dividedBy(decimal).toFixed(currency_decimal)}</div>
                                                </Flex.Item>
                                            </Flex>

                                            <Flex>
                                                <Flex.Item>
                                                    <div className='placeholder'>
                                                        {Lang.exchange[that.state.language].totalS}({order.base_currency})
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div className='placeholder'>
                                                        {Lang.exchange[that.state.language].avgPrice}({order.base_currency})
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div className='placeholder'>
                                                        {Lang.exchange[that.state.language].total}({order.currency})
                                                    </div>
                                                </Flex.Item>
                                            </Flex>
                                            <Flex>
                                                <Flex.Item>
                                                    <div className='placeholder-c'>
                                                        {sumTotal}
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div className='placeholder-c'>
                                                        {avgPrice}
                                                    </div>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <div className='placeholder-c'>{sumAmount}</div>
                                                </Flex.Item>
                                            </Flex>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <WhiteSpace size="lg"/>
                            </div>
                        );
                    }
                    if (tradeOrdersTmp.length === 0 && that.state.pageNo === 1) {
                        tradeOrdersTmp.push(
                            <div>
                                <Icon style={{width: '122px', height: '122px'}} type="anticon-wushuju"/><br/>
                                <span>{Lang.exchange[that.state.language].noRecord}</span>
                            </div>
                        )
                        that.setState({
                            tradeOrders: tradeOrdersTmp,
                        })
                    } else {
                        that.setState({
                            tradeOrders: that.state.tradeOrders.concat(tradeOrdersTmp),
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


    onChange = (value) => {
        console.log(value);
        this.setState({
            show: false,
            selectedValue: value,
            tradeOrders: [],
        });
        this.getTradeOrders(1);
    }
    // onOk = (value) => {
    //     console.log(value);
    //     this.setState({
    //         show: false,
    //         selectedValue:value,
    //         tradeOrders:[],
    //     });
    //     this.getTradeOrders(1);
    // }
    // onCancel = () => {
    //     this.setState({
    //         show: false,
    //     });
    // }
    handleClick = (e) => {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData) {
            this.setState({
                initData: [
                    {
                        value: 1,
                        label: `${Lang.exchange[this.state.language].tradeType}`,
                        children: [
                            {
                                label: `${Lang.exchange[this.state.language].all}`,
                                value: 0,
                            },
                            {
                                label: `${Lang.exchange[this.state.language].buy}`,
                                value: 1,
                            },
                            {
                                label: `${Lang.exchange[this.state.language].sell}`,
                                value: 2,
                            }],
                    },
                    {
                        value: 2,
                        label: `${Lang.exchange[this.state.language].tradeState}`,
                        children: [
                            {
                                label: `${Lang.exchange[this.state.language].all}`,
                                value: 0,
                            },
                            {
                                label: `${Lang.exchange[this.state.language].stateProcessing}`,
                                value: 1,
                            },
                            {
                                label: `${Lang.exchange[this.state.language].stateCompleted}`,
                                value: 2,
                            }, {
                                label: `${Lang.exchange[this.state.language].stateCancel}`,
                                value: 3,
                            }],
                    },
                ],
            });
        }
    }

    onMaskClick = () => {
        this.setState({
            show: false,
        });
    }

    render() {

        const {initData, show} = this.state;
        const menuEl = (
            <Menu
                className="multi-foo-menu"
                data={initData}
                value={this.state.selectedValue}
                onChange={this.onChange}
                // onOk={this.onOk}
                // onCancel={this.onCancel}
                height={document.documentElement.clientHeight * 0.4}
                multiSelect={false}
            />
        );
        const loadingEl = (
            <div style={{
                position: 'absolute',
                width: '100%',
                height: document.documentElement.clientHeight * 0.6,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size="large"/>
            </div>
        );


        return (
            <div className="orderContext" style={{height: document.documentElement.clientHeight, textAlign: 'center'}}>
                {/*<h1>订单记录</h1>*/}


                <div className={show ? 'multi-menu-active' : ''} >
                    <div>

                        <NavBar
                            leftContent={Lang.exchange[this.state.language].tradeHistory}
                            rightContent={<Icon onClick={this.handleClick} style={{width: '30px', height: '30px'}}
                                                type="anticon-shaixuan"/>}
                            mode="dark"
                            className="multi-top-nav-bar"
                        >

                        </NavBar>
                    </div>
                    {show ? initData ? menuEl : loadingEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick}/> : null}
                </div>

                <WhiteSpace/>
                {/*<PullToRefresh*/}
                {/*distanceToRefresh={50}*/}
                {/*damping={100}*/}
                {/*ref={el => this.ptr = el}*/}
                {/*style={{*/}
                {/*height: this.state.height,*/}
                {/*overflow: 'auto',*/}
                {/*}}*/}
                {/*indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}*/}
                {/*direction={this.state.down ? 'down' : 'up'}*/}
                {/*refreshing={this.state.refreshing}*/}
                {/*onRefresh={() => {*/}
                {/*this.setState({ refreshing: true });*/}
                {/*this.getTradeOrders();*/}
                {/*setTimeout(() => {*/}
                {/*this.setState({ refreshing: false });*/}
                {/*}, 1000);*/}
                {/*}}*/}
                {/*>*/}
                {/*{this.state.tradeOrders}*/}

                {/*</PullToRefresh>*/}
                {this.state.tradeOrders}
                {
                    this.state.hasMore ? <Button loading={this.state.refreshing} onClick={() => {
                        this.setState({refreshing: true});
                        this.getTradeOrders();
                        setTimeout(() => {
                            this.setState({refreshing: false});
                        }, 2000);
                    }}>{Lang.exchange[this.state.language].loadMore}</Button> : <div style={{color: '#9E9E9E',marginBottom:'5px'}}>{this.state.tradeOrders.length>1?Lang.exchange[this.state.language].atBottom:''}</div>
                }


            </div>
        )
    }
}

export default ExchangeOrders;

