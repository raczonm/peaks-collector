import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Login';
import Signup from '../Signup';
import ForgottenPassword from '../ForgottenPassword';

export default () => {
    const Stack = createNativeStackNavigator();
    const theme = useTheme();

    return (
        <View style={styles.wrapper}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerTintColor: theme.colors.primary, 
                        headerTitleStyle: { color: theme.colors.black } 
                    }}
                >
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                    <Stack.Screen name="Signup" options={{ title: 'Create Account'}} component={Signup} />
                    <Stack.Screen name="Forgotten Password"  options={{ title: 'Forgotten Password'}} component={ForgottenPassword} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignContent: 'space-around',
        justifyContent: 'center'
    }
})