import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'

export default function Button(props) {
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>  navigation.reset({ index: 0, routes: [{ name: props.navigate }] }) }
      >
      <View style={[styles.button, styles.primary]}>
        <Text style={styles.text}>
          <FontAwesome5
            name={props.icon}
            size={20}
            color="#fff"
          />
          {''} {''} {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    height: 50,
    width: '90%',
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 22,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  primary: {
    color: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#11cdef',
    backgroundColor: '#11cdef'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})
