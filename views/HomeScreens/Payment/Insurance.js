import Axios from 'axios';
import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IconButton, List } from "react-native-paper"
// import {Picker} from '@react-native-picker/picker'
import { Checkbox } from 'react-native-paper';
import urls from '../../../axios/config';
import { getToken } from "../../../axios/auth";

export default function Insurance() {
    // const [options, setoptions] = React.useState({
    //     selected: ''
    // })
    const [insurance, setinsurance] = useState('unchecked');
    
    const [license, setlicense] = useState('unchecked');

    async function list() {
        try {
            console.log('ajkhv');
            let token = await getToken();
            const data = {
                vehicalOptions: insurance == 'checked' ? 'insurance' : 'license',
                typeofVehical: 'bike'
            }
            let res = await Axios.post(urls.BASE + "user/amountAndRate/dropdown/", data, token)
            console.log("chec", res.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <View style={styles.container}>
            {/* <Text>{options.selected}</Text> */}
            <Checkbox.Item label="Insurance" onPress={() => {
                let data = insurance == 'checked' ? 'unchecked' : 'checked'
                setinsurance(insurance => insurance = data);
            }} status={ insurance }/>
            <Checkbox.Item label="License" onPress={() => {
                let data = license == 'checked' ? 'unchecked' : 'checked'
                setlicense(license => license = data);
            }} status={ license }/>
            <IconButton color="green" onPress={() => {
                list();
            }} icon="gift"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})