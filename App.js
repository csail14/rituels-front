import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RequireAuth from './helpers/require-auth';
import { Provider } from "react-redux";
import store from './store';



export default function App() {
  return (
    <View style={styles.container}>
        <Provider store={store}>
          <RequireAuth />
        </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
