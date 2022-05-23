import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'

import Client from './screens/Client/index.js'
import ClientForm from './screens/Client/Form.js'
import ClientView from './screens/Client/View.js'

import Demand from './screens/Demand/index.js'
import DemandForm from './screens/Demand/Form.js'
import DemandView from './screens/Demand/View.js'

import Product from './screens/Product/index.js'
import ProductForm from './screens/Product/Form.js'
import ProductView from './screens/Product/View.js'

import Ingredient from './screens/Ingredient/index.js'
import IngredientForm from './screens/Ingredient/Form.js'

const Tab = createBottomTabNavigator()

export default function Routes(){
  const HideTabBarBottom = () => {
    return <View style={{display: 'none'}} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        activeTintColor: '#11C76F',
        tabStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
        style: {
          backgroundColor: '#FFF',
          borderTopColor: 'transparent',
          borderRadius: 4,
        },
      }}>

      <Tab.Screen
        name="Ingredientes"
        component={Ingredient}
        options={{
          headerTitle: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="pepper-hot" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="IngredientForm"
        component={IngredientForm}
        options={{
          tabBarButton: props => <HideTabBarBottom {...props} />,
        }}
      />

      <Tab.Screen
        name="Produtos"
        component={Product}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="concierge-bell" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="ProductForm"
        component={ProductForm}
        options={{
          tabBarButton: props => <HideTabBarBottom {...props} />,
        }}
      />

      <Tab.Screen
        name="ProductView"
        component={ProductView}
        options={{
          tabBarButton: props => <HideTabBarBottom {...props} />,
        }}
      /> 

      <Tab.Screen
        name="Clientes"
        component={Client}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="users" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="ClientForm"
        component={ClientForm}
        options={{
          tabBarButton: props => <HideTabBarBottom {...props} />,
        }}
      /> 

      <Tab.Screen
        name="ClientView"
        component={ClientView}
        options={{
          tabBarButton: props => <HideTabBarBottom {...props} />,
        }}
      /> 

      <Tab.Screen
        name="Pedidos"
        component={Demand}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="receipt" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="DemandForm"
        component={DemandForm}
        options={{
          tabBarButton: props => <HideTabBarBottom {...props} />,
        }}
      /> 

      <Tab.Screen
        name="DemandView"
        component={DemandView}
        options={{
          tabBarButton: props => <HideTabBarBottom {...props} />,
        }}
      /> 

    </Tab.Navigator>
  )
}