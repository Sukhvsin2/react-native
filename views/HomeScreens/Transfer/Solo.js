import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextInput } from 'react-native-paper';
import OurButton from "../../components/OurButton";

export default function Solo() {
    const validation = Yup.object({
        toUser: Yup.string().required('Required').min(8, 'Min 8'),
        amount: Yup.string().required('Required')
    })
    return (
        <View style={styles.container}>
            <Formik initialValues={{ toUser: '', amount: '' }} validationSchema={validation} onSubmit={(values) => {
                console.log(values);
            }}>
                {
                    ({handleSubmit, handleChange, handleBlur, values}) => (
                        <View style={styles.container}>
                            <TextInput style={styles.input} maxLength={8} keyboardType="numeric" value={values.toUser} label="Phone Number" onChangeText={handleChange('toUser')} onBlur={ handleBlur('toUser') }/>
                            <Text style={styles.error}><ErrorMessage name="toUser"/></Text>
                            <TextInput style={styles.input} label="Amount" keyboardType="numeric" value={values.amount} onChangeText={handleChange('amount')} onBlur={handleBlur('amount')} />
                            <Text style={styles.error}><ErrorMessage name="amount"/></Text>
                            <View style={{padding: 20}}>
                                <OurButton title="Pay" funOnPress={ handleSubmit }/>
                            </View>
                        </View>
                    )
                }
            </Formik>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    input: {
        margin: 15
    },
    error: {
        marginLeft: 20,
        color: 'red'
    }
})