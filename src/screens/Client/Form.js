import React, {useState, useEffect, useCallback} from "react"
import {useNavigation} from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {View, StyleSheet, Text, TextInput, Button, Alert, ScrollView} from "react-native"
import LottieView from "lottie-react-native"

import Header from "../../components/Header"
import TopBar from "../../components/TopBar"
import ButtonGoBack from "../../components/Button"

export default function ClientForm(props) {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState([])
  const [newClient, setNewClient] = useState({
    id: Math.random().toString().replace("0.", ""),
    name: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    district: "",
    city: ""
  })

  useEffect(() => {
    searchData()
  }, [])

  const searchData = async () => {
    try {
      const storage = await AsyncStorage.getItem("clients")
      if (storage !== null) setClients(JSON.parse(storage))
      setLoading(false)
    } catch (err) {
      console.log("Error: ", err)
      setLoading(false)
    }
    console.log("Select Form", clients)
  }

  const handleChange = useCallback(
    (value) => {
      setNewClient((state) => ({...state, ...value}))
    },
    [setNewClient]
  )

  const onSubmit = async () => {
    try {
      if (clients.length > 0) {
        clients.push(newClient)
        await AsyncStorage.setItem("clients", JSON.stringify(clients))
      } else {
        await AsyncStorage.setItem(
          "clients",
          JSON.stringify([newClient])
        )
      }
      Alert.alert("Sucesso!", "O cliente foi salvo com sucesso!", [
        {
          text: "OK",
          style: "cancel",
          onPress: () =>
            navigation.reset({index: 0, routes: [{name: "Clientes"}]}),
        },
      ])
    } catch (err) {
      console.log(err)
      Alert.alert("Ops...!", "Não foi possível salvar o cliente.", [
        {
          text: "OK",
          style: "cancel",
        },
      ])
    }
  }

  if (loading) {
    return (
      <LottieView
        source={require("../../assets/loading/avocado-workout.json")}
        autoPlay
        loop
      />
    )
  }

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={"Novo Cliente"} icon={"users"} />
      {/* GoBack */}
        <View style={{alignItems: "center"}}>
          <ButtonGoBack
            name={"Voltar"}
            icon={"arrow-left"}
            navigate={"Clientes"}
          />
        </View>
        {/* Form */}
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.mb}>
            <Text style={styles.text}>Nome:</Text>
            <TextInput
              style={styles.input}
              value={newClient.name}
              onChangeText={(value) => handleChange({name: value})}
              autoFocus
            />
          </View>
          <View style={styles.mb}>
            <Text style={styles.text}>Telefone:</Text>
            <TextInput
              style={styles.input}
              value={newClient.phone}
              onChangeText={(value) => handleChange({phone: value})}
            />
          </View>
          <View style={styles.mb}>
            <Text style={styles.text}>CEP:</Text>
            <TextInput
              style={styles.input}
              value={newClient.cep}
              onChangeText={(value) => handleChange({cep: value})}
            />
          </View>
          <View style={styles.mb}>
            <Text style={styles.text}>Rua:</Text>
            <TextInput
              style={styles.input}
              value={newClient.street}
              onChangeText={(value) => handleChange({street: value})}
            />
          </View>
          <View style={styles.mb}>
            <Text style={styles.text}>Número:</Text>
            <TextInput
              style={styles.input}
              value={newClient.number}
              onChangeText={(value) => handleChange({number: value})}
            />
          </View>
          <View style={styles.mb}>
            <Text style={styles.text}>Bairro:</Text>
            <TextInput
              style={styles.input}
              value={newClient.district}
              onChangeText={(value) => handleChange({district: value})}
            />
          </View>
          <View style={styles.mb}>
            <Text style={styles.text}>Cidade:</Text>
            <TextInput
              style={styles.input}
              value={newClient.city}
              onChangeText={(value) => handleChange({city: value})}
            />
          </View>
          <View style={styles.mb}>
            <Button title="Salvar" style={styles.mb} onPress={onSubmit} />
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    borderRadius: 10,
    marginBottom: 20,
    shadowOpacity: 0.5,
    shadowColor: "black",
    marginHorizontal: 15,
    backgroundColor: "white",
    shadowOffset: {width: 0, height: 2},
  },
  text: {
    fontWeight: "bold",
    color: "#A7A8AE",
    marginBottom: 2,
  },
  row: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderColor: "#A7A8AE",
  },
  mb: {
    marginBottom: 30,
  },
})
