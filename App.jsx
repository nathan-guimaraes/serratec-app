import { NativeBaseProvider } from "native-base";
import React from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import Menu from './components/Menu';

export default function App() {
  return (
    <NativeBaseProvider>
      <Menu />
      <StatusBar
        backgroundColor="blue"
        style="light"
        barStyle="dark-content"
      />
    </NativeBaseProvider>
  );
}
