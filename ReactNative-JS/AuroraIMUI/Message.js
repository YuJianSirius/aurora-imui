import React, {Component} from "react";
import PropTypes from 'prop-types';
import { View, ViewPropTypes, StyleSheet } from 'react-native';

import Avatar from './Avatar';
import MessageBubble from './MessageBubble';
import MessageState from './MessageState';
import UserName from './UserName';
import MessageTime from './MessageTime';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10.0
  },
  outGoing: {
    flex: 1,
    flexDirection: 'row',
    
  },
  inComing: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  time: {
    flex: 1,
    alignContent: 'center',
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  row: {
    flexDirection: 'row',
  },
  defaultMessageBubbel: {
    width: 200.0,
    height: 200.0,
    backgroundColor: 'red',
  }
})
// textMessage = {
//   msgId: "msgid",
//   status: "send_going",
//   msgType: "text",
//   isOutgoing: true,
//   text: "text",
//   fromUser: {},
//   extras: {}// 选填，可以在消息中添加附加字段
// }

export default class Message extends Component {

  constructor(props) {
    super(props)

    this._renderTime = this._renderTime.bind(this)
    this._renderUserName = this._renderUserName.bind(this)
    this._renderAvatar = this._renderAvatar.bind(this)
    this._renderStateView = this._renderStateView.bind(this)
    this._renderMessageContent = this._renderMessageContent.bind(this)
    

  }
  _renderTime() {
    if (!this.props.timeString) {
      return null
    }

    if (this.props.renderTime) {
      return this.props.renderTime({...this.props})
    } else {
      return <MessageTime {...this.props}/>
    }
  }

  _renderUserName() {
    if (!this.props.UserName) {
      return null
    }

    if (this.props.renderUserName) {
      return this.props.renderUserName({...this.props.fromUser})
    } else {
      return <UserName {...this.props.fromUser}/>
    }
  }

  _renderAvatar() {
    if (this.props.renderAvatar) {
      this.props.renderAvatar({...this.props.fromUser})
    } else {
      return <Avatar {...this.props.fromUser}/>
    }
  }

  _renderStateView() {
    if (this.props.renderStateView) {
      return this.props.renderStateView({...this.props})
    } else {
      return <MessageState {...this.props}/>
    }
  }

  _renderMessageContent() {
    if (this.props.messageContent) {
      return (
        this.props.messageContent(this.props)
      );
    }
    return <View style={styles.defaultMessageBubbel}></View>
  }

  render() {
    console.log(JSON.stringify(this.props))
    return <View style={styles.container}>
      {this._renderTime()}
      <View
        style={!this.props.isOutgoing ? styles.outGoing : styles.inComing}
      >
        {this._renderAvatar()}
        <View>
          <View  style={!this.props.isOutgoing ? styles.row : styles.reverse}>
            {this._renderUserName()}
          </View>
          <View style={!this.props.isOutgoing ? styles.outGoing : styles.inComing}>
            <MessageBubble>
              {this._renderMessageContent()}
            </MessageBubble>
            {this._renderStateView()}
          </View>
        </View>
      </View>
    </View>
  }
}