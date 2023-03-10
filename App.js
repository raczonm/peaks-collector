import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { enGB, registerTranslation } from 'react-native-paper-dates'

import { store, persistor } from './src/Store';
import { ThemeProvider } from './src/Context/ThemeContext';
import Wrapper from'./Wrapper';

WebBrowser.maybeCompleteAuthSession();

// translations for date-picker
registerTranslation('en-GB', enGB)

export default () => {
    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <ThemeProvider>
                    <Wrapper />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}