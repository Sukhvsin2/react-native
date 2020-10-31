import React from 'react';
import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';


const Login = () => (
    <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')}/>
        <Text>Login</Text>
     </SafeAreaView>
);

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        minHeight: 300,
        maxHeight: 500,
        width: '100%',
        backgroundColor: 'red',
    }
});