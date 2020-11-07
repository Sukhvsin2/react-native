import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import OurButton from "../../components/OurButton"

export default function Payment({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Payment</Text>
            <OurButton funOnPress={() => {
                navigation.navigate('Insurance');
            }} title="license & Insurance"/>
            <OurButton funOnPress={() => {
                navigation.navigate('Esda');
            }} title="EDSATransaction" />
            <OurButton funOnPress={() => {
                navigation.navigate('FlexPay');
            }} title="flexpay"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})