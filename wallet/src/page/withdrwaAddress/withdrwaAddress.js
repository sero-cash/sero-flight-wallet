import React, {Component} from 'react';
import {List, Button,NavBar,Icon} from 'antd-mobile';
import './witdrawAddress.css';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import {urls} from "../../common/url";


const Lang = new Language();
const _cc = new Common();
const Item = List.Item;
const Brief = Item.Brief;


class WithdrawAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            language: 'en_US',
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            this.setState({
                language: _cc.getStorage('language'),
            })
        } else {
            this.setState({
                language: 'zh_CN'
            })
        }


    }


    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    leftContent={Lang.back[this.state.language]}
                    onLeftClick={() =>  {urls.back()}}
                >
                    {Lang.withdrawals[this.state.language]}
                </NavBar>
                <List renderHeader={() => '提现（转账）地址'} className="my-list">
                    <Item multipleLine>
                        <div className="item">
                            <span>我的地址</span>
                            <br/>
                            <span className="content">3U6MA8J8n9YpkB1DaLgfzjsiaDUNSKHk2tiMD19oiVLF4kauebmFcpV1kbsEmSt7Nz38GWhdnfSKzhYRWWqQk5UM</span>
                            <Brief>备注</Brief>
                            <div className="editButton">
                                <div className="l"><Button size="small" type="primary" inline>设置为默认</Button></div>
                                <div className="m"><Button size="small" type="ghost" inline>编辑</Button></div>
                                <div className="r"><Button size="small" type="warning" inline>删除</Button></div>
                            </div>
                        </div>
                    </Item>
                    <Item multipleLine>
                        <div className="item">
                            <span>晓丽</span>
                            <br/>
                            <span className="content">3U6MA8J8n9YpkB1DaLgfzjsiaDUNSKHk2tiMD19oiVLF4kauebmFcpV1kbsEmSt7Nz38GWhdnfSKzhYRWWqQk5UM</span>
                            <Brief>备注</Brief>
                            <div className="editButton">
                                <div className="l"><Button size="small" type="primary" inline>设置为默认</Button></div>
                                <div className="m"><Button size="small" type="ghost" inline>编辑</Button></div>
                                <div className="r"><Button size="small" type="warning" inline>删除</Button></div>
                            </div>
                        </div>
                    </Item>
                </List>
                <div className="addressButton">
                    <div className='btn1'><Button type="primary">添加新地址</Button></div>
                </div>
            </div>
        )
    }
}

export default WithdrawAddress;
