import React from "react";
import { createHashHistory } from 'history'

export const urls = {

    go(url){
        window.location.href = url;
    },
    login(){
        return this.go("#/login")
    },
    back(){
      window.history.back();
    },
    register(){
        return this.go("#/register")
    },

    home(){
        return this.go("#/")
    },

    personalCenter(){
        return this.go("#/personal/center")
    },

    news(){return this.go("#/news")},
    news01(t){return this.go(`#/news/${t}`)},
    news02(){return this.go("#/news/1002")},
    setPassword(){return this.go("#/register/setPassword")},
    txDetail(txNo){return this.go(`#/assets/tx/detail/${txNo}`)},
    txResult(){return this.go("#/assets/tx/transfer/result")},
    transferCyAndAddr(currency,address){return this.go(`#/assets/tx/transfer/${currency}/${address}`)},
    transferCy(currency){return this.go(`#/assets/tx/transfer/${currency}`)},
    transactionList(currency){return this.go(`#/assets/tx/${currency}`)},
    assets(){return this.go("#/assets")},
    personalAddress(){return this.go("#/personal/address")},
    message(){return this.go("#/message")},
    settings(){return this.go("#/personal/settings")},
    safetyEmail(){return this.go("#/personal/safety/email")},
    safeMobile(){return this.go("#/personal/safety/mobile")},
    safePasswordSet(){return this.go("#/personal/safety/password/modify/set")},
    safePasswordModify(){return this.go("#/personal/safety/password/modify")},
    safePayPasswordSet(){return this.go("#/personal/safety/payPassword/modify/set")},
    safePayPasswordModify(){return this.go("#/personal/safety/payPassword/modify")},
    safety(){return this.go("#/personal/safety")},

    contract(){return this.go("#/personal/contract")},
    contractZH(){return this.go("#/personal/contract/zh")},
    about(){return this.go("#/personal/about")},
    passwordReset(){return this.go("#/personal/password/reset")},
    passwordReset2(){return this.go("#/personal/password/reset2")},
    invite(){return this.go("#/personal/invite")},
    review(){return this.go("#/admin/review")},
    others(){return this.go("#/others")},
    othersGame(){return this.go("#/others/game")},
    exchangeOrders(currency){return this.go(`#/others/exchange/orders/${currency}`)},
    exchangeOrderDetail(orderNo){return this.go(`/others/exchange/order/info/${orderNo}`)},

}
