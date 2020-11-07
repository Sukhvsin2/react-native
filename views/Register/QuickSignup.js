import React,{useState} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import {  TextInput } from 'react-native-paper';
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import axios from 'axios';
import urls from '../../axios/config';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';


const { width: WIDTH } = Dimensions.get('window');



export default function QuickSignup() {
    const validationSchema = Yup.object({
        fullname: Yup.string().required('Required'),
        email: Yup.string().email().required('Required'),
        phone: Yup.number().required('Required'),
        password: Yup.string().min(8,'Minimum 8 ').required('Required'),
        confirmPass: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match')
    });
        
    const [visible, setVisible] = useState(false);
    function hideDialog() { 
        setVisible(visible => visible = false);
    }

    return (
        <View style={{ flex: 1, maxHeight: 500}}>
            <Formik enableReinitialize initialValues={{
                fullname : '',
                email : "",
                phone : "",
                password : "",
                confirmPass : ""
            }} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => {
                console.log(values);
                const data = {
                    fullName: '+232'+values.fullname,
                    email: values.email,
                    phone: values.phone,
                    password: values.password,
                    heard_by: 'news',
                    answer1: 'aswer1',
                    answer2: 'answer2'
                }
                axios.post(urls.BASE + '/user/quicksignup/', data).then(res => {
                    console.log("res",res);
                    if (res.status) {
                        console.log(res);
                        setVisible(visible => visible = true);
                        resetForm({fullName: '', phone: '', email: '', password: '', confirmPass: '',});
                    }
                }).catch(e =>
                    console.log("err",e));
                
            }}>
                {({handleChange, handleBlur, values, handleSubmit}) => (
                    <View>
                        <TextInput name="fullname" id="fullname" style={styles.input} label="Fullname" onChangeText={handleChange('fullname')} onBlur={handleBlur('fullname')} value={values.fullname}/>
                        <Text style={styles.error}><ErrorMessage name="fullname" /></Text>

                        <TextInput name="email" style={styles.input} label="Email" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
                        <Text style={styles.error}><ErrorMessage name="email" /></Text>


                        <TextInput name="phone" style={styles.input} label="Phone" keyboardType='numeric' onChangeText={handleChange('phone')} onBlur={handleBlur('phone')} value={values.phone} />
                        <Text style={styles.error}><ErrorMessage name="phone" /></Text>


                        <TextInput secureTextEntry={true} name="password" style={styles.input} label="Password" onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
                        <Text style={styles.error}><ErrorMessage name="password" /></Text>


                        <TextInput secureTextEntry={true} name="confirmPass" style={styles.input} label="Confirm Password" onChangeText={handleChange('confirmPass')} onBlur={handleBlur('confirmPass')} value={values.confirmPass} />
                        <Text style={styles.error}><ErrorMessage name="confirmPass" /></Text>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <View style={styles.buttontext}>
                                <Text style={styles.buttontext}>Register</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                 )}
            </Formik>
            <Provider>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Actions>
                            <Text>Registration Done</Text>
                            <Button onPress={hideDialog}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Provider>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        width: WIDTH - 55,
        padding: 5,
        backgroundColor: '#fff',
        marginVertical: 10,
        color: '#19D60D'
    },
    button: {
        borderRadius: 25,
        paddingHorizontal: 25,
        paddingVertical: 5,
        backgroundColor: '#19D60D',
    },
    buttontext: {
        marginHorizontal: "auto",
        color: "#fff",
        fontSize: 18,
        textAlign: "center"
    },
    error: {
        color: 'red'
    }
});