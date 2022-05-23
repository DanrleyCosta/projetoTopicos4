import React, {useState, useEffect} from "react"
import {View, StyleSheet, Text, FlatList} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Header from "../../components/Header"
import TopBar from "../../components/TopBar"
import ButtonGoBack from "../../components/Button"

export default function DemandView(props) {
  const values = props.route.params
  const [products, setProducts] = useState([])
  const [productDemand, setProductDemand] = useState([])

  useEffect(() => {
    const searchData = async () => {
      try {
        const storage = await AsyncStorage.getItem("products")
        if (storage !== null) setProducts(JSON.parse(storage))

        const prodValues = values.demand.products
        prodValues.map((id) => {
          setProductDemand(products.filter((product) => product.id === id))
        })
        console.log(productDemand)
      } catch (err) {
        console.log(err)
      }
    }
    searchData()
  }, [])

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={"Detalhes do Pedido"} icon={"eye"} />
      {/* Top bar */}

      <View style={styles.container}>
        <View style={styles.mb}>
          <Text style={styles.text}>Nome:</Text>
          <Text>{values.demand.name}</Text>
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Produtos:</Text>
          <FlatList
            data={productDemand}
            renderItem={({item}) => <Text style={styles.item}>* {item.name}</Text>}
          />
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Entrega:</Text>
          <Text>
            {values.demand.delivery.split("T", 1).reverse()} {''} {''}
            {values.demand.delivery.split(/T(.+)/)[1].split(".", 1)}
          </Text>
        </View>
        <View marginTop={30} style={{alignItems: "center"}}>
          <ButtonGoBack
            name={"Voltar"}
            icon={"arrow-left"}
            navigate={"Pedidos"}
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
  item: {
    padding: 10,
    fontSize: 15,
    height: 44,
  }
})
