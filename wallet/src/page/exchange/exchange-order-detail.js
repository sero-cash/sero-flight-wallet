import React, {Component} from 'react';
import { Toast, List,Card, Flex, WhiteSpace} from 'antd-mobile';

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
let Item = List.Item;

class ExchangeOrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: _cc.getLanguage(),
            tradeOrders: [],
            order:'',
        }
    }

    componentWillMount() {


    }


    componentDidMount() {
        // document.title = Lang.exchange[this.state.language].home.title;
        document.title = Lang.exchange[this.state.language].tradeDetail;

        this.getTradeOrder(this.props.match.params.orderNo);
        this.getTradeOrderDetail(this.props.match.params.orderNo);
    }


    getTradeOrder(orderExchangeNo) {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {
            exchange_order_no:orderExchangeNo,
        }
        let page = {
            page_no:1,
            page_size:1,
        }
        if (token) {

            ajax.postPages(`${memberURl.account}/market/trade/orders`, token, biz,page, function (res) {
                if (res.base.code === 'SUCCESS') {
                    let order = res.biz[0];
                    let array = [];
                    let timestamp = Date.parse(order.CreatedAt);
                    var dateP = new Date(timestamp);

                    let timeStr =dateP.getHours() + ':' + dateP.getMinutes() + ' ' + (dateP.getMonth()+1) + '/' + dateP.getDate();

                    let orderType = order.type === 1 ?<strong style={{color:'green'}}>{Lang.exchange[that.state.language].buy}</strong>:<strong style={{color:'red'}}>{Lang.exchange[that.state.language].sell}</strong>;
                    let orderState = order.state === 1?<span style={{color:"#2196f3",fontSize:'14px'}}>{Lang.exchange[that.state.language].stateProcessing}</span>:( order.state===2?<span style={{color:"green",fontSize:'14px'}}>{Lang.exchange[that.state.language].stateCompleted}</span>:<span style={{color:"red",fontSize:'14px'}}>{Lang.exchange[that.state.language].stateCancel}</span>);


                    let sumAmount = "0.000000";
                    let sumTotal = "0.000000";
                    let avgPrice = "0.000000";
                    let fee = "0.000000";

                    let currency_decimal = parseFloat(order.currency_decimal)>6?6:order.currency_decimal;
                    let base_currency_decimal = parseFloat(order.base_currency_decimal)>6?6:order.base_currency_decimal;

                    if(order.sum_amount){
                        sumAmount = new BigNumber(parseFloat(order.sum_amount)).dividedBy(decimal).toFixed(currency_decimal);
                        sumTotal = new BigNumber(order.sum_total).dividedBy(new BigNumber(10).pow(new BigNumber(order.base_currency_decimal))).toFixed(base_currency_decimal);
                        avgPrice = new BigNumber(sumTotal).dividedBy(sumAmount).toFixed(base_currency_decimal);
                        if (order.type === 1){
                            fee = new BigNumber(order.fee).dividedBy(new BigNumber(10).pow(new BigNumber(order.currency_decimal))).toFixed(currency_decimal);
                        }else{
                            fee = new BigNumber(order.fee).dividedBy(new BigNumber(10).pow(new BigNumber(order.base_currency_decimal))).toFixed(base_currency_decimal);
                        }
                    }



                    array.push(
                        <Card full >
                            <Card.Header
                                title={<span style={{fontSize:'14px'}}><strong style={{color:'green'}}>{orderType}</strong> {order.currency}/{order.base_currency}</span>}
                                extra={
                                    orderState
                                }
                            />
                            <Card.Body>
                                <div>

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
                                        <Flex.Item><div className='placeholder-c'>{sumAmount}</div></Flex.Item>
                                    </Flex>

                                    <Flex>
                                        <Flex.Item>
                                            <div className='placeholder'>
                                                {Lang.exchange[that.state.language].fee}({order.type===1?order.currency:order.base_currency})
                                            </div>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <div className='placeholder'>

                                            </div>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <div className='placeholder'>

                                            </div>
                                        </Flex.Item>
                                    </Flex>
                                    <Flex>
                                        <Flex.Item>
                                            <div className='placeholder-c'>
                                                {fee}
                                            </div>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <div className='placeholder-c'>

                                            </div>
                                        </Flex.Item>
                                        <Flex.Item><div className='placeholder-c'>

                                        </div></Flex.Item>
                                    </Flex>

                                </div>
                            </Card.Body>
                        </Card>
                    );
                    that.setState({
                        order:array,
                    });

                }
            });
        }
    }

    getTradeOrderDetail(orderExchangeNo) {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {
            exchange_order_no:orderExchangeNo,
        }

        if (token) {

            let tradeOrdersTmp = [];
            ajax.post(`${memberURl.account}/market/trade/order/info`, token, biz,function (res) {
                if (res.base.code === 'SUCCESS') {
                    let dataArray = res.biz;
                    let index = 1;

                    for (let order of dataArray){

                        let timestamp = Date.parse(order.CreatedAt);
                        var dateP = new Date(timestamp);
                        let currency_decimal = parseFloat(order.currency_decimal)>6?6:order.currency_decimal;
                        let base_currency_decimal = parseFloat(order.base_currency_decimal)>6?6:order.base_currency_decimal;
                        let timeStr =dateP.getHours() + ':' + dateP.getMinutes() + ':' + dateP.getSeconds() + ' ' + (dateP.getMonth()+1) + '/' + dateP.getDate();

                        // let orderType = order.type === 1 ?<strong style={{color:'green'}}>买入</strong>:<strong style={{color:'red'}}>卖出</strong>;
                        let fee = "0.000000";
                        if (order.type === 1){
                            fee = new BigNumber(order.fee).dividedBy(new BigNumber(10).pow(new BigNumber(order.currency_decimal))).toFixed(currency_decimal);
                        }else{
                            fee = new BigNumber(order.fee).dividedBy(new BigNumber(10).pow(new BigNumber(order.base_currency_decimal))).toFixed(base_currency_decimal);
                        }


                        tradeOrdersTmp.push(
                            <div key={index++}>
                                <List>
                                    <Item extra={<span className="detail-span">{timeStr}</span>}><span className="detail-title">{ Lang.exchange[that.state.language].time}:</span></Item>
                                    <Item extra={<span className="detail-span">{(new BigNumber(order.amount).dividedBy(decimal).toFixed(currency_decimal))}</span>}><span className="detail-title">{ Lang.exchange[that.state.language].amount}({order.currency}):</span></Item>
                                    <Item extra= {<span className="detail-span">{(new BigNumber(order.price).dividedBy(decimal).toFixed(base_currency_decimal))}</span>}><span className="detail-title">{ Lang.exchange[that.state.language].price}({order.base_currency}):</span></Item>
                                    <Item extra= {<span className="detail-span">{fee}</span>}><span className="detail-title">{ Lang.exchange[that.state.language].fee}({order.type===1?order.currency:order.base_currency}):</span></Item>
                                </List>
                                <WhiteSpace size="lg" />
                            </div>
                        );
                    }

                    that.setState({
                        tradeOrders: tradeOrdersTmp,
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

    render() {

        return (
            <div className="orderContext" style={{height: document.documentElement.clientHeight}}>
                {/*<h1>成交明细</h1>*/}
                <WhiteSpace size="lg" />
                {this.state.order}
                <WhiteSpace size="lg" />
                {this.state.tradeOrders}
            </div>
        )
    }
}

export default ExchangeOrderDetail;

