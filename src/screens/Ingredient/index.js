import React, {useState, useEffect} from "react"
import {View, Text, ScrollView} from "react-native"

import {FontAwesome5} from "@expo/vector-icons"
import LottieView from "lottie-react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"

import Header from "../../components/Header"
import TopBar from "../../components/TopBar"
import CardIngredient from "../../components/CardIngredient"
import Button from "../../components/Button"

export default function Ingredient() {
  const [loading, setLoading] = useState()
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const searchData = async () => {
      setLoading(true)
      try {
        const storage = await AsyncStorage.getItem("ingredients")
        if (storage !== null) setIngredients(JSON.parse(storage))
        setLoading(false)
      } catch (err) {
        console.log("Error: ", err)
        setLoading(false)
      }
    }
    searchData()
  }, [])

  if (loading) {
    return (
      <LottieView
        source={require("../../assets/loading/avocad-bros.json")}
        autoPlay
        loop
      />
    )
  }

  const noItens = (
    <View
      style={{
        alignItems: "center",
        padding: 10,
        opacity: 0.5
      }}
    >
      <LottieView
        source={require("../../assets/loading/avocad-bros.json")}
        speed={1.5}
        autoPlay
        style={{width: "70%"}}
        loop={false}
      />
      <Text marginTop={15} style={{fontWeight: "bold", color: "#637089"}}>
        Não existem ingredientes cadastrados
      </Text>
    </View>
  )

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={"Ingredientes"} icon={"pepper-hot"} />
      {/* Fim top bar */}
      <ScrollView style={{marginBottom: 10}}>
        <View style={{alignItems: "center", marginTop: 15}}>
          <Button
            name={"Adicionar Ingredientes"}
            icon={"plus-circle"}
            navigate={"IngredientForm"}
          />
        </View>
        {/* CardCreated */}

        {(ingredients?.length >= 1 &&
          ingredients?.map((ingredient) => (
            <CardIngredient
              key={ingredient?.id}
              id={ingredient?.id}
              name={ingredient?.name}
              identifier={"ingredient"}
            />
          ))) ||
          noItens}
      </ScrollView>
    </>
  )
}
