import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getToken() {
    let token = await AsyncStorage.getItem('token')
    const data = {
        headers: {
            Authorization: 'Token ' + token
        }
    }
    return data;
}

export async function getPhone() { 
    return await AsyncStorage.getItem('phone');
}