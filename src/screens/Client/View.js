import React from "react"
import {View, StyleSheet, Text} from "react-native"

import Header from "../../components/Header"
import TopBar from "../../components/TopBar"
import ButtonGoBack from "../../components/Button"

export default function ClientView(props) {
  const values = props.route.params

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={"Detalhes do Cliente"} icon={"user-secret"} />
      {/* Top bar */}

      <View style={styles.container}>
        <View style={styles.mb}>
          <Text style={styles.text}>Nome:</Text>
          <Text>{values.client.name}</Text>
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Telefone:</Text>
          <Text>{values.client.phone}</Text>
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>CEP:</Text>
          <Text>{values.client.cep}</Text>
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Rua:</Text>
          <Text>{values.client.street}</Text>
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Número:</Text>
          <Text>{values.client.number}</Text>
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Bairro:</Text>
          <Text>{values.client.district}</Text>
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Cidade:</Text>
          <Text>{values.client.city}</Text>
        </View>
        <View marginTop={30} style={{alignItems: "center"}}>
          <ButtonGoBack
            name={"Voltar"}
            icon={"arrow-left"}
            navigate={"Clientes"}
          />
        </View>
      </View>
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
  mb: {
    marginBottom: 30,
  },
})
