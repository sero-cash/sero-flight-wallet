import React, {Component} from 'react';
import { WhiteSpace } from 'antd-mobile';
import Language from './../../language/language.js';
import Axios from './../../service/service.js';
import Common from './../../common/common.js';
import "./news.css"
let Lang = new Language();
let _cc = new Common();
const ajax = new Axios();


class NEW1 extends Component {

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

        document.title = '五重利好助力SERO全球101超级用户海选';
    }

    render() {
        let that = this;
        return (
            <div>
                <WhiteSpace/>
                    <div className="common">

                        <h2 style={{textAlign:'center'}}>五重利好<br/>助力SERO全球101超级用户海选</h2>
                        <p>Matter Global Inc.（以下简称“Matter”或“我们”）是根据开曼（Cayman）法律设立的公司，SERO为Matter公司的新一代具有隐私保护机制的支持智能合约的区块链公链平台。</p>
                        <p>
                            <strong>第一重利好</strong>：Flight轻钱包开发进展顺利，4.8将正式开启全球公测，区块链历史上第一个全隐私数字资产管理钱包即将登陆全球，首批用户可以向客服获取邀请码，获得限量注册奖励；
                        </p>
                        <br/>
                        <p>
                            <strong>第二重利好</strong>：SERO已经正式和量子（QTUM）确定了技术战略合作，将共同在零知识证明和区块链隐私保护技术研究展开长期而深度的合作，无论从技术上还是生态上，QTUM和SERO都有巨大的合作空间，行业普遍认为这次战略合作将很可能对区块链下一步发展产生举足轻重的价值；
                        </p>
                        <p>
                            <strong>第三重利好</strong>：为了庆祝SEROFlight钱包上线，一些早期神秘矿主已经向SERO基金会捐助了超过百万枚SERO，用于全球共识推广；
                        </p>
                        <p>
                            <strong>第四重利好</strong>：SERO将在2019.4.8正式开启全球超级用户的召募计划，未来101名超级用户将在SERO全球隐私生态中扮演重要的角色。超级用户 – 启蒙， 是第一阶段的实施，旨在选出对SERO全球共识推广作出卓越贡献的101名全球意见领袖，具体活动规则详见官方微信公众号（SERO超零协议）；
                        </p>
                        <p>
                            <strong>第五重利好</strong>：SERO近日通过了全球顶尖评测机构—达令智库的项目评测，并获得了BB级别的最终评分，该评测机构为全球区块链创新50强榜单研究支持、发布者，一直以来该机构选择评测项目非常严格，并一直基于非常严格的评测标准，BB等级也是目前为止，该评测机构为数十个项目评测结果中的最高得分！
                        </p>
                    </div>
                <WhiteSpace/>
            </div>
        )
    }
}

export default NEW1;
