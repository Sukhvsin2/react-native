import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextInput } from 'react-native-paper';
import OurButton from "../../components/OurButton";
import urls from "../../../axios/config";
import { getPhone, getToken } from "../../../axios/auth";
import axios from "axios";
import Loader from "../../components/Loader";

export default function Solo() {
    const [visible, setvisible] = React.useState(false)
    const validation = Yup.object({
        toUser: Yup.string().required('Required').min(8, 'Min 8'),
        amount: Yup.string().required('Required')
    })
    React.useEffect(() => {
        setvisible(visible => visible = false)
    }, [])
    return (
        <View style={styles.container}>
            <Formik initialValues={{ toUser: '', amount: '' }} validationSchema={validation} onSubmit={async (values,{ resetForm }) => {
                setvisible(visible => visible = true);
                let token = await getToken();
                let phone = await getPhone();
                const data = {
                    senderphone: phone,
                    reciverphone: values.toUser,
                    requiredBal: values.amount,
                    featureName: 1,
                    typeofTransaction: 1
                }
                try {
                    let res = await axios.post(urls.BASE + 'userToUser/transcation/', data, token);
                    console.log("res check", res.body)
                    setvisible(visible => visible = false)
                    resetForm();
                } catch (error) {
                    console.log(error.response.data);
                    setvisible(visible => visible = false)
                }
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
            <Text>{ visible }</Text>
            <Loader message="Sending Money" loading={ visible }/>
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