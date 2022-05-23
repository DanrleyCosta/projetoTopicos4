import React, {useState, useEffect} from "react"
import {View, StyleSheet, Text, FlatList} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Header from "../../components/Header"
import TopBar from "../../components/TopBar"
import ButtonGoBack from "../../components/Button"

export default function ProductView(props) {
  const values = props.route.params
  const [ingredients, setIngredients] = useState([])
  const [ingredientProduct, setIngredientProduct] = useState([])

  useEffect(() => {
    searchData()
  }, [])

  const searchData = async () => {
    try {
      const storage = await AsyncStorage.getItem("ingredients")
      if (storage !== null) setIngredients(JSON.parse(storage))

      const ingredient = values.product.ingredient
      ingredient.map((id) => {
        setIngredientProduct(ingredients.filter((i) => i.id === id))
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={"Detalhes do Produto"} icon={"eye"} />
      {/* Top bar */}

      <View style={styles.container}>
        <View style={styles.mb}>
          <Text style={styles.text}>Nome:</Text>
          <Text>{values.product.name}</Text>
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Ingredientes:</Text>
          <FlatList
            data={ingredientProduct}
            renderItem={({item}) => <Text style={styles.item}>* {item.name}</Text>}
          />
        </View>
        <View marginTop={30} style={{alignItems: "center"}}>
          <ButtonGoBack
            name={"Voltar"}
            icon={"arrow-left"}
            navigate={"Produtos"}
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
