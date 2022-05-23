import React, {useEffect, useState} from "react"
import {View, Text, ScrollView} from "react-native"
import LottieView from "lottie-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Header from "../../components/Header"
import TopBar from "../../components/TopBar"
import Button from "../../components/Button"
import CardDemand from "../../components/CardDemand"

export default function Demand() {
  const [loading, setLoading] = useState()
  const [demands, setDemands] = useState([])

  useEffect(() => {
    const searchData = async () => {
      // await AsyncStorage.removeItem('demands') // remove geral
      setLoading(true)
      try {
        const storage = await AsyncStorage.getItem("demands")
        if (storage !== null) setDemands(JSON.parse(storage))
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
        source={require("../../assets/loading/receipt.json")}
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
        source={require("../../assets/loading/receipt.json")}
        autoPlay
        speed={1.5}
        style={{width: "70%"}}
        loop={false}
      />
      <Text marginTop={15} style={{fontWeight: "bold", color: "#637089"}}>
        Não existem pedidos cadastrados
      </Text>
    </View>
  )

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={"Pedidos"} icon={"receipt"} />
      {/* Fim top bar */}

      <ScrollView style={{marginBottom: 10}}>
        <View style={{alignItems: "center", marginTop: 15}}>
          <Button
            name={"Adicionar pedido"}
            icon={"calendar-plus"}
            navigate={"DemandForm"}
          />
        </View>
        {/* CardCreated */}

        {(demands?.length >= 1 &&
          demands?.map((demand) => (
            <CardDemand
              key={demand?.id}
              name={demand.client.name}
              products={demand.products}
              delivery={demand.delivery}
              identifier={"demand"}
            />
          ))) ||
          noItens}
      </ScrollView>
    </>
  )
}
