import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Navigator from "./Routes/homeStack";

export default function App() {
  return (
    <Navigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
