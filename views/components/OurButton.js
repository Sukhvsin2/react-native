import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, StyleSheet } from "react-native";

export default function OurButton({title, funOnPress}) {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={funOnPress}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#72E207',
        borderRadius: 15,
        paddingHorizontal: 80,
        paddingVertical: 10,
        margin: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 25,
        color: '#fff',
        textTransform: 'capitalize'
    }
});