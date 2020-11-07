import React from 'react'
import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { IconButton, TextInput } from 'react-native-paper';
import OurButton from "../../components/OurButton";

export default function Group() {

    const [counter, setcounter] = React.useState(3);
    const [customFields, setcustomFields] = React.useState([
        {toUser: 'check', amount: '', key: 1},
        {toUser: '', amount: '', key: 2}
    ]);

    function handleSubmit() {
        console.log(customFields);
     }

    function handleChange(index, name, value) {
        const values = [...customFields];
        values[index][name] = value;
        setcustomFields(values);
    }

    function addCustomField() {
        setcustomFields([...customFields, { toUser: '', amount: '', key: counter }]);
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
                    <TextInput style={styles.input} maxLength={8} keyboardType="numeric" value={customField.toUser}    onChangeText={event => handleChange(key, 'toUser', event)} label="Phone Number"/>
                    <TextInput style={styles.input} label="Amount" keyboardType="numeric" value={customField.amount}    onChangeText={event => handleChange(key, 'amount', event)} />
                </View>
            )
        })
    }

    return (
        <SafeAreaView style={styles.container}>
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