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

        document.title = 'SERO launches super user recruitment program<';
    }

    render() {
        let that = this;
        return (
            <div>
                <WhiteSpace/>
                <div className="common">

                    <h2 style={{textAlign:'center'}}>SERO launches super user recruitment program</h2>

                    <p>SERO, the super privacy project, will officially launch the recruitment plan for “101 Super Users Worldwide” in 2019.4.8. In the future, 101 super users will play an important role in SERO's global privacy ecology.</p>
                    <p>The first stage: Super User -- Enlightenment, aiming to select 101 global opinion leaders who have made outstanding contributions to the promotion of SERO global consensus. Candidates can score points in the following two ways:</p>
                    <p>1. The Flight landing wallets, entrance into share, get the invite code and generate a Shared posters, poster will share to the community (e.g., WeChat friends circle), new users through the qr code poster pay close attention to the public, and code the number of the service into the community, after completion of customer service to send the questionnaire answer into super user audition community ( Discord) the invitation and the inviter will gain new users will receive 10 sero / person invited;</p>
                    <p>2. Recommend new users (invitation code) to download SERO's globally released Flight wallet through the sharing portal in the Flight wallet;</p>
                    <p>Thanks to some of SERO's early mining partners who have contributed more than Million</p>
                    <p>SERO COINS to the global promotion of "super user -- enlightenment".</p>
                    <p>Participants of this event will share the share of all the above award pools, and the selected members of "super user -- enlightenment 101" will not only receive the global limited edition of 101 customized t-shirts, but also receive large SERO COINS and play an important role in the construction of SERO global privacy ecology in the future.</p>
                    <p>Please refer to the official poster for the specific rules.</p>
                    <p></p>
                    <p></p>
                    <p>Super privacy project SERO 101 super users, is the global backbone of the SERO community, including the SERO global consensus promotion made great contributions to the network development opinion leader (KYC), ecological construction participants and important members of the miners' organization.</p>
                    <p>The 101 super user program aims to select a total of 101 members, and users from all over the world can participate in the whole series of activities anonymously and equally. Superuser 101 is an open community identity that can be waived under established rules, along with corresponding rights and obligations.</p>
                    <p>Super user 101 is planned to be implemented in five phases as the community progresses through different phases. The ones that have been disclosed and are about to be launched are:</p>
                    <p>Stage 1: super user -- enlightenment. The purpose is to select 101 global opinion leaders (KYC) who have made outstanding contributions to the promotion of SERO global consensus.</p>
                    <p>Rights and obligations of 101 superusers:</p>
                    <p>Each super user will receive a limited edition commemorative T-shirt of different stages;</p>
                    <p>Each super user will receive a 101 limited edition super user commemorative coin (issued on SERO), which is a unique identity token;</p>
                    <p>Each power user will be given priority for SERO ecosystem products (such as this Flight wallet);</p>
                    <p>Each super user will have priority in the promotion of SERO ecological products.</p>
                    <p>Each super user in the ecological construction (such as the establishment of a guild, the establishment of a mining pool, the issuance of digital currency, DAPP application development, etc.), has the opportunity to obtain the SERO official team's one-to-one technical support;</p>
                    <p>In each stage, to obtain the super user identity, the corresponding super user 101 of the activity in this stage needs to complete the task condition.</p>
                    <p>Some certified super users can be officially authorized to carry out some ecology-related businesses (such as exchanges, mining pool operations, technical services, participation in the development of the main network, and in some businesses will be certified on the official website);</p>
                    <p>Super users can join the community of super users anonymously, and they need to keep active and communicable at any time.</p>
                    <p>SERO is also considering plans to hold a global super user 101 conference in due course.</p>
                    <p></p>
                    <p>As expected! SERO Flight Wallet public beta has been officially released, the website home page and Github download, this is the world's first full privacy digital asset management Wallet, the Wallet will be able to manage all the future based on SERO public chain ecological digital assets, the first limited users will be completed after the registration of early mine owner award.</p>
                    <p>SERO, the digital currency of privacy based on zero knowledge proof, can transfer money so fast even with the highest privacy and security. Wow.</p>
                    <p>As the first version of the SERO eco-wallet, why is it called "Flight"? May need to use just know :)</p>
                    <p></p>
                    <p></p>
                    <p>All of the SERO COINS for the event came from anonymous early mine owners (yes, who doesn't want privacy?). Thank them anyway!</p>
                    <p></p>
                    <p>SERO has formally and quantum (QTUM) reached deep strategic cooperation in the field of technology, will work together in the chain of zero knowledge proof and block the privacy protection technology research, long-term cooperation, both technically and ecologically QTUM and SERO have great cooperation space, the industry generally believe that the strategic cooperation will likely have important value to the next block chain development.</p>
                    <p></p>
                    <p>SERO recently passed the world's top evaluation institutions - darling think-tank, project evaluation, and get the final score, the level of BBB the evaluation agency for the world's top 50 block chain innovation list research support, the publisher, has always been the choice evaluation project is very strict, and has been based on very strict measurements, BBB rating is also so far, the evaluation institution for dozens of project evaluation results in the highest scores!</p>


                </div>
                <WhiteSpace/>
            </div>
        )
    }
}

export default NEW2;
