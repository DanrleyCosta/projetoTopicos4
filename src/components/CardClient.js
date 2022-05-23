import React, {useState} from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FontAwesome5 } from '@expo/vector-icons'
import {useNavigation} from "@react-navigation/native"

export default function CardClient(props) {
  const navigation = useNavigation()
  const [clients, setClients] = useState([])

  const removeClient = async (id) => {
    try {
      const storage = await AsyncStorage.getItem('clients')
      if (storage !== null) setClients(JSON.parse(storage))

      setClients(clients.filter((client) => client.id !== id))
      await AsyncStorage.setItem("clients", JSON.stringify(clients))

      Alert.alert("Sucesso!", "O cliente foi removido com sucesso!", [
        {
          text: "OK",
          onPress: () =>
            navigation.reset({index: 0, routes: [{name: "Clientes"}]}),
        },
      ])
    } catch (err) {
      console.log(err)
      Alert.alert("Ops...!", "Não foi possível remover o cliente.", [
        {
          text: "OK",
          style: "cancel",
        },
      ])
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{marginRight: 20}}>
          <FontAwesome5
            name="user-alt"
            size={35}
            color="#32325d"
          />
        </View>
        <View>
          <Text style={styles.text}>
            {props?.name}
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end'}}>
        <View style={styles.row}>
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() =>
              navigation.navigate("ClientView", {
                client: props,
              })
            }
          >
            <FontAwesome5
              name="user-secret"
              size={22}
              color="#11cdef"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() => console.log('Pressed edit')}
          >
            <FontAwesome5
              name="user-edit"
              size={22}
              color="#5e72e4"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() => removeClient(props.id)}
          >
            <FontAwesome5
              name="user-times"
              size={22}
              color="#fb6340"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    borderRadius: 10,
    marginBottom: 20,
    shadowOpacity: 0.5,
    shadowColor: 'black',
    marginHorizontal: 15,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#172b4d'
  },
  row: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row'
  }
})
