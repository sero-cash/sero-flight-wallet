import React, {Component} from 'react';
import {NavBar, Icon, TabBar, Grid, Toast} from 'antd-mobile';
import {urls} from "../../common/url";
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import memberURl from "../../common/config";
import Axios from './../../service/service.js';

let Lang = new Language();
let _cc = new Common();

let ajax = new Axios();

//币币交易
const dataTrade = [
    {
        icon: 'https://s3-ap-southeast-1.amazonaws.com/sero-media/images/201905/coin-exchange.svg',
        text: '永恒金币',
        link: '/others/exchange'
    }

];

//游戏生态
const dataGame = [
    {
        icon: 'https://s3-ap-southeast-1.amazonaws.com/sero-media/images/201905/fortune.png',
        text: '欢乐财神',
        link: 'https://fortune.mycoins.online/downApp'
    },
    {
        icon: 'https://s3-ap-southeast-1.amazonaws.com/sero-media/images/201905/WechatIMG33.png',
        text: 'Evergames',
        link: 'http://129.211.98.114:3006/game/index.html?userId='

    }
];


class Discover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: _cc.getLanguage(),
            selectedTab: 'discover',
            userId: ''
        }
    }

    componentWillMount() {

        this.getUserDetail();
    }


    componentDidMount() {

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

    gridLink(dataItem) {

        if (dataItem.text === 'Evergames'){
            window.location.href = dataItem.link+this.state.userId;

        }else{
            window.location.href = dataItem.link;
        }
    }

    render() {
        return (

            <div>
                <div style={{position: 'fixed', width: '100%', top: 0, zIndex: '999'}}>
                    <NavBar
                        mode="dark"
                        leftContent="探索发现"
                        // rightContent={
                        //     <Icon type="anticon-saomiao" onClick={() => _cc.toPage(`/scan.html`)}/>
                        // }
                    >
                        {this.state.menuTitle}

                    </NavBar>

                    <div className="sub-title">币币交易</div>
                    <Grid data={dataTrade} hasLine={false} square={false} columnNum={4} className="not-square-grid"
                          onClick={(_el) => this.gridLink(_el)}/>

                    <div className="sub-title">游戏生态</div>
                    <Grid data={dataGame} hasLine={false} square={false} columnNum={4} className="not-square-grid"
                          onClick={(_el) => this.gridLink(_el)}/>

                </div>
                <div style={{position: 'fixed', width: '100%', bottom: 0}}>
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
                            icon={<Icon type="anticon-faxian"/>}
                            selectedIcon={<Icon type="anticon-faxian1"/>}
                            title={Lang.menus.tabBarDiscover[this.state.language]}
                            key={Lang.menus.tabBarDiscover[this.state.language]}
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

export default Discover;

