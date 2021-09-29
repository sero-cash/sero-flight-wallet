import React, {Component} from 'react';
import {ListView, WhiteSpace, Icon, TabBar, NavBar} from 'antd-mobile';


import Language from './../../language/language.js';
import Common from './../../common/common.js';
import '../../layout/layout.css'
import {urls} from "../../common/url";

const Lang = new Language();
const _cc = new Common();

const data = {
    zh_CN: [

        {
            id: '1002',
            img: 'https://s3-ap-southeast-1.amazonaws.com/sero-media/images/201904/WechatIMG1272.jpeg',
            title: '04/06/2019',
            des: 'SERO开启超级用户招募计划',
            desc: '超级隐私项目SERO的101超级用户，是SERO社区全球的中坚力量，囊括了对SERO全球共识推广作出巨大贡献者、网络发展意见领袖（KYC）、生态建设参与者以及重要的矿工组织成员等。 \n',
        },
    ],
    en_US: [
        {
            id: '1002-en',
            img: 'https://s3-ap-southeast-1.amazonaws.com/sero-media/images/201904/WechatIMG1272.jpeg',
            title: '04/06/2019',
            des: 'SERO launches super user recruitment program',
            desc: 'SERO, the super privacy project, will officially launch the recruitment plan for “101 Super Users Worldwide” in 2019.4.8. \n',
        }
    ]

}


const NUM_ROWS = data.length;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}

class Newsaaa extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            language: 'en_US',
            menuTitle: 'NEWS',
            selectedTab: 'nmews',
        };
    }


    componentWillMount() {
        if (_cc.getStorage('language')) {
            if (_cc.getStorage('language') === 'zh_CN') {
                this.setState({
                    language: 'zh_CN',
                    menuTitle: Lang.menus.tabBarNews.zh_CN,
                })
            } else {
                this.setState({
                    language: 'en_US',
                    menuTitle: Lang.menus.tabBarNews.en_US,
                })
            }
        }
    }

    renderContent(pageText) {
        _cc.setStorage('selectedTab', pageText)
        this.setState({
            selectedTab: pageText,
        });

        if (pageText === 'home') {
            urls.assets();
        } else if (pageText === 'news') {
            urls.news()
        } else if (pageText === 'my') {
            urls.personalCenter()
        }

    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({isLoading: true});
        setTimeout(() => {
            this.rData = {...this.rData, ...genData(++pageIndex)};
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    }

    renderMsg(obj) {

    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        console.log(data[this.state.language])
        let index = data[this.state.language].length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data[this.state.language].length - 1;
            }
            const obj = data[this.state.language][index--];
            return (
                <div key={rowID} style={{padding: '0 15px'}}
                     onClick={() => {
                         urls.news01(obj.id)
                     }}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{obj.title}</div>
                    <div style={{ display: 'flex', padding: '15px 0'}}>
                        <img style={{height: '64px', marginRight: '15px'}} src={obj.img} alt=""/>
                        <div style={{lineHeight: 1}}>
                            <div style={{marginBottom: '8px', fontWeight: 'bold'}}>{obj.des}</div>
                            <div>
                                <small style={{color: '#888'}}>{obj.desc}</small>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        return (

            <div className='layoutDom'>
                <NavBar
                    mode="dark"
                    leftContent="FLIGHT"
                    style={{zIndex: 100, position: 'fixed'}}
                >
                    {Lang.menus.tabBarNews[this.state.language]}
                </NavBar>

                <div>


                    <WhiteSpace/>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderHeader={() => <span>header</span>}
                        renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>)}
                        renderRow={row}
                        renderSeparator={separator}
                        className="am-list"
                        pageSize={4}
                        useBodyScroll
                        onScroll={() => {
                            console.log('scroll');
                        }}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />

                    <div style={{position: 'fixed', width: '100%', bottom: 0}}>
                        <TabBar
                            unselectedTintColor="#949494"
                            tintColor="#33A3F4"
                            barTintColor="white"
                            hidden={this.state.hidden}
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
                                icon={<Icon type="anticon-news"/>}
                                selectedIcon={<Icon type="anticon-news1"/>}
                                title={Lang.menus.tabBarNews[this.state.language]}
                                key={Lang.menus.tabBarNews[this.state.language]}
                                // badge={1}
                                selected={this.state.selectedTab === 'news'}
                                onPress={() => {
                                    this.renderContent('news')
                                }}
                                data-seed="logId1"
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
            </div>
        );
    }
}

export default Newsaaa;
