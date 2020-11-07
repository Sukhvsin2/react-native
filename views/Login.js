import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from "axios";
import urls from '../axios/config';
import { ErrorMessage, Formik } from "formik";
import { NavigationActions, StackActions } from "react-navigation";
import * as Yup from "yup";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "./components/Loader";

const { width: WIDTH } = Dimensions.get('window');


export default function Login({ navigation }) {
    const [visible, setvisible] = useState(false)

    async function loginCheck() {
        let login = await AsyncStorage.getItem('loggedIn');
        let getPin = await AsyncStorage.getItem('pin');
        console.log("check", getPin);
        if (login == 'true' && (getPin != 'false' || getPin != null)) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            navigation.dispatch(resetAction);
        }
     }

    useEffect(() => {
        loginCheck();
    }, [loginCheck])

    const validationSchema = Yup.object({
        phone: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    })

    return (
        <SafeAreaView style={styles.container}>
            <Loader message='Loggin In' loading={visible} />
            <View style={styles.imageBackground}>
                <Image style={styles.image} source={require('../assets/logo.png')}/>
            </View>
            <Formik
                initialValues={{ phone: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    setvisible(visible => visible = true);
                    const data = {
                        username: '232'+values.phone,
                        password: values.password,
                        deviceId: Constants.installationId,
                    }
                    axios.post(urls.BASE + 'user/login/', data).then(async res => {
                        console.log("res", res.data.token);
                        AsyncStorage.setItem('token', res.data.token);
                        AsyncStorage.setItem('phone', '232'+values.phone);
                        let pin = await AsyncStorage.getItem('pin');
                        let loggedIn = await AsyncStorage.getItem('loggedIn');
                        if (loggedIn == 'false') {
                            AsyncStorage.setItem('loggedIn', 'true');
                        }
                        
                        if (pin == null || pin =='false') {
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'PinScreen' })],
                            });
                            navigation.dispatch(resetAction)
                        } else {
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Home' })],
                            });
                            navigation.dispatch(resetAction);
                        }
                        setvisible(visible => visible = true);
                    }).catch(e => {
                        console.log('err',e.response.data);
                        setvisible(visible => visible = true);
                    });
                    resetForm({ phone: '', password: ''});
                }}
            >
                {
                    ({handleChange, handleBlur, handleSubmit, values}) => (
                        <View style={styles.form}>
                            <TextInput keyboardType={"number-pad"} style={styles.input} placeholder={'Phone'} onChangeText={handleChange('phone')} onBlur={handleBlur('phone')} value={values.phone}/>
                            <Text style={styles.error}>
                                <ErrorMessage name="phone" />
                            </Text>
                            <TextInput secureTextEntry={true} style={styles.input} placeholder={'Password'} onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
                            <Text style={styles.error}>
                                <ErrorMessage name="password" />
                            </Text>
                            <Button style={styles.button} mode="contained" onPress={handleSubmit}>
                                Login
                            </Button>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Register');
                            }} style={styles.create}>
                                <Text style={{fontSize: 16}}>Don't have an account? <Text style={{color: '#13C90D'}}>Create Account</Text></Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </Formik>
            <View></View>
            <View></View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-between'
    },
    form: {
        alignItems: "center",
    },
    imageBackground: {
        minHeight: 300,
        maxHeight: 600,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#13C90D',
    },
    image: {
        height: 250,
        width: 250
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        padding:10,
        color: '#000',
        marginVertical: 10,
        backgroundColor: '#f8f8f8',
    },
    button: {
        borderRadius: 25,
        paddingHorizontal: 25,
        paddingVertical: 5,
        backgroundColor: '#19D60D',
    },
    create: {
        marginVertical:20,
    },
    error: {
        color: 'red'
    }
});