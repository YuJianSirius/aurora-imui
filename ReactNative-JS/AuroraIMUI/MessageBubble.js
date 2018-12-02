import React, {Component} from "react";
import PropTypes from 'prop-types';
import { View, ViewPropTypes, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "red",
  }
})

export default class MessageBubble extends Component {
  render() {
    return <View
      style={styles.bubble}
    >
      {this.props.children}
    </View>

  }
}