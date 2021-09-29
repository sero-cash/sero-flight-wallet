import React, {Component} from 'react';
import { Icon ,NavBar ,List,WhiteSpace } from 'antd-mobile';

import Language from './../../language/language.js';
import Axios from './../../service/service.js';
import Common from './../../common/common.js';
import "./contract.css"
import {urls} from "../../common/url";
let Item = List.Item;
let Brief = Item.Brief;

let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();


class Contract extends Component {

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
        document.title = Lang.personal.contract[_cc.getStorage('language')];

    }


    render() {
        return (
            <div>
                <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>

                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    leftContent={Lang.back[this.state.language]}
                    onLeftClick={() =>  {urls.personalCenter()}}
                >
                    {Lang.personal.contract[this.state.language]}
                </NavBar>
                </div>
                <WhiteSpace/>


                <div className="common" style={{display:_cc.getStorage('language') === 'zh_CN'?'block':'none'}}>
                    <h2 style={{textAlign:'center'}}>《用户服务协议》</h2>
                    <p>Matter Global Inc.（以下简称“Matter”或“我们”）是根据开曼（Cayman）法律设立的公司。《SERO Flight钱包用户协议》（以下简称“本协议”）由Matter Global Inc.和用户（以下简称“您”或者“用户”）签订，本协议在您与Matter 之间具有合同上的法律效力。</p>
                    <p>在您使用我们提供的服务之前，<strong>请您认真阅读本协议，尤其是本协议规定的“免责及责任限制”等条款将以加粗的形式体现，确保您充分理解本协议中各条款，并自主考虑风险。</strong></p>
                    <p>1. 关于本协议的确认与接纳</p>
                    <p>1.1 您理解本协议及有关协议适用于SERO Flight团队所自主开发和拥有的应用及服务，包括但不仅限于去中心化应用（简称“DApp”）（排除第三方开发的DApp）、中心化应用（简称“App”）（排除第三方开发的DApp）。</p>
                    <p>1.2 您下载SERO Flight软件并创建或导入账户，即视为您已经充分阅读并接受本协议全部条款，本协议立即生效，对双方具有约束力。</p>
                    <p>1.3 本协议可由Matter随时更新，经修改的协议一经公布，立即自动生效，恕不再另行通知。在Matter公布修改协议条款后，如果您不接受修改后的条款，请立即停止使用SERO Flight，您继续使用SERO Flight将被视为接受修改后的协议。</p>
                    <p>1.4 在使用我们的服务前，请您确认您已满18周岁。</p>
                    <p>2. 名词定义</p>
                    <p>2.1 SERO Flight：Matter Global Inc.开发、运营、管理、并享有合法所有权的软件平台/网站/手机app客户端，提供区块链资产本地钱包、托管账户等服务，域名为wallet.sero.cash, 支持在Android系统和iOS系统上使用。 Matter Global Inc.通过该软件为用户提供：区块链数字资产的本地、在线管理服务。</p>
                    <p>2.2 用户：</p>
                    <p>（1）<strong>用户必须是具备完全民事行为能力的自然人；</strong></p>
                    <p>（2）若您为18周岁以下的未成年人使用SERO Flight服务，需要在您父母或监护人的指导下使用SERO Flight。无民事行为能力人使用SERO Flight或限制民事行为能力人超过其民事权利或行为能力范围从事交易的，造成的一切后果，SERO Flight有权要求您及您的监护人负责。</p>
                    <p>2.3 区块链：将数据区块以顺序相连的方式，组合而成的一种链式数据结构， 并以密码学的方式，保证其不可篡改和不可伪造的分布式账本。它使用块链式数据结构来验证与存储数据，使用分布式节点以及共识算法来生成和更新数据，使用密码学的方式保证数据传输和访问的安全，使用自动化脚本代码组成的智能合约来编程和操作数据，是一种全新的分布式基础架构与计算范式。</p>
                    <p>2.4 区块链资产或数字资产：存在于区块链数据中的密码学账户中的数字，它被视为账户合法所有者的数字资产，包括但不限于超零币（SERO）和基于SERO发行的其它数字货币、票据等各类数字资产。</p>
                    <p>2.5 钱包密码：指您在创建SERO Flight钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或Matter的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。</p>
                    <p>2.6 助记词：符合区块链BIP39 行业标准，由随机算法生成的12个有序单词组成。是私钥的易记录表现形式，方便用户备份保管。创建助记词的过程属于用户端本地行为，可以在断网的情况下操作，与服务端没有任何关系，因此<strong>SERO Flight不掌握用户助记词，无法僭越用户管理钱包资产，也无法为用户找回助记词。</strong>SERO Flight遵循BIP32、BIP39以及BIP44标准，任何其他遵循该标准的钱包均可用使用同一助记词来恢复和管理您的区块链资产。</p>
                    <p>2.7 矿工费：用户进行区块链上资产转移的时候，向区块链矿工节点支付的交易确认费用，该费用收取方为矿工。</p>
                    <p>2.8 个人信息：以电子或者其他方式记录的能够单独或者与其他信息结合识别用户个人身份的各种信息，包括但不限于自然人的姓名、出生日期、身份证件号码、个人生物识别信息、住址、电话号码、银行卡号、邮件地址、钱包地址、移动设备信息、操作记录、交易记录等，但不包括用户的钱包密码、私钥、助记词。</p>
                    <p>3. 服务内容</p>
                    <p>3.1 创建或导入钱包：对SERO Flight支持的数字资产，您可以使用SERO Flight生成新钱包或通过助记词导入之前已生成的钱包。</p>
                    <p>3.2 转账、收款：您可以使用SERO Flight的转账、收款功能进行数字资产的管理，即运用私钥进行电子签名，对相关区块链的账本进行修改。转账是指付款方利用收款方的区块链地址进行转账操作，实际的转账、收款行为均在相关区块链系统（而非SERO Flight）发生。</p>
                    <p>3.3 交易记录：我们将通过区块链系统拷贝您全部或部分的交易记录。交易记录以相应区块链系统的记载为准。</p>
                    <p>3.4 管理数字资产。您可以使用SERO Flight添加、保管并移除SERO Flight所支持的数字资产。</p>
                    <p>3.5 浏览DApp：用户通过在SERO Flight上的链接，可以跳转至DApp并使用该DApp（包括Matter自己的DApp和第三方DApp）提供的服务。浏览DApp。用户通过在SERO Flight上的链接，可以跳转至DApp并使用该DApp（包括Matter自己的DApp和第三方DApp）提供的服务。</p>
                    <p>3.6 暂停或撤销。您知悉基于区块链系统交易“不可撤销”的属性，我们不能为您暂停或撤销发币等操作。</p>
                    <p>3.7 其他Matter认为有必要提供的服务。</p>
                    <p>4. 隐私条款</p>
                    <p>Matter十分重视对用户隐私的保护，相关隐私保护政策请参考Matter公布并不时更新的《SERO Flight隐私政策》。</p>
                    <p>5. 风险提示</p>
                    <p>5.1 您了解并知悉，由于数字资产领域的法律法规政策尚未健全，该领域的数字资产可能会产生无法兑现、技术不稳定、灭失等重大风险。且数字资产的价格波动幅度远高于其他金融资产。我们谨慎提醒您应当根据自身财务状况和风险偏好，理性选择持有或处置任何一种数字资产。</p>
                    <p>5.2 在使用SERO Flight服务时，若您或您的相对方未遵从本协议或相关网站说明或交易、支付页面中之操作提示、规则，SERO Flight并不保证交易会顺利完成，且SERO Flight不承担损害赔偿责任。若发生前述情形，而款项已先行入账您的或您的交易方的SERO Flight钱包或第三方钱包，您理解区块链操作具有的“不可逆”属性，以及相关交易具有“不可撤销”的特征，由您及您的相对方自行承担相应的风险后果。</p>
                    <p>5.3 在您使用SERO Flight集成的第三方DApp服务或进行交易时，为了您的利益，Matter建议您仔细阅读本协议及SERO Flight提示，了解交易对象及产品信息，谨慎评估风险后再采取行动。所有您在第三方DApp进行的交易行为系您的个人行为，有约束力的合同关系在您和您的相对方之间建立，与SERO Flight无关。SERO Flight对因您的交易行为所引起的一切风险、责任、损失、费用不承担任何责任。</p>
                    <p>5.4 您在交易过程中应当自行判断对方是否为完全民事行为能力人并自行决定是否与对方进行交易或转账给对方等，且您自行承担与此相关的所有风险。</p>
                    <p>5.5 在转账过程中，如果出现“交易失败”、“打包超时”等类似的异常信息提示时，您应通过相关区块链系统的官方途径或其他的区块链查询工具进行再次确认，以避免重复转账；否则，由此所引起的一切损失和费用应由您自行承担。</p>
                    <p>5.6 您理解当您在SERO Flight上创建或导入钱包之后，您的、私钥、助记词等信息仅存储在当前的这台移动设备中，不存储在SERO Flight或Matter的服务器上。您可以按照SERO Flight提供的操作指南采取同步钱包等方式更换移动设备。但<strong>若您未保存或备份钱包密码、私钥、助记词等信息且在您移动设备丢失的情况下，您的数字资产将因此丢失，Matter无法为您找回，您需自行承担相应损失</strong>。若您在导出、保存或备份钱包密码、私钥、助记词等信息的时候泄密，或保存或备份上述信息的设备或服务器被黑客攻击或控制等情况下，您的数字资产将因此丢失，Matter无法为您找回，您需自行承担相应损失。</p>
                    <p>5.7 我们建议您在创建或导入钱包时对您钱包的钱包密码、私钥、助记词等信息做好安全备份。我们提请您注意，请不要采用以下备份方式：截图、邮件、记事本、短信、微信、QQ等电子备份方式。我们建议您在纸质记事本上抄写助记词等信息，同时您亦可将电子数据保管至密码管理器。</p>
                    <p>5.8 我们建议您在安全的网络环境中使用SERO Flight，确保您的移动设备没有越狱或Root，以避免可能存在的安全隐患。</p>
                    <p>5.9 请您在使用我们的服务过程中，警惕非SERO Flight官方的诈骗行为。一旦发现此类行为，我们鼓励您第一时间告知我们。</p>
                    <p>6. 服务的变更、终端、终止</p>
                    <p>6.1 您同意Matter为保证自主业务经营权可以暂时提供部分服务功能，或于将来暂停部分服务功能或开通新的服务功能。当任何功能减少或者增加或者变化时，只要您仍然使用Matter提供的服务，表示您仍然同意本协议或者本协议修正后的条款。</p>
                    <p>6.2 您理解存在如下情形时，Matter将暂停提供服务：</p>
                    <p>（1）因设备、区块链系统维修、升级、故障和通信中断等技术原因而中断业务；</p>
                    <p>（2）因台风、地震、海啸、洪水、停电、战争或恐怖袭击等不可抗力因素，病毒、木马、黑客攻击、系统不稳定或政府行为等原因，造成Matter系统不能提供服务或Matter合理认为继续提供服务会有较大风险的；</p>
                    <p>（3）发生Matter无法控制或合理预见的其他情形。</p>
                    <p>6.3 当您出现如下情况时，Matter可单方面中止或终止您使用SERO Flight的部分或全部功能:</p>
                    <p>（1）用户死亡；</p>
                    <p>（2）盗用他人的钱包信息或移动设备；</p>
                    <p>（3）您提供的个人资料不真实；</p>
                    <p>（4）拒绝Matter为提升SERO Flight功能而发起的强制更新操作；</p>
                    <p>（5）将SERO Flight用于违法或犯罪活动；</p>
                    <p>（6）妨碍其他用户正常使用；</p>
                    <p>（7）伪称Matter的工作人员或管理人员；</p>
                    <p>（8）攻击、侵入、更改或以任何其他方式威胁Matter计算机系统的正常运作；</p>
                    <p>（9）利用SERO Flight宣传垃圾广告；</p>
                    <p>（10）散布谣言，损害Matter和SERO Flight商誉；</p>
                    <p>（11）违法行为，其他违反本协议的行为，及Matter合理认为应当暂停功能的情形。</p>
                    <p>6.4 当您与Matter之间的服务关系变更、中断、终止时，您仍有权在合理时间内导出您的钱包等信息。</p>
                    <p>7. 您合法使用Matter服务的承诺</p>
                    <p>7.1 您应遵守您所居住的国家或地区的法律法规，不得将SERO Flight用于任何非法目的，也不得以任何非法方式使用Matter 服务。</p>
                    <p>7.2 您不得利用SERO Flight从事违法或犯罪的行为，包括但不限于：</p>
                    <p>（1）危害国家安全、泄漏国家秘密、颠覆国家政权、破坏国家统一的；</p>
                    <p>（2）从事任何违法犯罪行为，包括但不限于洗钱、非法集资等；</p>
                    <p>（3）通过使用任何自动化程序、软件、引擎、网络爬虫、网页分析工具、数据挖掘工具或类似工具，接入Matter 服务、收集或处理Matter 所提供的内容，干预或试图干预任何用户或任何其他方式接入Matter 服务的行为；</p>
                    <p>（4）提供赌博资讯或以任何方式引诱他人参与赌博；</p>
                    <p>（5）侵入他人SERO Flight钱包盗取数字资产；</p>
                    <p>（6）进行与交易对方宣称的交易内容不符的交易，或不真实的交易；</p>
                    <p>（7）从事任何侵害或可能侵害SERO Flight服务系统、数据之行为；</p>
                    <p>（8）其他违法以及Matter 有正当理由认为不适当的行为。</p>
                    <p>7.3 您理解并同意，如因您违反有关法律（包括但不限于海关及税务方面的监管规定）或者本协议之规定，使Matter 遭受任何损失、受到任何第三方的索赔或任何行政管理部门的处罚，您应对Matter 进行赔偿，包括为主张权利所付出的律师费在内的全部合理费用。</p>
                    <p>7.4 您承诺按时缴纳Matter 的服务费用（如有），否则Matter 有权暂停或中止对您提供的服务。</p>
                    <p>8. 免责及责任限制</p>
                    <p>8.1 Matter仅对本协议中所列明的义务承担责任。</p>
                    <p>8.2 您理解和同意，在法律所允许的范围内，Matter只能按照现有的技术水平和条件提供服务。因下列原因导致SERO Flight无法正常提供服务，Matter不承担责任：</p>
                    <p>（1）SERO Flight系统停机维护或升级；</p>
                    <p>（2）因台风、地震、洪水、雷电或恐怖袭击等不可抗力原因；</p>
                    <p>（3）您的移动设备软硬件和通信线路、供电线路出现故障的；</p>
                    <p>（4）您操作不当或未通过Matter授权或认可的方式使用Matter服务的；</p>
                    <p>（5）因病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、电力故障、银行等原因或政府行为等原因；</p>
                    <p>（6）非因Matter的原因而引起的任何其它原因。</p>
                    <p>8.3 Matter对以下情形不承担责任：</p>
                    <p>（1）因用户遗失移动设备、删除且未备份SERO Flight、删除且未备份钱包、钱包被盗或遗忘钱包密码、私钥、助记词而导致的数字资产丢失；</p>
                    <p>（2）因用户自行泄露钱包密码、私钥、助记词，或借用、转让或授权他人使用自己的移动设备或SERO Flight钱包，或未通过Matter官方渠道下载SERO Flight应用程序或其他不安全的方式使用SERO Flight应用程序导致的数字资产丢失；</p>
                    <p>（3）因用户误操作（包括但不限于您输错转账地址、您自身选择转账节点服务器的问题）导致的数字资产丢失；</p>
                    <p>（4）因用户不理解区块链技术的性质而进行误操作导致的数字资产丢失；</p>
                    <p>（5）因时间滞后、区块链系统不稳定等原因导致Matter拷贝用户在区块链上的交易记录发生偏差；</p>
                    <p>（6）用户在第三方DApp上操作产生的风险和后果。</p>
                    <p>8.4 您理解SERO Flight仅作为您数字资产管理的工具。Matter不能控制第三方DApp提供的产品及服务的质量、安全或合法性，信息的真实性或准确性，以及相对方履行其在与您签订的协议项下的各项义务的能力。所有您在第三方DApp进行的交易行为系您的个人行为，有约束力的合同关系在您和您的相对方之间建立，与SERO Flight无关。Matter提醒您应该通过自己的谨慎判断确定登录DApp及相关信息的真实性、合法性和有效性。您与任何第三方交易所产生的风险亦应由您自行承担。</p>
                    <p>8.5 Matter可能同时为您及您的交易对手方提供服务，您同意对Matter可能存在的该等行为予以明确豁免任何实际或潜在的利益冲突，并不得以此来主张Matter在提供服务时存在法律上的瑕疵，也不因此而加重Matter的责任或注意义务。</p>
                    <p>8.6 Matter不提供以下形式的保证：</p>
                    <p>（1）Matter服务将符合您的全部需求；</p>
                    <p>（2）您经由Matter服务取得的任何技术、产品、服务、资讯将符合您的期望；</p>
                    <p>（3）Matter从第三方交易所抓取的数字资产市场交易行情等信息的及时性、准确性、完整性、可靠性做出保证；</p>
                    <p>（4）您在SERO Flight上的交易各方会及时履行其在与您达成的交易协议中各项义务。</p>
                    <p>8.7 在任何情况下，Matter对本协议所承担的违约赔偿责任总额不超过1）0.1个以太币；或2）人民币500元，以较高的为准。</p>
                    <p>8.8 您理解SERO Flight仅作为用户管理数字资产、显示交易信息的工具，Matter不提供法律、税务或投资建议等服务。您应当自行向法律、税务、投资方面的专业人士寻求建议，且您在使用我们服务过程中所遭受的投资损失、数据损失等，Matter概不负责。</p>
                    <p>8.9 您理解根据有关本地政策法规的要求，我们可能不时更改我们的用户准入标准，限定向某一特定群体提供服务的范围和方式等。</p>
                    <p>9. 知识产权保护</p>
                    <p>9.1 SERO Flight系Matter开发并拥有知识产权的应用程序。 SERO Flight中显示的任何内容（包括但不限于本协议、公告、文章、视频、音频、图片、档案、资讯、资料、商标或标识）的知识产权归Matter或第三方权利人所有。用户仅可为持有和管理数字资产之目的使用SERO Flight应用程序及其中的内容。未经Matter或第三方权利人的事先书面同意，任何人不得擅自使用、修改、反向编译、复制、公开传播、改变、散布、发行或公开发表上述应用程序及内容。</p>
                    <p>10. 协议期限</p>
                    <p>10.1 您和我们定立的这份协议是无固定期限协议，如果您做出以下行为，我们有权随时终止合约并立即生效：</p>
                    <p>（1）您触犯或违反本协议中的任何条款；</p>
                    <p>（2）我们认为您滥用应用程序或服务。</p>
                    <p>11. 法律适用及争议解决</p>
                    <p>11.1 本协议及其修订版之效力、解释、变更、执行与争议解决均适用大不列颠及北爱尔兰联合王国法律，如无相关法律规定，则应当适用国际商业惯例和（或）行业惯例。</p>
                    <p>11.2 若您和Matter之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，任何一方可提交Matter所在地有管辖权的法院管辖。</p>
                    <p>12. 其他</p>
                    <p>12.1 您需全面了解并遵守您所在司法辖区与使用Matter服务所有相关法律、法规及规则。</p>
                    <p>12.2 您在使用Matter服务过程中，如遇到任何问题，您可以通过在SERO Flight提交反馈等方式联系我们。</p>
                    <p>12.3 您可以在SERO Flight中查看本协议。 Matter鼓励您在每次访问SERO Flight时都查阅Matter的服务协议。</p>
                    <p>12.4 本协议自2018年03月22日起适用。</p>
                    <p>12.5 本协议的任何译文版本仅为方便用户而提供，无意对本政策的条款进行修改。如果本政策的中文版本与非中文版本之间存在冲突，应以中文版本为准。</p>
                    <p>本协议未尽事宜，您需遵守Matter不时更新的公告及相关规则。</p>
                    <p>Matter Global Inc.</p>
                    <h2 style={{textAlign:'center'}}>《SERO Flight隐私政策》</h2>
                    <p><strong>Matter Global Inc.（以下简称“Matter ”或“我们”）尊重并保护用户（以下简称“您”或“用户”）的隐私，您使用SERO Flight时，Matter 将按照本隐私政策（以下简称“本政策”）收集、使用您的个人信息。</strong></p>
                    <p><strong>Matter 建议您在使用本产品（以下简称“SERO Flight”）之前仔细阅读并理解本政策全部内容, 针对免责声明等条款在内的重要信息将以加粗的形式体现。本政策有关关键词定义与Matter《SERO Flight用户服务协议》保持一致。</strong></p>
                    <p><strong>本政策可由Matter 在线随时更新，更新后的政策一旦公布即代替原来的政策，如果您不接受修改后的条款，请立即停止使用SERO Flight，您继续使用SERO Flight将被视为接受修改后的政策。经修改的政策一经在SERO Flight上公布，立即自动生效。</strong></p>
                    <p>您知悉本政策及其他有关规定适用于SERO Flight及SERO Flight上Matter 所自主拥有的DApp或App。</p>
                    <p>1. 我们收集您的哪些信息</p>
                    <p>请您知悉，我们收集您的以下信息是出于满足您在SERO Flight服务需要的目的，且我们十分重视对您隐私的保护。在我们收集您的信息时，将严格遵守“合法、正当、必要”的原则。且您知悉，若您不提供我们服务所需的相关信息，您在SERO Flight的服务体验可能因此而受到影响。</p>
                    <p>1.1 您授权我们收集并保存您的以下个人信息：</p>
                    <p>• 身份识别信息，包括但不限于您的姓名、身份证明、联系地址、电话号码、生物特征信息。</p>
                    <p>• 平台操作信息，包括但不限于您的IP地址、设备型号、设备标识符、操作系统版本信息。</p>
                    <p>• 支付信息，包括但不限于您的支付时间、支付金额、支付工具、账户等信息。</p>
                    <p>• 个人信用信息，包括但不限于关于您的任何信用状况、信用分、信用报告信息。</p>
                    <p>• 我们收集数据是根据您与我们的互动和您所做出的选择，包括您的隐私设置以及您使用的产品和功能。我们收集的数据可能包括SDK/API/JS代码版本、浏览器、互联网服务提供商、IP地址、平台、时间戳、应用标识符、应用程序版本、应用分发渠道、独立设备标识符、iOS广告标识符（IDFA)、安卓广告主标识符、网卡（MAC）地址、国际移动设备识别码（IMEI）、设备型号、终端制造厂商、终端设备操作系统版本、会话启动/停止时间、语言所在地、时区和网络状态（WiFi等）、硬盘、CPU和电池使用情况等。</p>
                    <p>• 其他根据我们具体产品及服务的需要而收集的您的个人信息，包括但不限于您对我们及我们的产品或服务的意见、建议、您曾经使用或经常使用的移动应用软件以及使用场景和使用习惯等信息。</p>
                    <p>1.2 保护用户隐私是本公司的一项基本政策，未经您事先同意，SERO Flight不会将您的个人信息向任何第三方共享或转让，但以下情况除外：</p>
                    <p>（1）事先获得您明确的同意或授权；</p>
                    <p>（2）所收集的个人信息是您自行向社会公众公开的；</p>
                    <p>（3）所收集的个人信息系从合法公开披露的信息中收集，如合法的新闻报道，政府信息公开等渠道；</p>
                    <p>（4）与SERO Flight的关联方共享，我们只会共享必要的用户信息，且受本隐私条款中所声明的目的的约束；</p>
                    <p>（5）根据所在国家适用的法律法规、法律程序的要求、行政机关或司法机关的要求进行提供；</p>
                    <p>（6）在涉及合并、收购时，如涉及到个人信息转让，SERO Flight将要求个人信息接收方继续接受本政策的约束；</p>
                    <p>（7）我们有理由认为您违反了本协议的某一（些）条款而给SERO Flight或第三方造成损害时。</p>
                    <p>1.3 我们收集信息的方式如下：</p>
                    <p>（1）您向我们提供信息。例如，您在“个人中心”页面中填写姓名、手机号码或银行卡号，或在反馈问题时提供邮件地址，或在使用我们的特定服务时，您额外向我们提供。</p>
                    <p>（2） 我们在您使用SERO Flight的过程中获取信息，包括您移动设备信息以及您对SERO Flight的操作记录等信息；</p>
                    <p>（3） 我们通过区块链系统，拷贝您全部或部分的交易记录。但交易记录以区块链系统的记载为准。</p>
                    <p>2. <strong>我们如何使用您的信息</strong></p>
                    <p>2.1 我们使用数据来不断改进我们的产品，包括增加新的功能或容量。例如，我们通过您移动设备的唯一指纹，确认您与您的钱包的对应关系。</p>
                    <p>2.2 我们将向您及时发送重要通知，如软件更新、服务协议及本政策条款的变更。</p>
                    <p>2.3 我们在SERO Flight的“系统设置”中为您提供多种登录方式选项，让您方便且更安全地管理您的数字资产。</p>
                    <p>2.4 我们通过收集您公开的钱包地址和提供的移动设备信息来处理您向我们提交的反馈。</p>
                    <p>2.5 我们收集您的个人信息进行Matter 内部审计、数据分析和研究等，以期不断提升我们的服务水平。</p>
                    <p>2.6 依照《SERO Flight服务协议》及Matter 其他有关规定，Matter 将利用用户信息对用户的使用行为进行管理及处理。</p>
                    <p>2.7 法律法规规定及与监管机构配合的要求。</p>
                    <p>2.8我们已在上文介绍了处理个人数据的目的。我们处理个人数据的法律基础包括：为履行与您之间的合同（例如，为您提供您所请求的服务、对您进行识别和认证，以便您可以使用网站）；为遵守法律要求（例如，为遵守适用的会计规则，履行执法部门强制披露的要求）；为保护我们的正当利益（例如，管理我们与您的关系，为确保我们服务的安全性，与您沟通我们的产品和服务）；以及基于我们客户的同意（例如，投放cookies，为广告宣传之目的与第三方共享您的信息）。</p>
                    <p>3. <strong>您如何控制自己的信息</strong></p>
                    <p>您在SERO Flight中拥有以下对您个人信息自主控制权：</p>
                    <p>3.1 您可以通过同步钱包的方式，将您的其他钱包导入SERO Flight中，或者将您在SERO Flight的钱包导入到其他数字资产管理钱包中。SERO Flight将向您显示导入钱包的信息。</p>
                    <p>3.2 您知悉您可以通过“资产”版块内容修改您的数字资产种类、进行转账及收款等活动。</p>
                    <p>3.3 您知悉在SERO Flight“我的”的版块您可以自由选择进行如下操作：</p>
                    <p>（1） 在“个人中心”中，您并不需要提供自己的姓名、手机号码、银行卡等信息，但当您使用特定服务时，您需要提供以上信息；</p>
                    <p>（2） 在“提交反馈”中，您可以随时向我们提出您对SERO Flight问题及改进建议，我们将非常乐意与您沟通并积极改进我们的服务。</p>
                    <p>3.4 您知悉当我们出于特定目的向您收集信息时，我们会提前给予您通知，您有权选择拒绝。但同时您知悉，当您选择拒绝提供有关信息时，即表示您放弃使用SERO Flight的有关服务。</p>
                    <p>3.5 您知悉，您及我们对于您交易记录是否公开并没有控制权，因为基于区块链交易系统的开源属性，您的交易记录在整个区块链系统中公开透明。</p>
                    <p>3.6 您知悉当您使用SERO Flight的功能跳转至第三方DApp之后，我们的《SERO Flight服务协议》、《SERO Flight隐私政策》将不再适用，针对您在第三方DApp上对您个人信息的控制权问题，我们建议您在使用第三方DApp之前详细阅读并了解其隐私规则和有关用户服务协议等内容。</p>
                    <p>3.7 您有权要求我们更新、更改、删除您的有关信息。</p>
                    <p>3.8 您知悉我们可以根据本政策1.2款的要求收集您的信息而无需获得您的授权同意。</p>
                    <p>3.9 根据适用法律，您有权反对或要求限制对您个人数据的处理，并要求您本人数据的访问、校正、删除和可携带权。</p>
                    <p>在对您的信息的使用是基于您的同意的情况下，您有权在任何时候撤回该同意，但同意的撤回不影响撤回前基于同意进行的数据处理的合法性。</p>
                    <p>您可以通过【 帮助中心 】向我们提交您的要求。</p>
                    <p>如果您发现您的信息发生变化或不准确，请将这些变化通知我们以便我们的记录可以被更新或更正。如果您认为我们对您个人数据的处理违反了适用法律，您可以向监管机构投诉。</p>
                    <p>我们对您个人数据的保留时间视向您提供服务或产品的需要而定，或根据适用法律如税法和会计法的要求或许可确定。</p>
                    <p>4. <strong>我们可能分享或传输您的信息</strong></p>
                    <p>4.1为了优化我们的产品，给您提供更优质的服务，我们将与为本隐私政策规定之目的而为我们服务的供应商或代理商分享个人数据。例如，我们聘请来提供数据分析服务的公司可能需要采集和访问个人数据以进行数据统计和分析。在这种情况下，这些公司 必须遵守我们的数据隐私和安全要求。</p>
                    <p>4.2未经您事先同意，Matter 不会将您的个人信息向任何第三方共享或转让，但以下情况除外：</p>
                    <p>（1） 事先获得您明确的同意或授权；</p>
                    <p>（2） 所收集的个人信息是您自行向社会公众公开的；</p>
                    <p>（3） 所收集的个人信息系从合法公开披露的信息中收集，如合法的新闻报道，政府信息公开等渠道；</p>
                    <p>（4） 与Matter 的关联方共享，我们只会共享必要的用户信息，且受本隐私条款中所声明的目的的约束；</p>
                    <p>（5） 根据适用的法律法规、法律程序的要求、行政机关或司法机关的要求进行提供；</p>
                    <p>（6） 在涉及合并、收购时，如涉及到个人信息转让，Matter 将要求个人信息接收方继续接受本政策的约束。</p>
                    <p>4.3我们的业务可能需要我们转移您的个人数据至欧洲经济区以外的国家，这些国家可能包括中国或新加坡。我们会采取适当的措施以确保您个人数据的接收者履行保密义务，并确保如标准合同条款等措施的执行。您可以通过联系我们的帮助中心获得这些条款。</p>
                    <p>5. <strong>我们如何保护您的信息</strong></p>
                    <p>5.1 如Matter 停止运营，Matter 将及时停止继续收集您个人信息的活动，将停止运营的通知公告在SERO Flight上，并对所持有的您的个人信息在合理期限内进行删除或匿名化处理。</p>
                    <p>5.2 为了保护您的个人信息，Matter 将采取数据安全技术措施，提升内部合规水平，增加内部员工信息安全培训，并对相关数据设置安全访问权限等方式安全保护您的隐私信息。</p>
                    <p>5.3 我们将在SERO Flight“帮助中心”版块更新钱包使用及信息保护的资料，供您参考。</p>
                    <p>6. <strong>对未成年人的保护</strong></p>
                    <p>我们对保护未满18周岁的未成年人做出如下特别约定：</p>
                    <p>6.1 未成年人应当在监护人指导下使用Matter 相关服务。</p>
                    <p>6.2我们建议未成年人的父母和监护人应当在阅读本政策、《SERO Flight服务协议》及我们的其他有关规则的前提下，指导未成年人使用SERO Flight。</p>
                    <p>6.3 SERO Flight将根据国家相关法律法规的规定保护未成年人的个人信息的保密性及安全性。</p>
                    <p>7. <strong>免责声明</strong></p>
                    <p>7.1 请您注意，您通过SERO Flight接入第三方DApp后，将适用该第三方DApp发布的隐私政策。该第三方DApp对您个人信息的收集和使用不为Matter 所控制，也不受本政策的约束。Matter 无法保证第三方DApp一定会按照Matter 的要求采取个人信息保护措施。</p>
                    <p>7.2 您应审慎选择和使用第三方DApp，并妥善保护好您的个人信息，Matter 对其他第三方DApp的隐私保护不负任何责任。</p>
                    <p>7.3 Matter 将在现有技术水平条件下尽可能采取合理的安全措施来保护您的个人信息，以避免信息的泄露、篡改或者毁损。Matter 系利用无线方式传输数据，因此，Matter 无法确保通过无线网络传输数据的隐私性和安全性。</p>
                    <p>8. <strong>法律适用及争议解决</strong></p>
                    <p>8.1 本协议及其修订版之效力、解释、变更、执行与争议解决均适用大不列颠及北爱尔兰联合王国法律，如无相关法律规定，则应当适用国际商业惯例和（或）行业惯例。</p>
                    <p>8.2 若您和Matter之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，任何一方可提交Matter所在地有管辖权的法院管辖。</p>
                    <p>9. <strong>其他</strong></p>
                    <p>9.1 您需全面了解并遵守您所在司法辖区与使用Matter 服务所有相关法律、法规及规则。</p>
                    <p>9.2 您在使用Matter 服务过程中，如遇到任何有关个人信息使用的问题，您可以通过在SERO Flight提交反馈等方式联系我们。</p>
                    <p>9.3 您可以在SERO Flight中查看本政策及Matter 其他服务规则。我们鼓励您在每次访问SERO Flight时都查阅Matter 的服务协议及隐私政策。</p>
                    <p>9.4 本政策的任何译文版本仅为方便用户而提供，无意对本政策的条款进行修改。如果本政策的中文版本与非中文版本之间存在冲突，应以中文版本为准。</p>
                    <p>9.5 本协议自2018年5月25日起适用。</p>
                    <p><strong>本政策未尽事宜，您需遵守Matter 不时更新的公告及相关规则。</strong></p>
                    <p>Matter Global Inc.</p>

                </div>

                <div className="common" id="en" style={{display:_cc.getStorage('language') === 'en_US'?'block':'none'}}>
                    <h2 style={{textAlign:'center'}}>User Protocol</h2>
                    <p>Matter Global Inc. (" Matter "or" us ") is a company incorporated under Cayman laws. The SERO Flight wallet user agreement (hereinafter referred to as the "agreement") is made and entered into by Matter Global inc. and the user (hereinafter referred to as "you" or "user"), and the agreement is legally binding between you and Matter.</p>
                    <p>Before you use the services provided by us, please carefully read this agreement. In particular, the terms of "disclaimer and limitation of liability" provided in this agreement will be shown in bold to ensure that you fully understand the terms of this agreement and take the risks into consideration.</p>
                    <p>1. Confirmation and acceptance of this agreement</p>
                    <p>1.1 you understand that this agreement and the related agreement are applicable to applications and services independently developed and owned by SERO Flight team, including but not limited to decentralized applications (" DApp ") (excluding third-party developed DApp) and centralized applications (" App ") (excluding third-party developed DApp).</p>
                    <p>1.2 by downloading the SERO Flight software and creating or importing an account, you are deemed to have fully read and accepted all the terms of this agreement. This agreement shall become effective immediately and shall be binding upon both parties.</p>
                    <p>1.3 this agreement may be updated from time to time by Matter. The modified agreement shall take effect automatically upon its publication without further notice. If you do not accept the modified terms, please stop using SERO Flight immediately after the Matter announcement. Your continued use of SERO Flight will be considered acceptance of the modified terms.</p>
                    <p>1.4 before using our service, please confirm that you have reached the age of 18.</p>
                    <p></p>
                    <p>2. Definition of nouns</p>
                    <p>2.1 SERO Flight: Matter Global Inc., a software platform/website/mobile app client developed, operated, managed and legally owned by Matter Global Inc., provides blockchain asset local wallet, managed account and other services. The domain name is wallet. Through the software, Matter Global inc. provides users with: a local, online management service for blockchain digital assets.</p>
                    <p>2.2 users:</p>
                    <p>(1) the user must be a natural person with full capacity for civil conduct;</p>
                    <p>(2) if you use SERO Flight service for minors under the age of 18, you need to use SERO Flight under the guidance of your parents or guardians. SERO Flight reserves the right to hold you and your guardians responsible for any and all consequences arising from the use of SERO Flight by persons without civil capacity or persons with limited civil capacity who trade in excess of their civil rights or capacity.</p>
                    <p>2.3 blockchain: it is a chain data structure composed by connecting data blocks sequentially and ensuring that they cannot be tampered with or falsified in a cryptographic way. It USES a piece of chain to verify the data structure and data storage and use of distributed nodes as well as consensus algorithm to generate and update the data, the use of cryptography way to ensure the security of data transmission and access, use of intelligent automation scripts code contracts to programming and operation data, is a kind of brand-new based architecture with distributed computing paradigm.</p>
                    <p>2.4 blockchain assets or digital assets: the digital assets in the cryptographic accounts existing in the blockchain data, which are regarded as the digital assets of the legal owners of the accounts, including but not limited to super zero COINS (SERO) and other digital currencies, notes and other types of digital assets issued based on SERO.</p>
                    <p>2.5 wallet password: refers to the password prompted by the software operation interface during the creation of SERO Flight wallet, which is used to encrypt and protect the private key. As a decentralized application, wallet passwords are not stored on your mobile device or Matter's server, and if lost, you need to reset the new password with a clear private key or mnemonic.</p>
                    <p>2.6 mnemonic words: it conforms to the industry standard of blockchain BIP39 and consists of 12 ordered words generated by random algorithm. Is an easy-to-record representation of the private key, convenient for users to backup custody. The process of creating mnemonic words belongs to the local behavior of the user side, which can be operated when the network is disconnected. It has nothing to do with the server side. Therefore, SERO Flight does not have mnemonic words, so it cannot overstep the user's management of wallet assets, nor can it retrieve mnemonic words for the user. SERO Flight follows the BIP32, BIP39, and BIP44 standards, and any other wallet that follows the standards can use the same mnemonic to restore and manage your blockchain assets.</p>
                    <p>2.7 miner's fee: the transaction confirmation fee paid by the user to the miner node of the blockchain at the time of the asset transfer on the blockchain, which is collected by the miner.</p>
                    <p>Personal information: 2.8 records in electronic or any other way to separate or combined with other information to identify the user personal identity of all kinds of information, including but not limited to natural person's name, date of birth, id number, personal biometric information, address, telephone number, bank card number, E-mail address, wallet, mobile devices, information, operation records, trading records, etc., but does not include a user's password wallet, the private key, mnemonic word.</p>
                    <p>3. Service contents</p>
                    <p>3.1 create or import wallets: for digital assets supported by SERO Flight, you can use SERO Flight to generate a new wallet or import a previously generated wallet via mnemonic.</p>
                    <p>3.2 transfer and collection: you can use the transfer and collection function of SERO Flight to manage digital assets, that is, use private keys to conduct electronic signature and modify the ledger of relevant blockchain. Transfer refers to that the payer USES the recipient's blockchain address to conduct transfer operation. The actual transfer and receipt of money occur in the relevant blockchain system (not SERO Flight).</p>
                    <p>3.3 transaction records: we will copy all or part of your transaction records through the blockchain system. The transaction records shall be subject to the records of the corresponding blockchain system.</p>
                    <p>3.4 managing digital assets. You can add, store, and remove digital assets supported by SERO Flight using SERO Flight.</p>
                    <p>3.5 browse DApp: users can skip to DApp and use the services provided by DApp (including Matter's own DApp and third-party DApp) through the link on SERO Flight. Browse DApp. With a link on SERO Flight, users can jump to DApp and use the services provided by the DApp (including Matter's own DApp and third-party DApp).</p>
                    <p>3.6 suspension or cancellation. You are aware of the "irrevocable" nature of transactions based on the blockchain system, and we cannot suspend or revoke the issuing of currency and other operations for you.</p>
                    <p>3.7 other services which Matter deems necessary.</p>
                    <p>4. Privacy policy</p>
                    <p>Matter is committed to protecting the privacy of its users. Please refer to the SERO Flight privacy policy published by Matter and updated from time to time.</p>
                    <p>5. Risk warning</p>
                    <p>5.1 you understand and know that, as the laws, regulations and policies in the field of digital assets are not yet sound, the digital assets in this field may generate significant risks such as undeliverable, technical instability and loss. And the price fluctuation range of digital assets is much higher than that of other financial assets. We caution that you should rationally choose to hold or dispose of any kind of digital assets according to your own financial situation and risk preference.</p>
                    <p>5.2 when using the SERO Flight service, SERO Flight does not guarantee the smooth completion of the transaction if you or your counterparty fail to comply with this agreement or instructions on the relevant website or operation tips and rules on the transaction and payment page, and SERO Flight is not liable for damages. If the foregoing happens and the payment has been entered into your or your counterparty's SERO Flight wallet or a third party wallet, you understand the "irreversible" nature of blockchain operation and the "irrevocable" nature of relevant transactions, and you and your counterparty shall bear the corresponding risks and consequences.</p>
                    <p>5.3 when you use the third-party DApp service integrated with SERO Flight or make a transaction, for your benefit, Matter recommends that you carefully read this agreement and SERO Flight tips, understand the transaction object and product information, and carefully assess the risks before taking action. All transactions you make with third party DApp are your personal actions, and a binding contractual relationship is established between you and your counterpart, not related to SERO Flight. SERO Flight shall not be liable for any risks, liabilities, losses or expenses arising out of your trading activities.</p>
                    <p>5.4 during the transaction, you shall determine whether the other party is a person with full civil capacity and decide whether to transact with the other party or transfer money to the other party at your own risk.</p>
                    <p>5.5 in the process of transfer, if there are "transaction failure", "package timeout" and other similar abnormal information prompt, you should confirm again through the official channel of the relevant blockchain system or other blockchain query tools to avoid repeated transfer; Otherwise, all losses and expenses arising therefrom shall be borne by you.</p>
                    <p>5.6 you understand that after you create or import your wallet on SERO Flight, your private key, mnemonic, and other information is stored only on the current mobile device and not on the SERO Flight or Matter server. You can follow SERO Flight's instructions for replacing your mobile devices with a synchronous wallet. However, if you do not save or backup the wallet password, private key, mnemonic and other information and your mobile device is lost, your digital assets will be lost and Matter will not be able to retrieve it for you. You shall bear the corresponding loss by yourself. If you export, save or backup the wallet password, private key, mnemonic and other information, or the device or server that saves or backs up the above information is attacked or controlled by hackers, your digital assets will be lost and Matter will not be able to retrieve it for you. You shall bear the corresponding losses by yourself.</p>
                    <p>5.7 we recommend that you make a safe backup of your wallet password, private key, mnemonic and other information when creating or importing the wallet. We draw your attention, please do not use the following backup: screenshot, mail, notepad, SMS, WeChat, QQ and other electronic backup. We recommend that you copy mnemonic information in a paper notepad, and you can also store the electronic data in the password manager.</p>
                    <p>5.8 we recommend that you use SERO Flight in a secure network environment to ensure that your mobile device is not jailbroken or Root to avoid potential security concerns.</p>
                    <p>5.9 during the use of our services, please be aware of fraud by non-sero Flight officials. We encourage you to inform us as soon as such behavior is discovered.</p>
                    <p>6. Change, termination and termination of the service</p>
                    <p>6.1 you agree that Matter may provide some service functions for the time being or suspend some service functions or open new service functions in the future to ensure the independent business operation. As long as you continue to use the services provided by Matter, you still agree to this agreement or the terms and conditions hereunder as amended.</p>
                    <p>6.2 subject to your understanding that:</p>
                    <p>(1) interruption of business due to technical reasons such as maintenance, upgrade, failure and communication interruption of equipment and blockchain system;</p>
                    <p>(2) due to force majeure factors such as typhoon, earthquake, tsunami, flood, power failure, war or terrorist attack, virus, Trojan horse, hacker attack, system instability or government behavior, etc., Matter system is unable to provide services or Matter reasonably believes that there will be a greater risk to continue to provide services;</p>
                    <p>(3) other circumstances beyond the control of Matter or reasonably foreseeable.</p>
                    <p>6.3 Matter may unilaterally suspend or terminate some or all of your use of SERO Flight when:</p>
                    <p>(1) death of the user;</p>
                    <p>(2) stealing others' wallet information or mobile devices;</p>
                    <p>(3) the personal information you provide is not true;</p>
                    <p>(4) reject the forced update operation initiated by Matter to improve the SERO Flight function;</p>
                    <p>(5) use SERO Flight for illegal or criminal activities;</p>
                    <p>(6) hindering the normal use of other users;</p>
                    <p>(7) staff or management personnel pretending to be Matter;</p>
                    <p>(8) attack, invade, alter or in any other way threaten the normal operation of Matter computer system;</p>
                    <p>(9) use SERO Flight to promote spam;</p>
                    <p>(10) spread rumors and damage the goodwill of Matter and SERO Flight;</p>
                    <p>(11) illegal ACTS, other ACTS in violation of this agreement, and cases where Matter reasonably believes that the functions shall be suspended.</p>
                    <p>6.4 when the service relationship between you and Matter is changed, interrupted or terminated, you shall still have the right to export your wallet and other information within a reasonable time.</p>
                    <p>7. Your commitment to use the Matter service legally</p>
                    <p>7.1 you shall abide by the laws and regulations of the country or region where you live and shall not use SERO Flight for any illegal purpose or use Matter services in any illegal manner.</p>
                    <p>7.2 you shall not use SERO Flight to commit any illegal or criminal ACTS, including but not limited to:</p>
                    <p>(1) endanger national security, divulge state secrets, subvert state power or undermine national unity;</p>
                    <p>(2) engage in any illegal and criminal ACTS, including but not limited to money laundering, illegal fund raising, etc.;</p>
                    <p>(3) use any automated program, software, engine, web crawler, web page analysis tool, data mining tool or similar tool to access Matter service, collect or process the content provided by Matter service, or intervene or attempt to intervene any user or any other way to access Matter service;</p>
                    <p>(4) provide gambling information or in any way induce others to participate in gambling;</p>
                    <p>(5) hack into SERO Flight wallet of others to steal digital assets;</p>
                    <p>(6) conducting transactions that are inconsistent with the transactions claimed by the other party, or that are untrue;</p>
                    <p>(7) engage in any ACTS that infringe or may infringe the SERO Flight service system and data;</p>
                    <p>(8) other illegal ACTS and ACTS which Matter may reasonably consider inappropriate.</p>
                    <p>7.3 you understand and agree that, as a result of your violation of the relevant laws (including but not limited to customs and taxation regulations) or the provisions of this agreement, the Matter suffers any loss, claim by any third party or any administrative departments of punishment, you should make compensation for the Matter, including attorney's fees that is paid for the claim, all reasonable costs.</p>
                    <p>7.4 you agree to pay the Matter service fee (if any) on time, or Matter reserves the right to suspend or discontinue the services provided to you.</p>
                    <p>8. Disclaimer and limitation of liability</p>
                    <p>8.1 Matter is solely responsible for the obligations set forth herein.</p>
                    <p>8.2 you understand and agree that, to the extent permitted by law, Matter shall only provide services on the basis of existing technology and conditions. Matter will not be responsible for the failure of SERO Flight to provide services for the following reasons:</p>
                    <p>(1) SERO Flight system downtime maintenance or upgrade;</p>
                    <p>(2) force majeure such as typhoon, earthquake, flood, lightning or terrorist attack;</p>
                    <p>(3) failure of your mobile device's hardware and software, communication lines and power supply lines;</p>
                    <p>(4) you use the Matter service improperly or without Matter's authorization or approval;</p>
                    <p>(5) due to viruses, trojans, malicious program attacks, network congestion, system instability, system or equipment failure, communication failure, power failure, banking and other reasons or government actions;</p>
                    <p>(6) any other reason not caused by Matter.</p>
                    <p>8.3 Matter shall not be responsible for:</p>
                    <p>(1) loss of digital assets caused by loss of mobile device, deletion and failure to back up SERO Flight, deletion and failure to back up wallet, wallet theft or forgetting wallet password, private key and mnemonic;</p>
                    <p>(2) loss of digital assets caused by users disclosing their wallet passwords, private keys, mnemonic words, or borrowing, transferring or authorizing others to use their mobile devices or SERO Flight wallets, or not downloading SERO Flight applications or using SERO Flight applications in other insecure ways through Matter official channels;</p>
                    <p>(3) the loss of digital assets caused by the user's wrong operation (including but not limited to the problem that you input the wrong transfer address and you choose the transfer node server by yourself);</p>
                    <p>(4) loss of digital assets due to misoperation by users who do not understand the nature of blockchain technology;</p>
                    <p>(5) due to time lag, instability of the blockchain system and other reasons, the transaction records of Matter copy users on the blockchain are biased;</p>
                    <p>(6) risks and consequences arising from users' operations on third-party DApp.</p>
                    <p>8.4 you understand that SERO Flight is only a tool for your digital asset management. Matter does not control the quality, safety or legality of the products and services provided by third party DApp, the authenticity or accuracy of the information, or the ability of the other party to perform its obligations under the agreement entered into with you. All transactions you make with third party DApp are your personal actions, and a binding contractual relationship is established between you and your counterpart, not related to SERO Flight. Matter reminds you to determine the authenticity, legality and validity of the login DApp and related information through your own careful judgment. Any risks arising from your dealings with any third party shall also be at your own risk.</p>
                    <p>8.5 Matter may provide services to you and your counterparties at the same time, and you agree to expressly waive any actual or potential conflict of interest that Matter may have and not to assert that Matter has a legal defect in the provision of the services, nor to add to Matter's liability or duty of care.</p>
                    <p>8.6 Matter does not provide warranties in the following forms:</p>
                    <p>(1) Matter service will meet all your needs;</p>
                    <p>(2) any technology, products, services and information you acquire through Matter services will meet your expectations;</p>
                    <p>(3) guarantee the timeliness, accuracy, integrity and reliability of the transaction information of digital asset market captured by third party exchanges;</p>
                    <p>(4) the parties to your SERO Flight transaction will promptly fulfill their obligations under the transaction agreement with you.</p>
                    <p>8.7 under any circumstances, the total liability for breach of this agreement shall not exceed 1) 0.1 ether COINS; Or 2) RMB 500, whichever is higher.</p>
                    <p>8.8 you understand that SERO Flight serves only as a tool for users to manage their digital assets and display transaction information, and Matter does not provide services such as legal, tax or investment advice. You should seek advice from legal, tax and investment professionals on your own, and you shall not be responsible for any investment loss or data loss suffered by you during the use of our services.</p>
                    <p>8.9 you understand that we may, from time to time, change our user access criteria to limit the scope and manner in which we provide services to a particular group in accordance with the requirements of relevant local policies and regulations.</p>
                    <p>9. Intellectual property protection</p>
                    <p>9.1 applications developed and owned by SERO Flight system Matter with intellectual property rights. Any content displayed in SERO Flight (including but not limited to this agreement, notices, articles, video, audio, pictures, files, information, materials, trademarks or logos) is the intellectual property of Matter or a third party. Users can only use the SERO Flight application and its content for the purpose of holding and managing digital assets. Without the prior written consent of Matter or a third party right holder, no person shall use, modify, reverse compile, copy, publicly disseminate, change, distribute, distribute or publicly publish the above applications and contents.</p>
                    <p>10. Term of the agreement</p>
                    <p>10.1 this agreement between you and us is an open-ended agreement. If you do the following, we have the right to terminate the contract at any time and take effect immediately:</p>
                    <p>(1) you have violated or violated any provision of this agreement;</p>
                    <p>(2) we believe that you abuse the application or service.</p>
                    <p>11. Governing law and dispute resolution</p>
                    <p>11.1 the validity, interpretation, variation, enforcement and dispute resolution of this agreement and its amendments shall be governed by the laws of the United Kingdom of Great Britain and Northern Ireland.</p>
                    <p>11.2 any dispute or dispute between you and Matter shall first be settled through friendly negotiation. If no agreement can be reached through negotiation, either party may refer the Matter to the competent court in the place where Matter is located.</p>
                    <p>12. Other</p>
                    <p>12.1 you shall fully understand and comply with all relevant laws, regulations and rules of your jurisdiction and use of Matter services.</p>
                    <p>12.2 if you encounter any problems during the use of the Matter service, you can contact us by submitting feedback during SERO Flight.</p>
                    <p>12.3 you can view the protocol in SERO Flight. Matter encourages you to consult Matter's service agreement every time you visit SERO Flight.</p>
                    <p>12.4 this agreement shall apply from March 22, 2018.</p>
                    <p>12.5 any translated version of this agreement is provided only for the convenience of users and is not intended to modify the terms of this policy. In the event of a conflict between the Chinese and non-chinese versions of this policy, the Chinese version shall prevail.</p>
                    <p>For matters not covered in this agreement, you shall abide by the notices and relevant rules updated by Matter from time to time.</p>
                    <p></p>
                    <p>                                                                          Matter Global Inc.</p>
                    <h2>Privacy Policy</h2>
                    <p>Matter Global Inc. (" Matter "or" us ") respects and protects the privacy of users (" you "or" user ") and when you use SERO Flight Wallet, Matter will collect and use your personal information in accordance with this privacy policy (" this policy ").</p>
                    <p>Matter recommends that you carefully read and understand the entire content of this policy before using this product (hereinafter referred to as "SERO Flight Wallet"). Important information regarding disclaimers and other terms will be in bold. The key words defined in this policy are consistent with the Matter SERO Flight user service agreement.</p>
                    <p>If you do not accept the modified terms, please stop using SERO Flight immediately. Your continued use of SERO Flight will be considered as acceptance of the modified policy. The revised policy takes effect automatically as soon as it is announced on SERO Flight.</p>
                    <p>You are aware that this policy and other relevant provisions apply to DApp or App owned by SERO Flight and SERO Flight Matter.</p>
                    <p>1. What information do we collect about you</p>
                    <p>Please note that we collect the following information for your SERO Flight service, and we take your privacy very seriously. When we collect your information, we will strictly abide by the principle of "legal, legitimate and necessary". You are aware that your service experience during SERO Flight may be affected if you do not provide the information required for our service.</p>
                    <p>1.1 you authorize us to collect and keep your personal information as follows:</p>
                    <p>• identification information, including but not limited to your name, identification, contact address, phone number, biometric information.</p>
                    <p>• platform operation information, including but not limited to your IP address, device model, device identifier, and operating system version information.</p>
                    <p>• payment information, including but not limited to your payment time, payment amount, payment tool, account and other information.</p>
                    <p>• personal credit information, including but not limited to any information about your credit status, credit score and credit report.</p>
                    <p>• we collect data based on your interactions with us and your choices, including your privacy Settings and the products and features you use. We collect data may include the SDK/API/JS code version, browser, Internet service providers (isps), IP address, platform, timestamp, identifier, version of the application, the application distribution channels, independent device identifier, iOS advertising identifier (IDFA), android advertisers identifier, nic (MAC) address, international mobile equipment identification number (IMEI), equipment type, terminal manufacturers, terminal equipment operating system version, session start/stop time, local language, time zone and network status (WiFi, etc.), hard disk, CPU, and battery usage, etc.</p>
                    <p>• other personal information collected according to the needs of our specific products and services, including but not limited to your opinions and Suggestions on us and our products or services, mobile applications you have used or frequently used, usage scenarios and habits, etc.</p>
                    <p>1.2 it is a basic policy of the company to protect the privacy of users. SERO Flight will not share or transfer your personal information to any third party without your prior consent, except for the following situations:</p>
                    <p>(1) obtain your express consent or authorization in advance;</p>
                    <p>(2) the personal information collected is disclosed to the public by you;</p>
                    <p>(3) the collected personal information is collected from the legally disclosed information, such as legal news reports, government information disclosure and other channels;</p>
                    <p>(4) sharing with SERO Flight's affiliates. We only share necessary user information and are bound by the purposes stated in this privacy policy;</p>
                    <p>(5) according to the applicable laws and regulations of the host country, requirements of legal procedures and requirements of administrative or judicial organs;</p>
                    <p>(6) when it comes to mergers and acquisitions, SERO Flight will require the recipient of personal information to continue to be bound by this policy if it involves the transfer of personal information;</p>
                    <p>(7) we have reason to believe that you have violated one of the terms of this agreement and caused damage to SERO Flight or a third party.</p>
                    <p>1.3 the way we collect information is as follows:</p>
                    <p>(1) you provide us with information. For example, you fill in your name, cell phone number or bank card number on the "personal center" page, or you provide an email address when you respond to questions, or you provide additional information to us when you use our specific services.</p>
                    <p>(2) we obtain information during your use of SERO Flight, including your mobile device information and your operation record of SERO Flight;</p>
                    <p>(3) we copy all or part of your transaction records through the blockchain system. However, the transaction record shall be subject to the record of the blockchain system.</p>
                    <p>How do we use your information</p>
                    <p>2.1 we use data to continuously improve our products, including adding new functions or capacity. For example, we can verify the relationship between you and your wallet through the unique fingerprint of your mobile device.</p>
                    <p>2.2 we will promptly send you important notices, such as software updates, service agreements and changes to the terms of this policy.</p>
                    <p>2.3 in the "system Settings" of SERO Flight, we provide you with multiple login options, making it convenient and more secure for you to manage your digital assets.</p>
                    <p>2.4 we process your feedback to us by collecting your public wallet address and mobile device information provided.</p>
                    <p>2.5 we will collect your personal information for Matter internal audit, data analysis and research with a view to continuously improving our service level.</p>
                    <p>2.6 in accordance with the SERO Flight service agreement and Matter and other relevant provisions, Matter will use user information to manage and process user behavior.</p>
                    <p>2.7 requirements of laws and regulations and cooperation with regulatory authorities.</p>
                    <p>2.8 we have described the purpose of processing personal data above. The legal basis for us to process personal data includes: to perform the contract with you (for example, to provide you with the service you requested, to identify and authenticate you so that you can use the website); In order to comply with legal requirements (e.g., to comply with applicable accounting rules, to comply with enforcement requirements for mandatory disclosure); To protect our legitimate interests (for example, to manage our relationship with you, to ensure the security of our services, to communicate with you about our products and services); And based on the consent of our customers (e.g., placing cookies to share your information with third parties for advertising purposes).</p>
                    <p>How do you control your information</p>
                    <p>You have the following autonomous control over your personal information in SERO Flight:</p>
                    <p>3.1 you can import your other wallets into SERO Flight or your wallet in SERO Flight into another digital asset management wallet by synchronizing your wallet. SERO Flight shows you the information about the imported wallet.</p>
                    <p>3.2 you know that you can modify your digital asset type, transfer money and receive money and other activities through the "assets" section.</p>
                    <p>3.3 you know that in the "my" section of SERO Flight, you can freely choose to do the following:</p>
                    <p>(1) in the "personal center", you do not need to provide your name, mobile phone number, bank card and other information, but when you use a specific service, you need to provide the above information;</p>
                    <p>(2) in the "submit feedback", you can propose your Suggestions on the problems and improvement of SERO Flight to us at any time. We will be very glad to communicate with you and actively improve our service.</p>
                    <p>3.4 you know that when we collect information from you for specific purposes, we will give you notice in advance, and you have the right to choose to refuse. However, you know that when you choose to refuse to provide the information, you will give up the relevant services of SERO Flight.</p>
                    <p>3.5 you know that you and we have no control over the disclosure of your transaction records, because your transaction records are open and transparent in the whole blockchain system based on the open source nature of the blockchain trading system.</p>
                    <p>3.6 do you know when you use SERO Flight function after the jump to the third party DApp, our "SERO Flight service agreement", "SERO Flight privacy policy will no longer applicable, for your personal information about you on the third party DApp control problems, we recommend that you read before using third-party DApp and to understand their privacy rules and the user service agreement, etc.</p>
                    <p>3.7 you have the right to request us to update, change or delete your relevant information.</p>
                    <p>3.8 you acknowledge that we may collect your information in accordance with the requirements of section 1.2 of this policy without obtaining your authorization and consent.</p>
                    <p>3.9 under applicable law, you have the right to object to or request to limit the processing of your personal data and to request access, correction, deletion and portability of your own data.</p>
                    <p>In the case that the use of your information is based on your consent, you have the right to withdraw the consent at any time, but the withdrawal of consent does not affect the legality of the data processing based on consent before withdrawal.</p>
                    <p>You can submit your request to us through the help center.</p>
                    <p>If you find that your information has changed or is inaccurate, please notify us of these changes so that our records can be updated or corrected. If you believe that our handling of your personal data violates applicable laws, you may lodge a complaint with the regulator.</p>
                    <p>Our retention of your personal data may be subject to the need to provide you with services or products, or as required or permitted by applicable laws such as tax law and accounting law.</p>
                    <p>4. We may share or transmit your information</p>
                    <p>4.1 in order to optimize our products and provide you with better services, we will share personal data with the suppliers or agents who serve us for the purpose of this privacy policy. For example, companies we hire to provide data analysis services may need to collect and access personal data for data statistics and analysis. In this case, these companies must comply with our data privacy and security requirements.</p>
                    <p>4.2 without your prior consent, Matter will not share or transfer your personal information to any third party, except as follows:</p>
                    <p>(1) obtain your express consent or authorization in advance;</p>
                    <p>(2) the personal information collected is disclosed to the public by you;</p>
                    <p>(3) the collected personal information is collected from the legally disclosed information, such as legal news reports, government information disclosure and other channels;</p>
                    <p>(4) sharing with related parties of Matter. We will only share necessary user information and are bound by the purposes stated in this privacy policy;</p>
                    <p>(5) according to applicable laws and regulations, requirements of legal procedures, and requirements of administrative or judicial organs;</p>
                    <p>(6) in case of any merger or acquisition involving personal information transfer, Matter will require the recipient of personal information to continue to be bound by this policy.</p>
                    <p>4.3 our business may require us to transfer your personal data to countries outside the eea, which may include China or Singapore. We will take appropriate measures to ensure that the recipient of your personal data complies with confidentiality obligations and that such measures as standard contract terms are enforced. You can obtain these terms by contacting our help center.</p>
                    <p>How do we protect your information</p>
                    <p>5.1 if Matter ceases to operate, Matter will cease to collect your personal information in a timely manner, notify SERO Flight of the cease to operate notice, and delete or anonymize the personal information held by you within a reasonable period of time.</p>
                    <p>5.2 in order to protect your personal information, Matter will take data security technical measures, improve internal compliance level, increase internal staff information security training, and set security access rights for relevant data to protect your privacy information.</p>
                    <p>5.3 we will update the data of wallet use and information protection in the "help center" section of SERO Flight for your reference.</p>
                    <p>6. Protection of minors</p>
                    <p>We hereby make the following special provisions for the protection of minors under the age of 18:</p>
                    <p>6.1 minors shall use Matter related services under the guidance of their guardians.</p>
                    <p>6.2 we recommend that parents and guardians of minors should guide minors to use SERO Flight under the premise of reading this policy, SERO Flight service agreement and our other relevant rules.</p>
                    <p>6.3 SERO Flight will protect the confidentiality and security of minors' personal information in accordance with relevant national laws and regulations.</p>
                    <p>7. Disclaimer</p>
                    <p>7.1 please note that when you access the third-party DApp through SERO Flight, the privacy policy published by the third-party DApp will apply. The collection and use of your personal information by this third-party DApp is not controlled by Matter and is not subject to this policy. Matter cannot guarantee that DApp will take measures to protect personal information as Matter requires.</p>
                    <p>7.2 you should carefully select and use third-party dapps and properly protect your personal information. Matter shall not be responsible for the privacy protection of other third-party dapps.</p>
                    <p>7.3 Matter will take reasonable security measures to protect your personal information to avoid information leakage, tampering or damage under the existing technical conditions. Because Matter USES wireless data transmission, it is not possible to guarantee the privacy and security of data transmitted over a wireless network.</p>
                    <p>8. Governing law and dispute resolution</p>
                    <p>8.1 the validity, interpretation, variation, enforcement and dispute resolution of this agreement and its amendments shall be governed by the laws of the United Kingdom of Great Britain and Northern Ireland.</p>
                    <p>8.2 any dispute or dispute between you and Matter shall first be settled through friendly negotiation. If no agreement can be reached through negotiation, either party may refer the Matter to the competent court in the place where Matter is located.</p>
                    <p>9. Other</p>
                    <p>9.1 you shall fully understand and comply with all relevant laws, regulations and rules of your jurisdiction and use of Matter services.</p>
                    <p>9.2 during your use of the Matter service, if you encounter any questions regarding your use of personal information, you can contact us by submitting feedback during SERO Flight.</p>
                    <p>9.3 you can view this policy and Matter other service rules in SERO Flight. We encourage you to check Matter's service agreement and privacy policy every time you visit SERO Flight.</p>
                    <p>9.4 any translated version of this policy is provided only for the convenience of users and is not intended to modify the terms of this policy. In the event of a conflict between the Chinese and non-chinese versions of this policy, the Chinese version shall prevail.</p>
                    <p>9.5 this agreement shall apply from May 25, 2018.</p>
                    <p>For matters not covered in this policy, you shall abide by the notices and relevant rules updated by Matter from time to time.</p>
                    <p>Matter Global Inc.</p>

                </div>


                <WhiteSpace/>
            </div>
        )
    }
}

export default Contract;
