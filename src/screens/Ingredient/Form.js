import React, {useState, useEffect, useCallback} from "react"
import {useNavigation} from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {View, StyleSheet, Text, TextInput, Button, Alert} from "react-native"
import LottieView from "lottie-react-native"

import Header from "../../components/Header"
import TopBar from "../../components/TopBar"
import ButtonGoBack from "../../components/Button"

export default function IngredientForm(props) {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [ingredients, setIngredients] = useState([])

  const [newIngredient, setNewIngredient] = useState({
    id: Math.random().toString().replace("0.", ""),
    name: ""
  })

  useEffect(() => {
    searchData()
  }, [])

  const searchData = async () => {
    try {
      const storage = await AsyncStorage.getItem("ingredients")
      if (storage !== null) setIngredients(JSON.parse(storage))
      setLoading(false)
    } catch (err) {
      console.log("Error: ", err)
      setLoading(false)
    }
  }

  const handleChange = useCallback(
    (value) => {
      setNewIngredient((state) => ({...state, ...value}))
    },
    [setNewIngredient]
  )

  const onSubmit = async () => {
    try {
      if (ingredients.length > 0) {
        ingredients.push(newIngredient)
        await AsyncStorage.setItem("ingredients", JSON.stringify(ingredients))
      } else {
        await AsyncStorage.setItem(
          "ingredients",
          JSON.stringify([newIngredient])
        )
      }
      Alert.alert("Sucesso!", "O ingrediente foi salvo com sucesso!", [
        {
          text: "OK",
          style: "cancel",
          onPress: () =>
            navigation.reset({index: 0, routes: [{name: "Ingredientes"}]}),
        },
      ])
    } catch (err) {
      console.log(err)
      Alert.alert("Ops...!", "Não foi possível salvar o ingrediente.", [
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
        source={require("../../assets/loading/avocad-bros.json")}
        autoPlay
        loop
      />
    )
  }

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={"Novo Ingrediente"} icon={"pepper-hot"} />
      {/* GoBack */}
      <View style={{alignItems: "center"}}>
        <ButtonGoBack
          name={"Voltar"}
          icon={"arrow-left"}
          navigate={"Ingredientes"}
        />
      </View>
      {/* Form */}
      <View style={styles.container}>
        <View style={styles.mb}>
          <Text style={styles.text}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={newIngredient.name}
            onChangeText={(value) => handleChange({name: value})}
            autoFocus
          />
        </View>
        <View style={styles.mb}>
          <Button title="Salvar" style={styles.mb} onPress={onSubmit} />
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
