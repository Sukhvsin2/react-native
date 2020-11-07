import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, {useState, useRef} from 'react'
import { SafeAreaView, View, Text, StyleSheet, Platform, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from "react-native-paper"
import urls from "../axios/config";
import { StackActions, NavigationActions } from "react-navigation";

export default function CreatePin() {
        const [pin1, setPin1] = useState('')
        const [pin2, setPin2] = useState('')
        const [pin3, setPin3] = useState('')
        const [pin4, setPin4] = useState('')
        const ref1 = useRef('Pin1')
        const ref2 = useRef('Pin2')
        const ref3 = useRef('Pin3')
        const ref4 = useRef('Pin4')
        
    async function setPinApi() { 
        let phone = await AsyncStorage.getItem('phone');
        let token = await AsyncStorage.getItem('token');
        const conf = {
            headers: {
                Authorization: 'Token ' + token
            }
        }
        const data = {
            phone,
            transactionPin: `${pin1}${pin2}${pin3}${pin4}`
        }
        console.log(data);
        console.log(conf);
        axios.post(urls.BASE + 'user/create/transcationpin/', data, conf).then(res => {
            console.log('res', res);
            AsyncStorage.setItem('pin', `${pin1}${pin2}${pin3}${pin4}`);
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            navigation.dispatch(resetAction);
        }).catch(e => console.log(e));
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container1}>
                <View style={styles.container}>
                    <Text style={styles.containerText}>Create Your Pin</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput autoFocus={true} ref={ref1} value={pin1} onChangeText={(text) => {
                        setPin1(pin1 => pin1 = text);
                     }} maxLength={1} style={styles.input}/>
                    <TextInput ref={ref2} value={pin2} onChangeText={(text) => {
                        setPin2(pin2 => pin2 = text); 
                     }}  maxLength={1} style={styles.input}/>
                    <TextInput ref={ref3} value={pin3} onChangeText={(text) => {
                        setPin3(pin3 => pin3 = text); 
                     }}  maxLength={1} style={styles.input}/>
                    <TextInput ref={ref4} value={pin4} onChangeText={(text) => {
                        setPin4(pin4 => pin4 = text); 
                     }}  maxLength={1} style={styles.input}/>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={setPinApi}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    input: {
        width: 50,
        textAlign: 'center',
        marginHorizontal: 20,
        fontSize: 20,
        padding: 5,
    },
    container1: {
        flex: 0.6,
        justifyContent: 'center',
         alignItems: 'center'
    },
    container: {
         marginVertical: 20
    },
    containerText: {
        fontSize: 20,
    },
    button: {
        backgroundColor: 'red',
        marginVertical: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25
    },
    buttonText: {
        color: '#fff'
    }
});