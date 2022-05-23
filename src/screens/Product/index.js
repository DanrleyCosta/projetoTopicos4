import React, {useEffect, useState} from "react"
import {View, Text, ScrollView} from "react-native"
import LottieView from "lottie-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Header from "../../components/Header"
import TopBar from "../../components/TopBar"
import Button from "../../components/Button"
import CardProduct from "../../components/CardProduct"

export default function Product() {
  const [loading, setLoading] = useState()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const searchData = async () => {
      setLoading(true)
      // await AsyncStorage.removeItem("products")
      try {
        const storage = await AsyncStorage.getItem("products")
        if (storage !== null) setProducts(JSON.parse(storage))
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
        source={require("../../assets/loading/plate-of-food.json")}
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
        opacity: 0.5,
      }}
    >
      <LottieView
        source={require("../../assets/loading/plate-of-food.json")}
        autoPlay
        style={{width: "70%"}}
        speed={1.5}
        loop={false}
      />
      <Text marginTop={15} style={{fontWeight: "bold", color: "#637089"}}>
        Não existem produtos cadastrados
      </Text>
    </View>
  )

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={"Produtos"} icon={"concierge-bell"} />
      {/* Fim top bar */}

      <ScrollView style={{marginBottom: 10}}>
        <View style={{alignItems: "center", marginTop: 15}}>
          <Button
            name={"Adicionar Produto"}
            icon={"cart-plus"}
            navigate={"ProductForm"}
          />
        </View>
        {/* CardCreated */}

        {(products?.length >= 1 &&
          products?.map((product) => (
            <CardProduct
              key={product?.id}
              name={product?.name}
              ingredient={product.ingredients}
            />
          ))) ||
          noItens}
      </ScrollView>
    </>
  )
}
