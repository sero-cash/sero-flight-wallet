import React, {Component} from 'react';
import {WhiteSpace,NavBar,Icon } from 'antd-mobile';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import "./contract.css"
import {urls} from "../../common/url";

let Lang = new Language();
let _cc = new Common();


class AboutUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'en_US',
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            if (_cc.getStorage('language') === 'zh_CN') {
                this.setState({
                    language: 'zh_CN',
                })
            } else {
                this.setState({
                    language: 'en_US',
                })
            }
        }

        document.title = Lang.aboutUs[_cc.getStorage('language')]
    }


    render() {
        let that = this;
        return (
            <div>
                <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>

                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    leftContent={Lang.back[this.state.language]}
                    onLeftClick={() =>  {urls.personalCenter()}}
                >
                    {Lang.personal.about[this.state.language]}
                </NavBar>
                </div>
                <WhiteSpace/>

                {"zh_CN" === that.state.language?(
                    <div className="common">
                        <br/><br/>
                    <p>Matter Global Inc.（以下简称“Matter”或“我们”）是根据开曼（Cayman）法律设立的公司，SERO为Matter公司的新一代具有隐私保护机制的支持智能合约的区块链公链平台。</p>
                    <p>
                        SERO Flight：Matter Global Inc.开发、运营、管理、并享有合法所有权的软件平台/网站/手机app客户端，提供区块链资产本地钱包、托管账户等服务，域名为wallet.sero.cash, 支持在Android系统和iOS系统上使用。 Matter Global Inc.通过该软件为用户提供：包括且不仅限于超零币（SERO）、基于SERO公链发行的其它数字货币、票据等数字资产。
                    </p>
                        <br/>
                        <br/>
                        <p>官网：<a href="https://sero.cash">https://sero.cash</a></p>
                        <p>Twitter: <a href="https://twitter.com/SEROdotCASH">https://twitter.com/SEROdotCASH</a></p>
                        <p>公众号: SEROdotCASH</p>
                        <p>Telegram: <a href="https://t.me/SeroOfficial">https://t.me/SeroOfficial</a></p>
                </div>):(
                    <div className="common">
                        <br/><br/>
                        <p>Matter Global Inc. (hereinafter referred to as "Matter" or "we") is a company set up under Cayman law, and SERO is a new generation of block chain public chain platform supported by smart contract with privacy protection mechanism of Matter.</p>
                        <p>SERO Flight: Matter Global Inc., a software platform/website/mobile app client developed, operated, managed and legally owned by Matter Global Inc., provides blockchain asset local wallet, managed account and other services. The domain name is wallet. Through this software, Matter Global inc. provides users with digital assets, including but not limited to: super zero COINS (SERO), other digital currencies, notes and other digital assets based on SERO public chain.</p>
                        <br/>
                        <p>Website：<a href="https://sero.cash">https://sero.cash</a></p>
                        <p>Twitter: <a href="https://twitter.com/SEROdotCASH">https://twitter.com/SEROdotCASH</a></p>
                        <p>WeChat: SEROdotCASH</p>
                        <p>Telegram: <a href="https://t.me/SeroOfficial">https://t.me/SeroOfficial</a></p>
                    </div>
                )}
                <WhiteSpace/>
            </div>
        )
    }
}

export default AboutUs;
