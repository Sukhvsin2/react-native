import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function AllTransactions({ navigation }) {
    let { entries } = navigation.state.params;
    const historyList = () => {
        return entries.map((element,i) => {
            return (
                <View style={styles.entries} key={`#${i}`}>
                    <Text>{element.type}</Text>
                    <Text>{element.from}</Text>
                    <Text>{element.amount}</Text>
                </View>
            );
        })
    }
    return (
        <View>
            <View>
                {historyList()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    entries: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10,
        backgroundColor: '#dfe4ea',
        padding: 25
    }
});