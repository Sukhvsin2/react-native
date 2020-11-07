import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { IconButton, Avatar } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import axios from "axios"
import urls from "../axios/config";
import { getToken, getPhone } from "../axios/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Home({navigation}) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [realBalance, setRealBalance] = useState(0);
    const [actualBalance, setActualBalance] = useState(0);
    const [history, setHistory] = useState(true);

    async function transactionHistory() {
        
        let phone = await getPhone();
        let token = await getToken();

        const data = {
            phone
        }
        console.log(data);
        console.log(token);
        axios.post(urls.BASE + 'user/homepage/transcationhistory/', data, token).then(res => {
            let message = res.data[0].TranscationDetails == [] ? true : res.data[0].TranscationDetails;
            setHistory(historyMessage => historyMessage = message);
        })
            .catch(e => console.log('err',e));
    }

    async function balance() {
        
        let phone = await getPhone();
        let token = await getToken();

        const data = {
            phone
        }
        axios.post(urls.BASE + 'user/realAndActualBalance/', data, token).then(
            res => {
                let arr = res.data.TranscationDetails;
                setActualBalance(bal => bal = arr[0].actualBalance);
                setRealBalance(bal => bal = arr[0].realBalance);
            }
        ).catch(
            e => console.log(e)
        );
    }

    useEffect(() => {
        balance();
        transactionHistory();
    }, [])

    const historyList = () => {
        let data = history;
        console.log(data);
        data = data.slice(0, 2);
        return data.map((element,i) => {
            return (
                <View style={styles.entries} key={`#${i}`}>
                    <Text>{element.type}</Text>
                    <Text>{element.from}</Text>
                    <Text>{element.amount}</Text>
                </View>
            );
        })
    }
    
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={
                        () => {
                            navigation.navigate('Profile');
                        }
                    }>
                        <Avatar.Image size={45} source={{ uri: 'https://images.unsplash.com/photo-1564552849-0a6640649261?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=500', }} />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <IconButton onPress={() => {
                            navigation.navigate('Scanner');
                        }} color="#fff" style={styles.icon} icon="qrcode"></IconButton>
                        <IconButton color="#fff" style={styles.icon} icon="bell"></IconButton>
                    </View>
                </View>
                <View style={styles.mainIcons}>
                    <View alignItems="center">
                        <IconButton onPress={() => {
                            navigation.navigate('Transfer');
                        }} size={30} style={{borderRadius: 10, backgroundColor: '#E5C35C'}} color="#fff" icon="telegram"></IconButton>
                        <Text style={styles.mainIconText}>Transfer</Text>
                    </View>
                    <View alignItems="center">
                        <IconButton onPress={() => {
                            navigation.navigate('Payment');
                        }} size={30} style={{borderRadius: 10, backgroundColor: '#E5C35C'}} color="#fff" icon="card"></IconButton>
                        <Text style={styles.mainIconText}>Pay</Text>
                    </View>
                    <View alignItems="center">
                        <IconButton size={30} style={{borderRadius: 10, backgroundColor: '#E5C35C'}} color="#fff" icon="wallet"></IconButton>
                        <Text style={styles.mainIconText}>Savings</Text>
                    </View>
                    <View alignItems="center">
                        <IconButton size={30} style={{borderRadius: 10, backgroundColor: '#E5C35C'}} color="#fff" icon="coin"></IconButton>
                        <Text style={styles.mainIconText}>Interest</Text>
                    </View>
                    <View alignItems="center">
                        <IconButton size={30} style={{borderRadius: 10, backgroundColor: '#E5C35C'}} color="#fff" icon="cash"></IconButton>
                        <Text style={styles.mainIconText}>Loan</Text>
                    </View>
                </View>
                <View style={styles.dashboard}>
                    <View style={{marginVertical: 10}} flexDirection="row" justifyContent="space-evenly">
                        <TouchableOpacity onPress={() => {
                                navigation.navigate('RealBalance', {
                                    money: realBalance
                                });
                            }}>
                                <BalanceContainer textcolor='#72E207' backgroundcolor='#fff' head='Real Balance' content={realBalance} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('ActualBalance', {
                                money: actualBalance
                            })
                        }}>
                            <BalanceContainer textcolor='#fff' backgroundcolor='#72E207' head='Actual Balance' content={actualBalance} />
                        </TouchableOpacity>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Searchbar
                        style={{borderRadius: 25}}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        />
                    </View>
                    <View style={styles.quickPay}>
                        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Instant Payment and Transfer</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Scanner');
                            }} style={{ maxWidth: 150, paddingVertical: 15, paddingHorizontal: 25, borderRadius: 25, marginTop: 10, alignSelf: 'flex-end', backgroundColor: '#fff' }}>
                            <Text>Quick Pay</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.frequent}>
                        <Text style={styles.frequentText}>Frequent Transactions</Text>
                        <Text style={{textAlign: 'center'}}>No Entries</Text>
                    </View>
                    <View style={styles.frequent}>
                        <Text style={styles.frequentText}>Transactions History</Text>
                        {history == true ? <ActivityIndicator color="red"/> :
                            <View>
                                {historyList()}
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Transactions', {
                                            entries: history
                                        });
                                    }}>
                                        <Text style={{textAlign: 'right', color: 'red'}}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const BalanceContainer = ({head, content, textcolor, backgroundcolor}) => {
    return (
        <View style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: '#ddd',
            shadowColor: '#000',
            backgroundColor: backgroundcolor,
            shadowOffset: { width: 0, height: 2 },
            paddingVertical: 20,
            paddingHorizontal: 40,
            borderRadius: 25,
            maxHeight: 100}}>
            <Text style={{color: textcolor, fontWeight: 'bold', fontSize: 18}}>{head}</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 8}}>$ {content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        backgroundColor: '#72E207',
        overflow: 'scroll'
    },
    header: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 12,
        justifyContent: "space-between"
    },
    icon: {
        marginHorizontal: 2,
        backgroundColor: "rgba(0,0,0,0)",
    },
    dashboard: {
        marginTop: 30,
        paddingVertical: 40,
        paddingHorizontal: 20,
        height: "100%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: 'white'
    },
    mainIcons: {
        marginVertical: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    mainIconText: {
        marginVertical: 5,
        color: 'white'
    },
    quickPay: {
        backgroundColor: '#72E207',
        borderRadius: 25,
        padding: 20,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    frequent: {
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 20,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    frequentText: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    entries: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 3,
        backgroundColor: '#dfe4ea',
        padding: 15
    }
});
