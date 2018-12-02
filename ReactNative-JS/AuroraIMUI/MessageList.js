import React, {Component} from "react";
import PropTypes from 'prop-types';
import { View, ViewPropTypes, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import {RecyclerListView, LayoutProvider, DataProvider} from "recyclerlistview";
import Message from "./Message";
import Event from "./Event";
import MessageTextContent from "./MessageTextContent";
import MessageImageContent from "./MessageImageContent";

let {width} = Dimensions.get('window');

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataProvider: new DataProvider((r1, r2) => {
          return r1 !== r2
        }).cloneWithRows(props.messageList),
        refreshing: false
    };
    
    this._layoutProvider = new LayoutProvider((i) => {
        return this.state.dataProvider.getDataForIndex(i).type;
    }, (type, dim, index) => {
        dim.height = 200;
        dim.width = width;
        switch (type) {
        }
    });
    
    this._renderRow = this._renderRow.bind(this);
    this.scrollToIndex = this.scrollToIndex.bind(this);
  }

  scrollToIndex(index, animate = false) {
    if (this.messageListRef) {
      this.messageListRef.scrollToIndex(index, animate)
    }
  }

  scrollToEnd(animate = false) {
    if (this.messageListRef) {
      this.messageListRef.scrollToEnd(animate)
    }
  }

  scrollToTop(animate = false) {
    if (this.messageListRef) {
      this.messageListRef.scrollToTop(animate)
    }
  }

  scrollToOffset(offset, animate) {
    if (this.messageListRef) {
      this.messageListRef.scrollToOffset(offset, animate)
    }
  }

  scrollToItem(item, animate) {
    if (this.messageListRef) {
      this.messageListRef.scrollToItem(item)
    }
  }

  _renderRow(type, data) {
    var message = {...data.values}
    if (this.props.renderRow) {
      const customRow = this.props.renderRow()
      if (customRow) {
        return customRow
      }
    }

    switch (type) {
        case "Event":
          return <Event {...data.values}/>
        case "Message":
          return <Message {...data.values}/>
        case "Text":
          return <Message {...{...message, messageContent: (message) => {return <MessageTextContent {...message}/>}}}/>
        case "Image":
          return <Message {...{...message, messageContent: (message) => {return <MessageImageContent {...message}/>}}}/>
        default:
          return null;
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      dataProvider: state.dataProvider.cloneWithRows(props.messageList)
    }
  }

  loadHistoryMessages(historyMessages) {
    const topRowIndex = this.messageListRef.findApproxFirstVisibleIndex();
    const topRow = this.state.items[topRowIndex];
    const currentOffset = this.messageListRef.getCurrentScrollOffset();
    const topRowOffset = this.messageListRef._virtualRenderer.getLayoutManager().getOffsetForIndex(topRowIndex);
    const diff = currentOffset - topRowOffset.y;

    var currentItem = this.state.messageList[0]
    this.state.messageList.unshift(...historyMessages)

    this.setState(() => {
      return {
        dataProvider: this.state.dataProvider.cloneWithRows(this.state.messageList)
      }
    },
      () => {
          const topRowNewIndex = _.findIndex(this.state.items, topRow);
          const topRowNewOffset = this._recyclerListView._virtualRenderer.getLayoutManager().getOffsetForIndex(topRowNewIndex);
          this.messageListRef.scrollToOffset(0, topRowNewOffset.y + diff);
    })
  }

  render() {
    return (<View style={{flex: 1}}
      {...this.props}
    >
      <RecyclerListView 
        contentContainerStyle={[this.props.messageListStyle ? this.props.messageListStyle : {}]}
        renderAheadOffset={4000}
        ref={(messageListRef) => {this.messageListRef = messageListRef}}
        rowRenderer={this._renderRow} 
        dataProvider={this.state.dataProvider}
        extendedState={this.props.extendedState}
        renderFooter={() =>  <View style={{backgroundColor: 'red', height: 20}}/>}
        layoutProvider={this._layoutProvider}
        forceNonDeterministicRendering={true}
        scrollViewProps={{
          stickyHeaderIndices: [1],
          refreshControl:  
              <RefreshControl
                refreshing={this.state.refreshing} 
                onRefresh={ async () => {
                    this.setState({
                      refreshing: true
                    })
                    await this.props.onLoadingHistoryMessages()
                    this.setState({
                      refreshing: false
                    })
                    
                }}
              />
      }}
    />
    </View>)
    // return 
  }
}