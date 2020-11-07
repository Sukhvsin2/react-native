import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import OurButton from "../components/OurButton";
import urls from "../../axios/config";
import axios from "axios";
import { getPhone, getToken } from "../../axios/auth";
// import { } from 

export default function AddMoney() {
    const [money, setmoney] = useState('')
    const [message, setmessage] = useState(false)
    async function addmoney() {
        setVisible(visible => visible = true);
        try {
            let phone = await getPhone();
            let token = await getToken();

            const data = {
                "phone": phone,
                "requiredBal": parseInt(money),
                "featureName": 4,
                "typeofTransaction": 3
            }
            console.log(data);
            console.log(token);
            let res = await axios.post(urls.BASE + 'master/walletTouser/transcation/', data, token);
            console.log('add money', res.data);
            setmessage(message => message = true);
            setInterval(() => {
                setmessage(message => message = false);
            }, 5000);
            setmoney(money => money = '');
            setVisible(visible => visible = false);
        } catch (error) {
            console.log(error.response.data);
            setVisible(visible => visible = false);
        }
    }
    
    const [visible, setVisible] = React.useState(false);

    return (
        <View style={styles.container}>
            {message ? <Text style={{textAlign: 'center'}}>Money Added Successfully</Text>: null}
            <TextInput keyboardType="numeric" style={styles.input} value={money} onChangeText={(val) => {
                setmoney(money => money = val);
            }} label="Enter Amount" />
            <OurButton title={visible ? 'wait...' :"add money"} funOnPress={() => {
                addmoney();
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20
    },
    input: {
        marginVertical: 20
    }
});
