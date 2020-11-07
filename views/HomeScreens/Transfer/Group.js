import React from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { IconButton, TextInput } from 'react-native-paper';
import OurButton from "../../components/OurButton";
import axios from "axios";
import { getPhone, getToken } from "../../../axios/auth"
import urls from "../../../axios/config"
import Loader from "../../components/Loader";

export default function Group() {
    const [visible, setvisible] = React.useState(false)

    const [counter, setcounter] = React.useState(3);
    const [customFields, setcustomFields] = React.useState([
        {phone: '', amount: '', key: 1},
        {phone: '', amount: '', key: 2}
    ]);

    async function handleSubmit() {
        console.log(customFields);
        setvisible(visible => visible = true);
        try {
            let token = await getToken();
            let phone = await getPhone();
            const data = {
                senderphone: phone,
                data: customFields,
                typeofTransaction: 1,
                featureName: 1
            }
            let res = axios.post(urls.BASE + 'user/group/transcation/',data, token);
            console.log("grp",res.data);
            setvisible(false);
        } catch (error) {
            console.log(error.response.data);
            setvisible(false);
        }
     }

    function handleChange(index, name, value) {
        const values = [...customFields];
        values[index][name] = value;
        setcustomFields(values);
    }

    function addCustomField() {
        setcustomFields([...customFields, { phone: '', amount: '', key: counter }]);
        setcounter(counter => counter++);
    }

    function deleteCustomField() {
        if (customFields.length > 2) {
            const values = [...customFields];
            values.splice(-1, 1);
            setcustomFields(values);
        }
    }

    const renderItem = () => {
        return customFields.map((customField, key) => {
            return (
                <View key={key}>
                    <TextInput style={styles.input} maxLength={8} keyboardType="numeric" value={customField.phone}    onChangeText={event => handleChange(key, 'phone', event)} label="Phone Number"/>
                    <TextInput style={styles.input} label="Amount" keyboardType="numeric" value={customField.amount}    onChangeText={event => handleChange(key, 'amount', event)} />
                </View>
            )
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader message="Making Your Payment" loading={ visible }/>
            <View style={styles.container}>
                {
                    customFields.map((customField, key) => {
                        return (
                            <View key={key}>
                                <TextInput style={styles.input} maxLength={8} keyboardType="numeric" value={customField.toUser}    onChangeText={event => handleChange(key, 'toUser', event)} label="Phone Number"/>
                                <TextInput style={styles.input} label="Amount" keyboardType="numeric" value={customField.amount}    onChangeText={event => handleChange(key, 'amount', event)} />
                            </View>
                        )
                    })
                }
            </View>
            {/* <FlatList
                data={customFields}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            /> */}
                <View style={styles.options}>
                    <IconButton title="check" onPress={deleteCustomField} color="red" icon="minus"/>
                    <IconButton title="check" onPress={addCustomField} color="green" icon="plus"/>
                </View>
                <View style={{padding: 20}}>
                    <OurButton funOnPress={handleSubmit} title="Pay" />
                </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1
    },
    input: {
        margin: 5
    },
    error: {
        marginLeft: 20,
        color: 'red'
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})