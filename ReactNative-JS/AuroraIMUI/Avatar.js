import React, {Component} from "react";
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20,
    marginHorizontal: 8.0,
  }
})

export default class Avatar extends Component {
  render() {
    return <View
      style={styles.avatar}
    >
      <Image
        source={require('../assert/ironman.png')}
        {...this.props}
      ></Image>
    </View>
  }
}

