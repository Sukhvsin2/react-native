import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-paper'
import OurButton from "../components/OurButton";
import urls from "../../axios/config";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getPhone, getToken } from "../../axios/auth";

export default function UpdatePin() {
    const [visible, setVisible] = React.useState(false);
    const validationSchema = Yup.object({
        oldPin: Yup.string().required('Required'),
        newPin: Yup.string().required('Required')
    });
    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Formik initialValues={{ oldPin: '', newPin: '' }} validationSchema={validationSchema} onSubmit={async (values) => {
                    setVisible(visible => visible = true)
                    let token = await getToken();
                    let phone = await getPhone();
                    const data = {
                        phone: parseInt(phone),
                        newpin: parseInt(values.newPin),
                        oldpin: parseInt(values.oldPin)
                    }
                    console.log(data);
                    try {
                        let data = await axios.post(urls.BASE + 'user/update/transcationpin/', data, token);
                        console.log('updtae pin', data);
                        setVisible(visible => visible = false);
                    } catch (error) {
                        setVisible(visible => visible = false);
                        console.log(error.response.data);
                    }
                }}>
                    {
                        ({ handleSubmit, handleChange, handleBlur, values}) => (
                            <View>
                                <TextInput secureTextEntry={true} style={styles.input} maxLength={4} label="Old Pin" value={values.oldPin} onChangeText={handleChange('oldPin')} onBlur={handleBlur('oldPin')}/>
                                <Text style={styles.error}>
                                    <ErrorMessage name="oldPin" />
                                </Text>
                                <TextInput secureTextEntry={true} style={styles.input} maxLength={4} label="New Pin" value={values.newPin} onChangeText={handleChange('newPin')} onBlur={handleBlur('newPin')} />
                                <Text style={styles.error}>
                                    <ErrorMessage name="newPin" />
                                </Text>
                                <OurButton title="Save" funOnPress={handleSubmit} />
                            </View>
                        )
                    }
                </Formik>
            </View>
            <Modal animationType="fade" transparent={true} visible={visible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                            <ActivityIndicator color="red" size="large"/>
                            <Text>Updating Your Pin</Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
            marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
 
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
    input: {
        marginVertical: 20
    },
    error: {
        color: 'red'
    }
});