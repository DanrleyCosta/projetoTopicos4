import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, SafeAreaView } from '@react-navigation/native';

import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <Routes />
    </NavigationContainer>
  );
}

// UTILIZE SEU DISPOSITIVO MOVEL PARA TESTAR, A VERSAO WEB NAO SUPORTA OS COMPONENTES UTILIZADOS
// IGNORE ESSE ERRO, LENDO O QRCODE FUNCIONA PERFEITAMENTE