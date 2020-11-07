import React from 'react'
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native'

export default function Loader({ message, loading }) {

    return (
        <Modal animationType="fade" transparent={true} visible={loading}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                        <ActivityIndicator color="red" size="large"/>
                        <Text>{message}</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
     centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
            marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
})