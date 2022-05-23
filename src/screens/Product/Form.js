import React, {useState, useEffect, useCallback} from "react";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, StyleSheet, Text, TextInput, Button, Alert} from "react-native";
import LottieView from "lottie-react-native";
import MultiSelect from 'react-native-multiple-select';

import Header from "../../components/Header";
import TopBar from "../../components/TopBar";
import ButtonGoBack from "../../components/Button";

export default function ProductForm(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: Math.random().toString().replace("0.", ""),
    name: "",
    ingredients: [],
  });

  useEffect(() => {
    searchData();
  }, []);

  const searchData = async () => {
    try {
      const storage = await AsyncStorage.getItem("products");
      if (storage !== null) setProducts(JSON.parse(storage));

      const storageIngredient = await AsyncStorage.getItem("ingredients");
      if (storageIngredient !== null) setIngredients(JSON.parse(storageIngredient));
      setLoading(false);
    } catch (err) {
      console.log("Error: ", err);
      setLoading(false);
    }
  };

  const handleChange = useCallback(
    (value) => {
      setNewProduct((state) => ({...state, ...value}));
    },
    [setNewProduct]
  );

  const onSubmit = async () => {
    try {
      if (products.length > 0) {
        products.push(newProduct);
        await AsyncStorage.setItem("products", JSON.stringify(products));
      } else {
        await AsyncStorage.setItem(
          "products",
          JSON.stringify([newProduct])
        );
      }
      Alert.alert("Sucesso!", "O produto foi salvo com sucesso!", [
        {
          text: "OK",
          style: "cancel",
          onPress: () =>
            navigation.reset({index: 0, routes: [{name: "Produtos"}]}),
        },
      ]);
    } catch (err) {
      console.log(err);
      Alert.alert("Ops...!", "Não foi possível salvar o produto.", [
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
        source={require("../../assets/loading/plate-of-food.json")}
        autoPlay
        loop
      />
    );
  }

  return (
    <>
      {/* Top bar */}
      <Header />
      <TopBar name={"Novo Produto"} icon={"concierge-bell"} />
      {/* GoBack */}
      <View style={{alignItems: "center"}}>
        <ButtonGoBack
          name={"Voltar"}
          icon={"arrow-left"}
          navigate={"Produtos"}
        />
      </View>
      {/* Form */}
      <View style={styles.container}>
        <View style={styles.mb}>
          <Text style={styles.text}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={newProduct.name}
            onChangeText={(value) => handleChange({name: value})}
            autoFocus
          />
        </View>
        <View style={styles.mb}>
          <Text style={styles.text}>Ingredientes:</Text>
          <MultiSelect
            uniqueKey="id"
            items={ingredients}
            onSelectedItemsChange={(value) => handleChange({ingredients: value})}
            selectedItems={newProduct.ingredients}
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
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderColor: "#A7A8AE",
  },
  mb: {
    marginBottom: 30,
  },
});
