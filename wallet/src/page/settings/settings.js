import React, {Component} from 'react';
import { List,Button,WhiteSpace ,Picker,NavBar,Icon} from 'antd-mobile';

import Language from './../../language/language.js';
import Common from './../../common/common.js';
import {urls} from "../../common/url";

const Item = List.Item;

const Lang = new Language();
const _cc = new Common();

const lanData = [
    {
        label: 'English',
        value: 'English',
    },{
        label: '简体中文',
        value: '简体中文',
    }
]

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            language: 'en_US',
            languageData :lanData,
            languageValue : ['简体中文']
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            if (_cc.getStorage('language') === 'zh_CN') {
                this.setState({
                    languageValue: ['简体中文'],
                    language: 'zh_CN',
                })
            } else {
                this.setState({
                    languageValue: ['English'],
                    language: 'en_US',
                })
            }
        }
        document.title = Lang.personal[_cc.getStorage('language')].setting;
    }

    onChangeLanguage(language) {
        if (language[0] === '简体中文') {
            this.setState({
                language: 'zh_CN'
            })
            _cc.setStorage('language', 'zh_CN');
        } else if (language[0] === '繁體中文') {
            this.setState({
                language: 'zh_TW'
            })
            _cc.setStorage('language', 'zh_TW');
        } else {
            this.setState({
                language: 'en_US'
            })
            _cc.setStorage('language', 'en_US');
        }
        this.setState({
            languageValue: language
        })
    }

    logOut(){
        _cc.setStorage('token', '');
        urls.login()
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    leftContent={Lang.back[this.state.language]}
                    onLeftClick={() =>  {urls.personalCenter()}}
                >
                    {Lang.personal.setting[this.state.language]}
                </NavBar>
                <WhiteSpace/>
                <Picker data={this.state.languageData} cols={1} value={this.state.languageValue}  extra="简体中文"
                        onChange={this.onChangeLanguage.bind(this)}
                        onOk={this.onChangeLanguage.bind(this)}>
                    <Item arrow="horizontal">{Lang.language.title[this.state.language]}</Item>
                </Picker>

                <WhiteSpace/>
                <Button type="warning" onClick={()=>{this.logOut()}}>{Lang.personal.exit[this.state.language]}</Button>
            </div>
        )
    }
}

export default Settings;
