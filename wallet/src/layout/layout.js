import React, {Component} from 'react';
import {NavBar, Icon, Popover, TabBar} from 'antd-mobile';
import './layout.css';
import Language from './../language/language.js';
import Common from './../common/common.js';
// import {TabBar} from "antd-mobile/lib/index";

let Lang = new Language();
let _cc = new Common();

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            language: 'en_US',
            hidden: false,
        }
    }

    componentWillMount() {
        if (_cc.getStorage('language')) {
            this.setState({
                language: _cc.getStorage('language'),
                selectedTab: _cc.getStorage('selectedTab')
            })
        } else {
            this.setState({
                language: 'zh_CN',
                selectedTab: _cc.getStorage('selectedTab')
            })
        }
    }



    render() {
        return (
            <div className='layoutDom'>
                <NavBar
                    mode="dark"
                    leftContent="FLIGHT"
                    style={{zIndex: 100,position:'fixed'}}
                >
                    {this.state.menuTitle}

                </NavBar>
                {this.props.children}

            </div>
        )
    }
}

export default Layout;
