import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Header(props) {
  return (
    <View style={styles.container} />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    height: 40,
    backgroundColor: 'white'
  }
})
