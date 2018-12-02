import React, {Component} from "react";
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Image, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  stateContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10.0,
  },
  stateView: {
    width: 20.0,
    height: 20.0,
  }
})

// "send_succeed", "send_failed", "send_going", "download_failed"
export default class MessageState extends Component {
  constructor(props) {
    super(props)
    this._renderStateView = this._renderStateView.bind(this)
  }
  
  _renderStateView() {
    switch(this.props.status) {
      case 'send_failed':
        return <Image style={styles.stateView} source={require('../assert/fail.png')}/>
      case 'send_going':
        return <ActivityIndicator style={styles.stateView} color='red'/>
      case 'send_succeed':
      default:
        return null
    }
  }

  render() {
    return <View
      style={styles.stateContainer}
    >
      {this._renderStateView()}
      {/* <View style={styles.stateView}></View> */}
    </View>
  }
}