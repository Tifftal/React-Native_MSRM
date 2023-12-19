import * as React from "react";
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import CatalogScreen from './screens/CatalogScreen';
import SampleScreen from './screens/SampleScreen';
import { Provider } from 'react-redux';
import { store } from "./toolkit";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Каталог' component={CatalogScreen} />
          <Stack.Screen name='Образец' component={SampleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
});
