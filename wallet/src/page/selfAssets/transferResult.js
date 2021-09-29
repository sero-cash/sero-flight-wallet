import React, {Component} from 'react';
import { Result, Icon ,NavBar} from 'antd-mobile';
import { List } from 'antd-mobile';

import './selfAssets.css';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import {urls} from "../../common/url";


const Item = List.Item;
const Brief = Item.Brief;

const Lang = new Language();
const _cc = new Common();

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

const ResultExample = () => (<div className="result-example">

    <Result
        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
        title="等待处理"
        message="已提交申请，等待系统处理"
    />

</div>);
class WithdrawResult extends Component {

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
                    icon={<Icon type="left" />}
                    leftContent={Lang.back[this.state.language]}
                    onLeftClick={() =>  {urls.assets()}}
                >
                    {Lang.withdrawals[this.state.language]}
                </NavBar>
                <ResultExample />
            </div>
        )
    }
}

export default WithdrawResult;
