import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ListView, List, Button, Tabs, PullToRefresh, Icon, NavBar} from 'antd-mobile';
import {StickyContainer, Sticky} from 'react-sticky';
import './tx.css';
import Language from './../../language/language.js';
import Common from './../../common/common.js';
import accountURL from "../../common/config";
import memberURl from './../../common/config.js';
import Axios from "../../service/service";
import {Modal, Toast} from "antd-mobile/lib/index";
import QRCode from "qrcode";
import Utils from "../../common/utils";
import BigNumber from "bignumber.js/bignumber";
import copy from "copy-text-to-clipboard/index";
import {urls} from "../../common/url";
let alert = Modal.alert;
let ajax = new Axios();
let Item = List.Item;
let Brief = Item.Brief;
let Lang = new Language();
let _cc = new Common();
let utils = new Utils();

function renderTabBar(props) {
    return (<Sticky>
        {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}

const NUM_SECTIONS = 1;
// const NUM_ROWS_PER_SECTION = 10;
let pageIndex = 0;

function MyBody(props) {
    console.log("props: ",props);
    return (
        <List className="my-list">
            {props.children}
        </List>
    );
}

let dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];

function genData(pIndex,NUM_ROWS_PER_SECTION) {
    console.log(pIndex,NUM_ROWS_PER_SECTION);
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    console.log(sectionIDs)
    console.log(rowIDs)
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
}

class TransactionList extends Component {

    constructor(props) {
        super(props);

        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            visible: false,
            language: 'en_US',
            currency: 'SERO',
            address: '',
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight-200,
            pageSize:10,
            pageNo:1,
            isLoading:true,
            hasMore:true,
            dataSource,
            data:[],
            tabIndex:0,
        }
    }

    componentWillMount() {

        this.setState({
            currency: this.props.match.params.currency
        });

        if (_cc.getStorage('language')) {
            if (_cc.getStorage('language') === 'zh_CN') {
                this.setState({
                    languageValue: ['简体中文'],
                    language: 'zh_CN',
                })
            } else if (_cc.getStorage('language') === 'zh_TW') {
                this.setState({
                    languageValue: ['繁體中文'],
                    language: 'zh_TW',
                })
            } else {
                this.setState({
                    languageValue: ['English'],
                    language: 'en_US',
                })
            }
        }

        this.getUserDetail();
        document.title = this.props.match.params.currency;

    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        setTimeout(() => this.setState({
            height: hei
        }), 0);

    }

    getUserDetail() {
        let that = this;
        let token = _cc.getStorage('token');
        let biz = {}
        if (token) {
            that.setState({
                loginStatus: true
            })
            ajax.post(`${memberURl.member}/member/detail`, token, biz, function (res) {
                if (res.base.code === 'SUCCESS') {
                    pageIndex = 0;
                    dataBlobs = {};
                    sectionIDs = [];
                    rowIDs = [];

                    that.setState({
                        address: res.biz.address,
                        tabIndex:0,
                        pageNo:1,
                        data:[],
                        isLoading:true,
                        dataSource: that.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs)
                    });
                    setTimeout(()=>{
                        that.getTxs(res.biz.address,0)
                    },200);
                } else {
                    // urls.login();
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                    if (res.base.code === 'F0007') {
                        _cc.toPageWithTime('/login',3000);
                    }
                }
            })
        } else {
            that.setState({
                loginStatus: false
            });
            urls.login();
        }
    }

    getTxs(pkr,txType) {

        let that = this;

        let pageNo = that.state.pageNo;
        console.log("pageNo:",pageNo)
        let biz = {
            currency: that.props.match.params.currency,
            type:txType,
        };
        that.setState({
            txType:txType,
        })

        if(txType === 2){
            biz.type = 23
        }
        let page = {
            page_size:that.state.pageSize,
            page_no:pageNo,
        };
        let token = _cc.getStorage('token');
        if (token) {
            ajax.postPages(`${accountURL.account}/assets/tx`, token, biz,page, function (res) {
                if (res.base.code === 'SUCCESS') {
                    let dateSourceRes = res.biz;
                    let tempData = [] ;
                    if (dateSourceRes.length === 0 ){
                        that.setState({
                            data:dateSourceRes,
                            hasMore:false,
                            pageNo:++pageNo,
                        });
                    }else{


                        let index = dateSourceRes.length -1;
                        for (let d of dateSourceRes){
                            tempData[index--] = d;
                        }

                        that.setState({
                            data:tempData,
                            pageNo:++pageNo,
                        });
                    }
                    setTimeout(() => {
                        genData(pageIndex++,tempData.length);
                        that.setState({
                            dataSource: that.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                            refreshing: false,
                            isLoading: false,
                            hasMore:tempData.length === that.state.pageSize,
                        });
                    }, 100);
                }else{
                    Toast.fail(Lang.errorCode[that.state.language][res.base.code], 2);
                    if (res.base.code === 'F0007') {
                        _cc.toPageWithTime('/login',3000);
                    }
                }
            })
        } else {
            _cc.toPageWithTime('/login',3000);
        }
    }

    //充值
    rechargeFun(address) {
        let that = this;
        alert(Lang.tx[that.state.language].button.in,
            <div>
                <canvas id="qrImg"/>
                <p style={{marginTop: '0',fontSize:'12px'}} className='paymentPassword'>{address}</p>
                <Button className='copyTxt'
                        onClick={()=>{copy(address);Toast.success(Lang.copySucc[that.state.language], 1);}}>{Lang.copy[that.state.language]}</Button>
            </div>
            , [
                {text: Lang.cancel[that.state.language], onPress: () => console.log('cancel')},
                {text: Lang.OK[that.state.language], onPress: () => console.log('ok')},
            ])
        var canvas = document.getElementById('qrImg')
        QRCode.toCanvas(canvas, address, function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
    }

    onEndReached = (event) => {
        console.log("onEndReached begin")
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        this.getTxs(this.state.address,this.state.tabIndex);

    }

    onRefresh = () => {
        console.log("onRefresh")
        // this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax

        if(this.state.refreshing || this.state.isLoading){
            return;
        }

        pageIndex = 0;
        dataBlobs = {};
        sectionIDs = [];
        rowIDs = [];

        this.setState({
            pageNo:1,
            data:[],
            refreshing: true,
            isLoading: true,
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs)
        });

        setTimeout(() => {
            this.getTxs(this.state.address,this.state.tabIndex);
        }, 300);

    };

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    // backgroundColor: '#F5F5F9',
                    // height: 0,
                    // borderTop: '1px solid #ECECED',
                    // borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = this.state.data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if(this.state.data.length>0){
                if (index < 0) {
                    index = this.state.data.length - 1;
                }
                const data = this.state.data[index--];

                let amount = new BigNumber(data.amount);
                let digits = new BigNumber(10);
                let decimals = digits.pow(data.decimals);
                let toFixed = (data.decimals >6?6:data.decimals)
                let total = amount.dividedBy(decimals).toFixed(toFixed);

                let fuhao = "-";
                let type= Lang.tx[this.state.language].type.out;
                if (this.state.address === data.to){
                    fuhao = "+";
                    type = Lang.tx[this.state.language].type.in;
                }
                let state;
                if(data.state === 4){
                    state = <small style={{color:'#2072b2'}} >{Lang.tx[this.state.language].status.completed}</small>
                }else if(data.state === 5){
                    state = <small style={{color:'#e42326'}} >{Lang.tx[this.state.language].status.fail}</small>
                }else{
                    state = <small style={{color:'#0b905d'}} >{Lang.tx[this.state.language].status.processing}</small>
                }

                return (
                    <Item key={rowID} style={{padding: '0 15px'}} extra={<span style={{color:'#108ee9'}} onClick={()=>{_cc.toPage(`/assets/tx/detail/${data.tx_no}`)} }>{`${fuhao} ${total}`}</span>}
                          thumb="./assets/img/transactionOut.svg"
                          multipleLine arrow="horizontal">
                        {type}<br/>{state}

                        <br/>
                        <Brief>{<span style={{fontSize: '13px'}}>{utils.convertUTCDate(data.created_at)}</span>}</Brief>
                    </Item>
                );
            }else{
                return (
                    <Item key={rowID} />
                );
            }

        };



        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    leftContent={Lang.back[this.state.language]}
                    onLeftClick={() => {
                        urls.assets()
                    }}
                >
                    List
                </NavBar>
                    <StickyContainer>
                        <Tabs tabs={Lang.tx[this.state.language].title}
                              initialPage={0}
                              renderTabBar={renderTabBar}
                              swipeable={false}
                              onChange={(tab, index) => {
                                  pageIndex = 0;
                                  dataBlobs = {};
                                  sectionIDs = [];
                                  rowIDs = [];

                                  this.setState({
                                      tabIndex:index,
                                      pageNo:1,
                                      data:[],
                                      isLoading:true,
                                      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs)
                                  });
                                  setTimeout(()=>{
                                      this.getTxs(this.state.address,index)
                                  },500);
                              }}

                        >
                            <div style={{backgroundColor: '#fff'}}>
                                <ListView
                                    ref={el => this.lv = el}
                                    dataSource={this.state.dataSource}
                                    // renderHeader={() => <span>header</span>}
                                    renderFooter={() => (<div style={{ paddingTop: 10,paddingBottom: 50, textAlign: 'center' }}>
                                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                                    </div>)}
                                    renderBodyComponent={() => <MyBody />}
                                    renderRow={row}
                                    renderSeparator={separator}
                                    style={{
                                        // height: this.state.height,
                                        overflow: 'auto',
                                    }}
                                    pageSize={this.state.pageSize}
                                    scrollRenderAheadDistance={500}
                                    onEndReached={this.onEndReached}
                                    onEndReachedThreshold={10}
                                    useBodyScroll={true}
                                    pullToRefresh={<PullToRefresh
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                    />}
                                />
                            </div>
                            <div style={{backgroundColor: '#fff'}}>
                                <ListView
                                    ref={el => this.lv = el}
                                    dataSource={this.state.dataSource}
                                    // renderHeader={() => <span>header</span>}
                                    renderFooter={() => (<div style={{ paddingTop: 10,paddingBottom: 50, textAlign: 'center' }}>
                                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                                    </div>)}
                                    renderBodyComponent={() => <MyBody />}
                                    renderRow={row}
                                    renderSeparator={separator}
                                    style={{
                                        // height: this.state.height,
                                        overflow: 'auto',
                                    }}
                                    pageSize={this.state.pageSize}
                                    // onScroll={() => { console.log('scroll'); }}
                                    scrollRenderAheadDistance={500}
                                    onEndReached={this.onEndReached}
                                    onEndReachedThreshold={10}
                                    useBodyScroll={true}
                                    pullToRefresh={<PullToRefresh
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                    />}
                                />
                            </div>
                            <div style={{backgroundColor: '#fff'}}>
                                <ListView
                                    ref={el => this.lv = el}
                                    dataSource={this.state.dataSource}
                                    // renderHeader={() => <span>header</span>}
                                    renderFooter={() => (<div style={{ paddingTop: 10,paddingBottom: 50, textAlign: 'center' }}>
                                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                                    </div>)}
                                    renderBodyComponent={() => <MyBody />}
                                    renderRow={row}
                                    renderSeparator={separator}
                                    style={{
                                        // height: this.state.height,
                                        overflow: 'auto',
                                    }}
                                    pageSize={this.state.pageSize}
                                    scrollRenderAheadDistance={500}
                                    onEndReached={this.onEndReached}
                                    onEndReachedThreshold={10}
                                    useBodyScroll={true}
                                    pullToRefresh={<PullToRefresh
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                    />}
                                />
                            </div>

                        </Tabs>
                    </StickyContainer>

                <div className="txButton">
                    <div className="bt1">
                        <Button type="primary" style={{backgroundColor: 'rgb(28, 165, 165)'}}
                                onClick={() => this.rechargeFun(this.state.address)}>{Lang.tx[this.state.language].button.in}</Button>
                    </div>
                    <div className="bt2">
                        <Button type="primary" onClick={() => {
                            urls.transferCy(this.props.match.params.currency)
                        }}>{Lang.tx[this.state.language].button.out}</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TransactionList;
