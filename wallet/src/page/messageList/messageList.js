import React, {Component} from 'react';
import {NavBar, Icon, Tabs, List, Toast} from 'antd-mobile';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import messageURL from './../../common/config.js';
import Axios from './../../service/service.js';
import './messageList.css';
import {Modal} from "antd-mobile/lib/index";
import Utils from "../../common/utils"
import {urls} from "../../common/url";

let Item = List.Item;
let Brief = Item.Brief;
let Lang = new Language();
let _cc = new Common();
let ajax = new Axios();
let alert = Modal.alert;
let utils = new Utils;

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'zh_CN',
            tabs: [
                {title: Lang.unread['en_US'], sub: '1'},
                {title: Lang.readed['en_US'], sub: '2'},
            ],
            messageListUnread: [],
            messageListRead: [],
            hasRead:{},
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            if (_cc.getStorage('language') === 'zh_CN') {
                this.setState({
                    tabs: [
                        {title: Lang.unread['zh_CN'], sub: '1'},
                        {title: Lang.readed['zh_CN'], sub: '2'},
                    ],
                    language: 'zh_CN',
                })
            } else {
                this.setState({
                    tabs: [
                        {title: Lang.unread['en_US'], sub: '1'},
                        {title: Lang.readed['en_US'], sub: '2'},
                    ],
                    language: 'en_US',
                })
            }
        } else {
            this.setState({
                language: 'zh_CN'
            })
        }
        this.getList('unread');
        document.title = Lang.personal.message[_cc.getStorage('language')];
    }

    setRead(id, type, num, title, context, time) {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {
            notice_id: id
        }

        let tmpR = that.state.hasRead;
        if (type === 'unread' && !tmpR[id]) {
            ajax.post(`${messageURL.message}/notice/read`, token, biz, function (res) {
                console.info(res);
                if (res.base.code === 'SUCCESS') {
                    let redDot = document.getElementsByClassName('redDot');
                    redDot[num - 1].setAttribute('class', 'grayDot');
                    tmpR[id]=true;
                    that.setState({
                        hasRead:tmpR
                    })
                } else {
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                    if (res.base.code === 'F0007') {
                        _cc.toPageWithTime('/login',3000);
                    }
                }
            })
        }
        alert(title,
            <div className="noticeText">
            <span style={{fontSize: '12px', color: 'gray'}}>
               {time}
            </span>
                <div className="contextMsg">{context}</div>
            </div>
            , [
                {text: Lang.cancel[that.state.language], onPress: () => console.log('cancel')},
                {text: Lang.OK[that.state.language], onPress: () => console.log('ok')},
            ])
    }

    getList(state) {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {
            type: "notice",
            state: state
        }
        let history = that.props.history;
        ajax.post(`${messageURL.message}/notice`, token, biz, function (res) {
            if (res.base.code === 'SUCCESS') {
                let data = res.biz;
                let messageList = [];
                let count = 1;
                for (let dataList of data) {
                    let index = count;
                    let reg = new RegExp('-', "g")
                    let time = utils.convertUTCDate(dataList.CreatedAt);
                    let timeData = time.substring(0, 10) + '  ' + time.substring(11, 16);
                    messageList.push(
                        <Item extra={timeData} key={count}
                              onClick={(id, type, num) => that.setRead(dataList.notice_id, state, index, dataList.title, dataList.context, time)}>
                            {dataList.state === 'unread' ? <div className='redDot'></div>
                                : <div className='grayDot'></div>} {dataList.title}<Brief>{dataList.context}</Brief>
                        </Item>
                    )
                    count++;
                }
                if (state === 'unread') {
                    that.setState({
                        messageListUnread: messageList
                    })
                } else {
                    that.setState({
                        messageListRead: messageList
                    })
                }
            } else {
                Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                if (res.base.code === 'F0007') {
                    _cc.toPageWithTime('/login',3000);
                }
            }
        })
    }

    changeAndClick(tab, index) {
        if (index === 0) {
            this.getList('unread');
        } else {
            this.getList('read');
        }
    }

    render() {
        return (
            <>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    leftContent={Lang.back[this.state.language]}
                    onLeftClick={() => {
                        urls.personalCenter()
                    }}
                >
                    Message
                </NavBar>

                <div className='messageListDemo'>

                    <Tabs tabs={this.state.tabs}
                          initialPage={0}
                          onChange={(tab, index) => this.changeAndClick(tab, index)}
                    >
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {
                                this.state.messageListUnread.length > 0 ? <List className="message-list-unread">
                                        {this.state.messageListUnread}
                                    </List>
                                    : <div className='noMessage'>{Lang.noMessage[this.state.language]}</div>
                            }
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {
                                this.state.messageListRead.length > 0 ? <List className="message-list-read">
                                        {this.state.messageListRead}
                                    </List>
                                    : <div className='noMessage'>{Lang.noMessage[this.state.language]}</div>
                            }
                        </div>
                    </Tabs>
                </div>
            </>
        )
    }
}

export default MessageList;
