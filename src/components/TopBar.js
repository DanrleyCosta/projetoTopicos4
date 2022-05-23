import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

export default function TopBar(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>
          <FontAwesome5
            name={props.icon}
            size={25}
            color="#637089"
          />
          {''} {''} {props.name}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    padding: 25,
    shadowOpacity: 0.5,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#637089'
  }
})
