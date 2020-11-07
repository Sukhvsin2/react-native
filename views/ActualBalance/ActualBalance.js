import React, {useEffect, useState} from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import axios from "axios"
import urls from "../../axios/config";
import { getPhone, getToken } from "../../axios/auth";

export default function ActualBalance({ navigation }) {
    const { money } = navigation.state.params;
    const [savings, setSavings] = useState([])
    
    async function transactionsHistory() {
        let token = await getToken();
        let phone = await getPhone();

        const data = {
            phone
        }

        try {
            let res = await axios.post(urls.BASE + 'user/listOfSavingHistory/', data, token);
            console.log('res', res.data);
            if (res.data.TranscationDetails != undefined) {
                setSavings(saving => saving = res.data.TranscationDetails);
            }

        } catch (error) {
            console.log(error.response.data);
        }

        console.log("Cehck ",savings);
     }

    function savingList() {
        return savings.map((val, i) => {
            return <View key={`#${i}`}>
                <Text>{val.savingType}</Text>
                <Text>{val.amount}</Text>
                <Text>{val.phone}</Text>
            </View>
        })
     }

    useEffect(() => {
        transactionsHistory();
    }, [transactionsHistory])
    return (
        <ScrollView>
            <View style={styles.balance}>
                <Text style={{textAlign: 'center', fontSize: 20}}>Your Actuall Balance is {money}</Text>
            </View>
            <View style={styles.saving}>
                <Text style={styles.heading}>Savings</Text>
                {savings.length != 0 ? <View>
                    {savingList()}
                </View> : <Text style={{textAlign: 'center', marginVertical: 20}}>
                    No Savings
                </Text>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    balance: {
        marginVertical: 20
    },
    saving: {
        margin: 20
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});