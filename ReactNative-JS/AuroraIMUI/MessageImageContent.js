import React, {Component} from "react";
import PropTypes from 'prop-types';
import { View, ViewPropTypes, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({

  image: {
    maxWidth: 200.0,
    maxWidth: 200.0,
    minHeight: 160.0,
    minWidth: 160.0,
  }
})

export default class MessageImageContent extends Component {
  
  render() {
    console.log(this.props.mediaPath)
    return <Image
      style={styles.image}
      // resizeMode="cover"
      // source={require('../assert/img2.png')}
      source={{uri: this.props.mediaPath}}
    />
  }
}