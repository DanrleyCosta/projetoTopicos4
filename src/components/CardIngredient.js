import React, {useState} from "react"
import {View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native"
import {FontAwesome5} from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useNavigation} from "@react-navigation/native"

export default function CardIngredient(props) {
  const navigation = useNavigation()
  const [ingredients, setIngredients] = useState([])

  const removeIngredient = async (id) => {
    try {
      const storage = await AsyncStorage.getItem("ingredients")
      if (storage !== null) setIngredients(JSON.parse(storage))

      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id))
      await AsyncStorage.setItem("ingredients", JSON.stringify(ingredients))

      Alert.alert("Sucesso!", "O ingrediente foi removido com sucesso!", [
        {
          text: "OK",
          onPress: () =>
            navigation.reset({index: 0, routes: [{name: "Ingredientes"}]}),
        },
      ])
    } catch (err) {
      console.log(err)
      Alert.alert("Ops...!", "Não foi possível remover o ingrediente.", [
        {
          text: "OK",
          style: "cancel",
        },
      ])
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{marginRight: 20}}>
          <FontAwesome5 name="apple-alt" size={45} color="#2dce89" />
        </View>
        <View>
          <Text style={styles.text}>{props?.name}</Text>
        </View>
      </View>

      <View style={{alignItems: "flex-end"}}>
        <View style={styles.row}>
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() =>
              navigation.navigate("IngredientForm", {
                ingredient: props,
              })
            }
          >
            <FontAwesome5 name="edit" size={22} color="#5e72e4" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() => removeIngredient(props.id)}
          >
            <FontAwesome5 name="trash" size={22} color="#fb6340" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#172b4d",
  },
  row: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
})
