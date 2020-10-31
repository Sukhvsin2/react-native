import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Login from "./views/Login";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Login/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
