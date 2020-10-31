import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, Platform } from 'react-native'
import { IconButton, Avatar, Button } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';

export default function Home() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Avatar.Image size={45} source={{ uri: 'https://images.unsplash.com/photo-1564552849-0a6640649261?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=500', }} />
                    <View style={styles.header}>
                        <IconButton color="#fff" style={styles.icon} icon="qrcode"></IconButton>
                        <IconButton color="#fff" style={styles.icon} icon="bell"></IconButton>
                        {/* <IconButton color="#fff" style={styles.icon} icon='dotsVertical'></IconButton> */}
                    </View>
                </View>
                <View style={styles.mainIcons}>
                    <View alignItems="center">
                        <IconButton size={30} style={{borderRadius: 10, backgroundColor: '#E5C35C'}} color="#fff" icon="telegram"></IconButton>
                        <Text style={styles.mainIconText}>Transfer</Text>
                    </View>
                    <View alignItems="center">
                        <IconButton size={30} style={{borderRadius: 10, backgroundColor: '#E5C35C'}} color="#fff" icon="card"></IconButton>
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
                        <BalanceContainer textcolor = '#72E207' backgroundcolor='#fff' head='Real Balance' content='200000'/>
                        <BalanceContainer textcolor='#fff' backgroundcolor='#72E207' head='Actual Balance' content='300000' />
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
                        <Text style={{color: '#fff', fontSize: 20}}>Instant Payment and Transfer</Text>
                        <Button mode="contained" color="red" uppercase={false} style={{ backgroundColor: '#fff', maxWidth: 150, paddingVertical: 3, borderRadius: 25, marginTop: 10}}>Quick Pay</Button>
                    </View>
                    <View style={styles.frequent}>
                        <Text>Frequent Transactions</Text>
                    </View>
                </View>
            </View>
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
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 8}}>${content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        backgroundColor: '#72E207'
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
    }
});
