import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import OurButton from "../components/OurButton";

export default function RealBalance({ navigation }) {
    const { money } = navigation.state.params;
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>
                     Your Wallet Balance is {money}.
                </Text>
            </View>
            <View>
                <OurButton title="Add Money" funOnPress={() => {
                    navigation.navigate('AddMoney');
                }} />
                {/* <OurButton title="Create Pin" funOnPress={() => {
                    console.log("check");
                }} /> */}
                <OurButton title="Update Pin" funOnPress={() => {
                    navigation.navigate('UpdatePin');
                }}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    text: {
        fontSize: 35
    }
});