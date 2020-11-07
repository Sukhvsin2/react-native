import Axios from 'axios';
import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import OurButton from "../../components/OurButton";
import urls from "../../../axios/config";
import { getToken, getPhone } from "../../../axios/auth";
import Loader from "../../components/Loader";

export default function ESDA() {
    const [meter, setmeter] = useState('');
    const [amount, setamount] = useState('')
    const [visible, setvisible] = useState(false)
    
    async function submit() {
        setvisible(true)
        let token = await getToken();
        let phone = await getPhone();
        const data = {
            phone,
            amount,
            featureName: 1,
            typeofTransaction: 1,
            meterNumber: meter
        }

        try {
            let res = await Axios.post(urls.BASE + 'userPayment/EDSATransaction/', data, token);
            console.log("res", res.body);
            setvisible(false)
        } catch (error) {
            console.log('====================================');
            console.log(error.response.data);
            console.log('====================================');
            setvisible(false)
        }
    }

    return (
        <View style={styles.container}>
            <Loader message="Wait" loading={visible }/>
            <Text>ESDA</Text>
            <TextInput label="Meter" onChangeText={(val) => {
                setmeter(val)
            }} value={meter} keyboardType="numeric"/>
            <TextInput label="Amount" onChangeText={(val) => {
                setamount(val)
            }} value={amount} keyboardType="numeric" />
            <OurButton title="Pay" funOnPress={ submit }/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
        margin: 25
    }
})