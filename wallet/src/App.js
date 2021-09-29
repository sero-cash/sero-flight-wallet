import React, {Component} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import Login from './page/login/login';
import Register from './page/register/register';
import RegisterSecondStep from './page/register/register1';
// import Home from './page/home/home';
import ModifyPasswd from './page/modifyPasswd/modifyPasswd';
import ModifySecondStep from './page/modifyPasswd/modifyPasswd1';
import Layout from './layout/layout';
import PersonalCenter from './page/personalCenter/personalCenter';
import SelfAssets from './page/selfAssets/selfAssets';


import Transfer from './page/selfAssets/transfer';
import TransferResult from './page/selfAssets/transferResult';
import TransactionList from './page/transaction/list';
import TransactionDetail from './page/transaction/detail';

import WithdrawAddress from './page/withdrwaAddress/withdrwaAddress';

import Settings from './page/settings/settings';
import News from './page/news/news';


import Safety from './page/personalCenter/safety';
import SafetyEmail from './page/personalCenter/safety-email';
import SafetyMobile from './page/personalCenter/safety-mobile';

import MessageList from './page/messageList/messageList.js';
import Contract from './page/personalCenter/contract';
import ContractZH from './page/personalCenter/contract-zh';
import About from './page/personalCenter/about';
import ResetPassword from './page/modifyPasswd/resetPassword';
import ResetPassword2 from './page/modifyPasswd/resetPassword1';
import InviteCode from './page/invite/inviteCode';
import News1 from './page/news/1001';
import News2 from './page/news/1002';
import WithdrawReview from './page/withdrawReview/withdrawReview';
import Discover from './page/discover/discover'

import Game from './page/game/game'
import Exchange from './page/exchange/exchange'
import ExchangeOrders from './page/exchange/exchange-orders'
import ExchangeOrderDetail from './page/exchange/exchange-order-detail'

class App extends Component {
    render() {
        // let LayoutRouter = (
        //     <Layout>
        //         <Switch>
        //
        //         </Switch>
        //     </Layout>
        // );
        return (
            <Router>
                <Switch>

                    <Route exact path="/personal/center" component={PersonalCenter} />
                    <Route exact path="/news" component={News}/>

                    <Route exact path="/news/1001" component={News1}/>
                    <Route exact path="/news/1002" component={News2}/>


                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/register/setPassword" component={RegisterSecondStep}/>


                    <Route exact path="/assets/tx/detail/:txNo" component={TransactionDetail}/>
                    <Route exact path="/assets/tx/transfer/result" component={TransferResult}/>
                    <Route exact path="/assets/tx/transfer/:currency/:address" component={Transfer}/>
                    <Route exact path="/assets/tx/transfer/:currency" component={Transfer}/>
                    <Route exact path="/assets/tx/:currency" component={TransactionList}/>

                    <Route exact path="/assets" component={SelfAssets}/>

                    <Route exact path="/personal/address" component={WithdrawAddress}/>

                    <Route path="/message" component={MessageList}/>

                    <Route exact path="/personal/settings" component={Settings}/>
                    <Route exact path="/personal/safety/email" component={SafetyEmail}/>
                    <Route exact path="/personal/safety/mobile" component={SafetyMobile}/>
                    <Route exact path="/personal/safety/password/modify/set" component={ModifySecondStep}/>
                    <Route exact path="/personal/safety/password/modify" component={ModifyPasswd}/>
                    <Route exact path="/personal/safety/payPassword/modify/set" component={ModifySecondStep}/>
                    <Route exact path="/personal/safety/payPassword/modify" component={ModifyPasswd}/>
                    <Route exact path="/personal/safety" component={Safety}/>

                    <Route exact path="/personal/contract" component={Contract}/>
                    <Route exact path="/personal/contract/zh" component={ContractZH}/>
                    <Route exact path="/personal/about" component={About}/>
                    <Route exact path="/personal/password/reset" component={ResetPassword}/>
                    <Route exact path="/personal/password/reset2" component={ResetPassword2}/>

                    <Route exact path="/personal/invite" component={InviteCode}/>

                    <Route exact path="/admin/review" component={WithdrawReview}/>

                    {/*<Route exact path="/others" component={Discover}/>*/}
                    <Route exact path="/others" component={Exchange}/>

                    <Route exact path="/others/game" component={Game}/>

                    {/*<Route exact path="/others/exchange" component={Exchange}/>*/}
                    <Route exact path="/others/exchange/orders/:currency" component={ExchangeOrders}/>
                    <Route exact path="/others/exchange/order/info/:orderNo" component={ExchangeOrderDetail}/>


                    <Route exact path="/" component={SelfAssets}/>

                    {/*<Route path="/" render={props => LayoutRouter}/>*/}
                </Switch>
            </Router>
        )
    }
}

export default App;
