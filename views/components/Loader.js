import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { View, Text } from 'react-native'
import { Dialog, Portal, Provider } from 'react-native-paper';

export default function Loader({ title, loading }) {
    const [visible, setVisible] = React.useState(true);

    const hideDialog = () => setVisible(false);
    return (
        <View>
            <Provider>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Content>
                            <View>
                                <ActivityIndicator animating={true} color={Colors.red800} style={{marginTop: 10}} />
                                <Text style={{textAlign: 'right', marginTop: -10}}>Check</Text>
                            </View>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </Provider>
        </View>
    )
}
