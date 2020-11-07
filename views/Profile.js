import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, List } from "react-native-paper"
import { StackActions, NavigationActions } from "react-navigation"


export default function Profile({navigation}) {
    return (
        <View style={styles.safeArea}>
            <View style={styles.profile}>
                <Text style={{fontSize: 30}}>Profile</Text>
                <Avatar.Image  size={100} source={{ uri: 'https://images.unsplash.com/photo-1564552849-0a6640649261?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=500', }} />
            </View>
            <View style={{width: '50%'}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('PersonalDetails');
                }}>
                    <List.Item
                        
                        title="Personal Details"
                        left={props => <List.Icon icon="folder" />}
                    />
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <List.Item
                        
                        title="Invite & Earn"
                        left={props => <List.Icon icon="gift" />}
                        />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List.Item
                        
                        title="Settings"
                        left={props => <List.Icon icon="settings" />}
                        />
                </TouchableOpacity>
                {/* <TouchableOpacity>
                    <List.Item
                        
                        title="Help & Feedback"
                        left={props => <List.Icon icon="support" />}
                        />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={
                    () => {
                        AsyncStorage.setItem('loggedIn', 'false');
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Login' })],
                        });
                        navigation.dispatch(resetAction);
                    }
                }>
                    <List.Item
                        
                        title="Logout"
                        left={props => <List.Icon icon="logout" />}
                        />
                </TouchableOpacity> 
                        
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        justifyContent: 'space-evenly',
        alignItems: "center"
    },
    profile: {
        alignItems: 'center'
    }
})