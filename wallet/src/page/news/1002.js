import React, {Component} from 'react';
import { Icon ,NavBar ,List,WhiteSpace } from 'antd-mobile';
import Language from './../../language/language.js';
import Axios from './../../service/service.js';
import Common from './../../common/common.js';
import "./news.css"
let Item = List.Item;
let Brief = Item.Brief;

let Lang = new Language();
let _cc = new Common();
const ajax = new Axios();


class NEW2 extends Component {

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

        document.title = 'SERO开启超级用户招募计划';
    }

    render() {
        let that = this;
        return (
            <div>
                <WhiteSpace/>
                <div className="common">

                    <h2 style={{textAlign:'center'}}>SERO开启超级用户招募计划</h2>

                    <p>超级隐私项目SERO的101超级用户，是SERO社区全球的中坚力量，囊括了对SERO全球共识推广作出巨大贡献者、网络发展意见领袖（KYC）、生态建设参与者以及重要的矿工组织成员等。</p>
                    <p>在整个101超级用户计划中旨在选出总共101名成员，全球用户都可以在整个系列活动过程中匿名参与，人人平等。超级用户101是一种开放的社区身份，在既定规则下可以放弃该身份，以及所对应的权利和义务。</p>
                    <p>超级用户101按计划，随着社区的发展不同阶段，将分为五个阶段实施，目前已被披露并即将启动的是：</p>
                    <p>第一阶段：超级用户 – 启蒙， 目的是选出对SERO全球共识推广作出卓越贡献的101名全球意见领袖（KYC）</p>
                    <p>101超级用户的权利和义务：</p>
                    <p>1、每位超级用户都将获得不同阶段版本的限量纪念T恤；</p>
                    <p>2、每位超级用户将获得101限量超级用户纪念币（在SERO上发行的），该纪念币是唯一身份标识；</p>
                    <p>3、每位超级用户都将获得SERO生态产品的优先公测权（如本次Flight钱包）；</p>
                    <p>4、每位超级用户将会优先获得SERO生态产品推广过程中所包含的优先福利；</p>
                    <p>5、每位超级用户在生态建设中（如设立公会、搭建矿池、发行数字货币、DAPP应用开发等），有机会获得SERO官方团队的技术一对一支持；</p>
                    <p>6、每个阶段获得超级用户身份都需要完成该阶段活动对应的超级用户101达成任务条件；</p>
                    <p>7、部分获得认证的超级用户可以由官方授权开展部分生态相关业务（如交易所、矿池运营、技术服务、参与主网开发等，以及在部分业务中将在官网上被认证）；</p>
                    <p>8、超级用户可以在匿名情况下加入超级用户社区，需要保持一定的活跃度并保持随时可沟通的状态；</p>
                    <p>SERO同时也在考虑将在适时的时间召开全球101超级用户大会的计划。</p>
                    <p></p>
                    <p>如期而至！SERO Flight Wallet公测版已经正式发布，官网首页和Github均可下载，这也是全球第一个全隐私数字资产管理钱包，该钱包未来将可以管理所有基于SERO公链生态的数字资产，首批限量用户将在完成注册后获得早期矿主赠予奖励。</p>
                    <p>SERO，基于零知识证明的隐私数字货币，在拥有至高隐私安全基础上，竟然还能如此快速实现转账，Wow。</p>
                    <p>作为SERO生态钱包的第一个版本，为什么命名为“Flight”呢？可能要用了才知道吧：）</p>
                    <p></p>
                    <p>本次活动的所有SERO币，来源于不愿意透露姓名的早期矿主（是的，谁不想要隐私呢？）无论如何，感谢他们！</p>
                    <p></p>
                    <p>All of the SERO COINS for the event came from anonymous early mine owners (yes, who doesn't want privacy?). Thank them anyway!</p>
                    <p></p>
                    <p>SERO已经正式和量子（QTUM）达成了在技术领域的深度战略合作，将共同在零知识证明和区块链隐私保护技术研究展开长期合作，无论从技术上还是生态上，QTUM和SERO都有巨大的合作空间，行业普遍认为这次战略合作将很可能对区块链下一步发展产生举足轻重的价值。</p>
                    <p></p>
                    <p>SERO近日通过了全球顶尖评测机构 - 达令智库的项目评测，并获得了BB级别的最终评分，该评测机构为全球区块链创新50强榜单研究支持、发布者，一直以来该机构选择评测项目非常严格，并一直基于非常严格的评测标准，BB等级也是目前为止，该评测机构为数十个项目评测结果中的最高得分！</p>

                </div>
                <WhiteSpace/>
            </div>
        )
    }
}

export default NEW2;
