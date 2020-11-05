import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from "axios";
import urls from '../axios/config';
import { ErrorMessage, Formik } from "formik";
import { NavigationActions, StackActions } from "react-navigation";
import DeviceInfo from 'react-native-device-info';
import * as Yup from "yup";


const { width: WIDTH } = Dimensions.get('window');


export default function Login({navigation}) { 

    const validationSchema = Yup.object({
        phone: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    })

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageBackground}>
                <Image style={styles.image} source={require('../assets/logo.png')}/>
            </View>
            <Formik
                initialValues={{ phone: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    let deviceId = '';
                    // DeviceInfo.getUniqueId().then(id => {
                    //     deviceId = id;
                    // });
                    const data = {
                        username: values.phone,
                        password: values.password,
                        // deviceId: id,
                    }
                    axios.post(urls + '/user/login/', data).then(res => console.log("res", res)).catch(e => console.log(e));
                    resetForm({ phone: '', password: ''});
                }}
            >
                {
                    ({handleChange, handleBlur, handleSubmit, values}) => (
                        <View style={styles.form}>
                            <TextInput style={styles.input} placeholder={'Phone'} onChangeText={handleChange('phone')} onBlur={handleBlur('phone')} value={values.phone}/>
                            <Text style={styles.error}>
                                <ErrorMessage name="phone" />
                            </Text>
                            <TextInput style={styles.input} placeholder={'Password'} onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
                            <Text style={styles.error}>
                                <ErrorMessage name="password" />
                            </Text>
                            <Button style={styles.button} mode="contained" onPress={handleSubmit}>
                                Login
                            </Button>
                            <TouchableOpacity onPress={() => {
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                });
                                navigation.dispatch(resetAction)
                            }} style={styles.create}>
                                <Text style={{fontSize: 16}}>Home</Text>
                            </TouchableOpacity>
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