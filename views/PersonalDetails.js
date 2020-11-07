import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-paper'
import { getToken } from "../axios/auth";
import axios from "axios";
import urls from "../axios/config";
import Loader from "./components/Loader";

export default function PersonalDetails() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');

    async function getUserDetails() {
        let token = await getToken();
        const data = {
            token: token.headers.Authorization.split(" ")[1]
        }
        axios.post(urls.BASE + 'user/getuserDetails/', data).then(res => {
            const data = res.data['User Details'];
            setname(name => name = data[0].fullName);
            setemail(email => email = data[0].email);
            setphone(phone => phone = (data[0].phone));
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        getUserDetails();
    }, [getUserDetails])
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput value={name} style={styles.input} label="Name"/>
                <TextInput value={email} style={styles.input} label="Email"/>
                <TextInput value={`${phone}`} style={styles.input} label="Phone Number"/>
                <TouchableOpacity style={styles.button}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
            <Loader title="title" loading={true}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 50,
        flex: 1,
    },
    button: {
        alignItems: 'center',
        marginVertical: 30,
        backgroundColor: '#72E207',
        borderRadius: 25,
        width: '50%',
        paddingVertical: 10
    },
    input: {
        marginVertical: 5
    }
});