import React, {Component} from 'react';
import {NavBar, Icon, TabBar, Grid, Toast} from 'antd-mobile';

import Language from './../../language/language.js';
import Common from './../../common/common.js';
import memberURl from "../../common/config";
import Axios from './../../service/service.js';
import "./game.css"
import {urls} from "../../common/url";

let Lang = new Language();
let _cc = new Common();

let ajax = new Axios();

//游戏
const data = [
    {
        img: 'https://s3-ap-southeast-1.amazonaws.com/sero-media/images/201905/WechatIMG33.png',
        title: 'Evergames',
        desc: 'EvergamesEvergamesEvergamesEvergamesEvergamesEvergames'
    },
    {
        img: 'https://s3-ap-southeast-1.amazonaws.com/sero-media/images/201905/WechatIMG33.png',
        title: 'Evergames',
        desc: 'EvergamesEvergamesEvergamesEvergamesEvergamesEvergames'
    },
    {
        img: 'https://s3-ap-southeast-1.amazonaws.com/sero-media/images/201905/WechatIMG33.png',
        title: 'Evergames',
        desc: 'EvergamesEvergamesEvergamesEvergamesEvergamesEvergames'
    },
    {
        img: 'https://s3-ap-southeast-1.amazonaws.com/sero-media/images/201905/WechatIMG33.png',
        title: 'Evergames',
        desc: 'EvergamesEvergamesEvergamesEvergamesEvergamesEvergames'
    }
];


class Game extends Component {

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

    render() {
        let row=[];

        let index = 1;
        for(let obj of data){
            row.push(<div key={index++} style={{padding: '0 15px'}}>
                <div
                    style={{
                        lineHeight: '50px',
                        color: '#888',
                        fontSize: 18,
                        borderBottom: '1px solid #F6F6F6',
                    }}
                >{obj.title}</div>
                <div style={{display: 'flex', padding: '15px 0'}}>
                    <img style={{height: '64px', marginRight: '15px'}} src={obj.img} alt=""/>
                    <div style={{lineHeight: 1,width:'100%'}}>
                        <div style={{marginBottom: '8px', fontWeight: 'bold'}}>{obj.title}</div>
                        <div className='divcss5'>{obj.desc}</div>
                    </div>
                </div>
            </div>)

        }
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

                    {row}

                </div>
            </div>
        )
    }
}

export default Game;

