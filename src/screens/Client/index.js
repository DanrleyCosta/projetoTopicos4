import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView } from 'react-native'
import LottieView from 'lottie-react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"

import Header from '../../components/Header'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'
import CardClient from '../../components/CardClient'

export default function Client(){
  const [loading, setLoading] = useState()
  const [clients, setClients] = useState([])

  useEffect(() => {
    const searchData = async () => {
      setLoading(true)
      // await AsyncStorage.removeItem("clients")
      try {
        const storage = await AsyncStorage.getItem('clients')
        if (storage !== null) setClients(JSON.parse(storage));
        setLoading(false)
      } catch (err) {
        console.log('Error: ', err)
        setLoading(false)
      }
    }
    searchData()
  }, [])

  if (loading) {
    return (
      <LottieView
        source={require('../../assets/loading/avocado-workout.json')}
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
        source={require("../../assets/loading/avocado-workout.json")}
        autoPlay
        speed={1.5}
        style={{width: "70%"}}
        loop={false}
      />
      <Text marginTop={15} style={{fontWeight: "bold", color: "#637089"}}>
        Não existem clientes cadastrados
      </Text>
    </View>
  )

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={'Clientes'} icon={'users'} />
      {/* Fim top bar */}

      <ScrollView style={{marginBottom: 10}}>
        <View style={{alignItems:'center', marginTop: 15}}>
          <Button name={'Adicionar cliente'} icon={'user-plus'} navigate={'ClientForm'} />
        </View>
        {/* CardCreated */}

        {(clients?.length >= 1 &&
          clients?.map((client) => (
            <CardClient
              key={client?.id}
              name={client.name}
              phone={client.phone}
              cep={client.cep}
              street={client.street}
              number={client.number}
              district={client.district}
              city={client.city}
            />
          ))) ||
          noItens}
      </ScrollView>
    </>
  );
}