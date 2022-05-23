import React, {useState, useEffect, useCallback} from "react";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, StyleSheet, Text, Button, Alert, Picker} from "react-native";
import LottieView from "lottie-react-native";
import MultiSelect from 'react-native-multiple-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons'

import Header from "../../components/Header";
import TopBar from "../../components/TopBar";
import ButtonGoBack from "../../components/Button";

export default function DemandForm(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [demands, setDemands] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [newDemand, setNewDemand] = useState({
    id: Math.random().toString().replace("0.", ""),
    client: [],
    products: [],
  });

console.log(date)

  useEffect(() => {
    searchData();
  }, []);

  const searchData = async () => {
    try {
      const storage = await AsyncStorage.getItem("demands");
      if (storage !== null) setDemands(JSON.parse(storage));

      const storageCliente = await AsyncStorage.getItem("clients");
      if (storageCliente !== null) setClients(JSON.parse(storageCliente));

      const storageProduct = await AsyncStorage.getItem("products");
      if (storageProduct !== null) setProducts(JSON.parse(storageProduct));
      setLoading(false);
    } catch (err) {
      console.log("Error: ", err);
      setLoading(false);
    }
  };

  const handleChange = useCallback(
    (value) => {
      setNewDemand((state) => ({...state, ...value}));
    },
    [setNewDemand]
  );

  const onSubmit = async () => {
    try {
      if (demands.length > 0) {
        let data = {...newDemand, delivery: date}
        demands.push(data);
        await AsyncStorage.setItem("demands", JSON.stringify(demands));
      } else {
        let data = {...newDemand, delivery: date}
        await AsyncStorage.setItem(
          "demands",
          JSON.stringify([data])
        );
      }
      Alert.alert("Sucesso!", "O pedido foi salvo com sucesso!", [
        {
          text: "OK",
          style: "cancel",
          onPress: () =>
            navigation.reset({index: 0, routes: [{name: "Pedidos"}]}),
        },
      ]);
    } catch (err) {
      console.log(err);
      Alert.alert("Ops...!", "Não foi possível salvar o pedido.", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
  };

  if (loading) {
    return (
      <LottieView
        source={require("../../assets/loading/receipt.json")}
        autoPlay
        loop
      />
    );
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={"Novo Pedido"} icon={"concierge-bell"} />
      {/* GoBack */}
      <View style={{alignItems: "center"}}>
        <ButtonGoBack
          name={"Voltar"}
          icon={"arrow-left"}
          navigate={"Pedidos"}
        />
      </View>
      {/* Form */}
      <View style={styles.container}>
        <View style={styles.mb}>
          <Text style={styles.text}>Selecione o cliente:</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={newDemand.client}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) => handleChange({client: itemValue})}
            >
              {(clients?.length >= 1 &&
                clients?.map((client) => (
                  <Picker.Item key={client?.id} label={client?.name} value={client} />
                ))) ||
                console.log("Sem clientes")}
            </Picker>
          </View>
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Selecione os produtos:</Text>
          <MultiSelect
            uniqueKey="id"
            items={products}
            onSelectedItemsChange={(value) => handleChange({products: value})}
            selectedItems={newDemand.products}
            searchInputPlaceholderText="Procurar..."
            tagRemoveIconColor="red"
            tagBorderColor="green"
            tagTextColor="green"
            selectedItemTextColor="green"
            selectedItemIconColor="green"
            itemTextColor="black"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="green"
            submitButtonText="Escolher"
          />
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Selecione a data de entrega:</Text>
          <View style={styles.input}>
            <Text style={styles.text}>
              {JSON.stringify(date).replace(/^"/, '').split("T", 1).reverse()} {''} {''}
              {JSON.stringify(date).split(/T(.+)/)[1].split(".", 1)}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', transform: [{translateY: -35}]}}>
            <View style={styles.row}>
              <FontAwesome5
                name="calendar-alt"
                onPress={showDatepicker}
                size={25}
                style={{paddingHorizontal: 10}}
                color="#637089"
              />
              <FontAwesome5
                name="clock"
                onPress={showTimepicker}
                size={25}
                style={{paddingHorizontal: 10}}
                color="#637089"
              />
            </View>
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
          
        </View>
        <View style={styles.mb}>
          <Button title="Salvar" style={styles.mb} onPress={onSubmit} />
        </View>
      </View>
    </>
  );
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
    borderBottomWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "#A7A8AE",
  },
  mb: {
    marginBottom: 30,
  },
});
