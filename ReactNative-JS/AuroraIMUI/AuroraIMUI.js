import React, {Component} from "react";
import {RecyclerListView, LayoutProvider, DataProvider} from "recyclerlistview";
import {Platform, View, Dimensions, Text, Image, TouchableHighlight, TextInput,Keyboard, KeyboardAvoidingView} from "react-native";
import PropTypes from 'prop-types';

import FlightData from "./FlightData";

import MessageList from "./MessageList";
import Message from "./Message";
import Event from "./Event";
import InputView from "./InputView";
import InputItem from "./InputItem";

let {height, width} = Dimensions.get('window');

export default class AuroraIMUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extendedState: {ids: []},
            messageList: props.historyMessages,
            messageList: [{
                type: "Event",
                values: { text: "已添加好友，开始聊天   已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天"}
            }, {
                type: "Message",
                values: {}
            },
            {
                type: "Text",
                values: { text: "已添加好友，开始聊天   已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天"}
            },
            {
                type: "Text",
                values: { text: "已添加好友，开始聊天   已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天"}
            },
            {
                type: "Event",
                values: { text: "已添加好友，开始聊天   已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天"}
            },
            {
                type: "Text",
                values: { text: "已添加好友，开始聊天   已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天已添加好友，开始聊天"}
            }],
        }

        this._renderRow = this._renderRow.bind(this);
        this.renderRight = this.renderRight.bind(this);
        this.loadHistoryMessages = this.loadHistoryMessages.bind(this);
        this._onInputViewSizeChanged = this._onInputViewSizeChanged.bind(this);
    }

    _renderRow(type, data) {
        switch (type) {
            case "Event":
                return <Event {...data.values}/>
            case "Message":
                return <Message {...data.values}/>
            default:
                return null
        }
    }

    _onInputViewSizeChanged() {
        if (!this.messageList) {
            return
        }
        
        // TODO:
        this.props.onInputViewSizeChanged && 
            this.props.onInputViewSizeChanged.constructor === Function &&
            this.props.onInputViewSizeChanged()
    }

    async loadHistoryMessages(historyMessage) {

        var imageUrlArray = [
            
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926548887&di=f107f4f8bd50fada6c5770ef27535277&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F67%2F23%2F69i58PICP37.jpg",//1
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926367926&di=ac707ee3e73241daaa5598730d28909d&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fapp%2Ficon%2F20160220%2F1455956985275086.jpg",//2
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926419519&di=c545a5d3310e88454d222623532e06b7&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fyouxi%2Fimages%2F2015%2F0701%2F20150701085247270.jpg",//3
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926596720&di=001e99492a3e684a63c07b204ff1c641&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01567057a188f70000018c1bc79411.jpg%40900w_1l_2o_100sh.jpg",//4
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926617378&di=01ade16186d4f0b6ef4fead945d142c4&imgtype=0&src=http%3A%2F%2Fimg1.tplm123.com%2F2008%2F04%2F04%2F3421%2F2309912507054.jpg",//5
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926710881&di=83ecd418f598bcadb9d74e5075397fc2&imgtype=0&src=http%3A%2F%2Fwww.missku.com%2Fd%2Ffile%2Fimport%2F2015%2F1211%2Fthumb_20151211142740226.jpg",//6
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926731796&di=e431578738f709fd75f17799a91ac4a9&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%253D268%2Fsign%3D4c99e09935d3d539c13d08c50286e927%2F8c1001e93901213f3d7d8ebb57e736d12f2e950f.jpg",//7
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926752612&di=7a8d887ece70f73517b32803a2e048cd&imgtype=0&src=http%3A%2F%2Fimg10.360buyimg.com%2FpopWaterMark%2Fg15%2FM01%2F03%2F13%2FrBEhWVLh4JEIAAAAAAB99-puGocAAIKSwLztRsAAH4P213.jpg",//8
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926795383&di=1ce1c07257fa6918c4fbbeb3ee4e1eef&imgtype=0&src=http%3A%2F%2Fd.ifengimg.com%2Fw600%2Fp0.ifengimg.com%2Fpmop%2F2018%2F0322%2FB02F8FEE6DF6ECD3358F1EB877ECABC93268790E_size31_w643_h643.jpeg",//9
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926793631&di=76964940e9b139ec8960ebf3dc360c8c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170828%2F84c750b9293744549a169ae3d80a0dab.jpeg",//10
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=898198915,303815663&fm=200&gp=0.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534936168009&di=89ba45a63f42525678093902e46f4a91&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb58f8c5494eef01fd65fb3feebfe9925bc317d46.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534936168009&di=b2880349c31f7b6e8f99c2804f6aab1c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F54fbb2fb43166d22c5dd83a84d2309f79052d260.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534936168009&di=c87b27ba6616c97573da2f4bb6feb705&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F242dd42a2834349beaa73bb9c2ea15ce36d3be6d.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534936168008&di=bea720e169fa4455596c46040cbf44af&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F5ab5c9ea15ce36d3e9f1a40c31f33a87e950b110.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534936168008&di=12d6a78b3e47ebb59166ae6d835c080d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fdbb44aed2e738bd4ff4b3d0aaa8b87d6277ff9a7.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534936168008&di=eacdfe43ba6779092176a676dd1384d0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F32fa828ba61ea8d30fe6f43f9c0a304e241f58c1.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534936168007&di=985df3a5cb77f6aa2c7bbdb468810815&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fae51f3deb48f8c5449425b1531292df5e0fe7f73.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534936168007&di=34f235219fc292a2bb22d1e96c4d0f75&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F472309f7905298220c6eb9f8dcca7bcb0a46d4a8.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534936168007&di=cc14ec3efe584b256a817c0b4fe81dac&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F14ce36d3d539b600eb06458ce250352ac75cb7c5.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534936168007&di=edfe4269d7a5917e9001f8404a7eaab1&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F242dd42a2834349b803f9da3c2ea15ce36d3bedf.jpg",
          ]
          var history = imageUrlArray.map((url) => {
            return {
                type: "Image",
                values: {
                    mediaPath: url
                }
            }
        })
        
        const topRowIndex = this.messageList.messageListRef.findApproxFirstVisibleIndex();
        const topRow = this.state.messageList[topRowIndex];
        const currentOffset = this.messageList.messageListRef.getCurrentScrollOffset();
        const topRowOffset = this.messageList.messageListRef._virtualRenderer.getLayoutManager().getOffsetForIndex(topRowIndex);
        const diff = currentOffset - topRowOffset.y;
    
        var currentItem = this.state.messageList[0]
        this.state.messageList.unshift(...history)
        this.setState(() => {
            return {
              messageList: [...this.state.messageList],
              extendedState: {ids: []}
            }
        },
          () => {
            const topRowNewOffset = this.messageList.messageListRef._virtualRenderer.getLayoutManager().getOffsetForIndex(history.length);
            this.messageList.messageListRef.scrollToOffset(0, topRowNewOffset.y + diff);
        })
    }

    renderRight() {
        return <InputItem
            source={require("../assert/send.png")}
            onPress={() => {
                // TODO: sendText
                if (!this.inputView) {
                    return
                }
                this.state.messageList.push({type: "Text",values: {text: this.inputView.state.text, isOutgoing: true}})
                this.setState({
                    messageList: this.state.messageList
                })
                this.inputView.setState({
                    text: ""
                })
            }}
        />
    }

    render() {
        const AuroraIMUIContainer = Platform.select({
            ios: () => require('KeyboardAvoidingView'),
            android: () => require('View'),
          })();

        return <AuroraIMUIContainer 
            style={styles.container}
            behavior="padding"
        >
            <MessageList
                ref={(component) => {this.messageList = component}}
                messageList={this.state.messageList}
                extendedState={this.state.extendedState}
                onLoadingHistoryMessages={this.loadHistoryMessages}
                {...this.props}
                onLayout={({nativeEvent: {layout}}) => {
                    if (this.state.messageList && 
                        this.state.messageList.constructor === Array &&
                        this.state.messageList.length > 0) 
                        {
                            const contentHeight = this.messageList.messageListRef._virtualRenderer.getLayoutDimension().height   
                            this.messageList.messageListRef.scrollToOffset(0, contentHeight - layout.height, false)
                    }
                }}
                
            />

            <InputView 
                ref={(component) => {this.inputView = component}}
                inputViewStyle={{}}
                renderRight={this.renderRight}
                {...this.props}
                onInputViewSizeChanged={this._onInputViewSizeChanged}
            />
        </AuroraIMUIContainer>
    }
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    }
}

AuroraIMUI.propTypes = {
    
    // textInputProps: PropTypes.object,
    historyMessages: PropTypes.array, 
    onInputTextChanged: PropTypes.func,
    onInputViewSizeChanged: PropTypes.func,
};

AuroraIMUI.defaultProps = {
    historyMessages: [],
    onInputTextChanged: () => {},
    onInputViewSizeChanged: () => {}
};