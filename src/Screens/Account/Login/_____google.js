import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, Image, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { createAccountRequest } from '../../Store/actions';
import ModalSpinner from '../../Components/ModalSpinner';
import logo from '../../Assets/logo.png';


// WebBrowser.maybeCompleteAuthSession();

export default () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // const [request, response, promptAsync] = Google.useAuthRequest({
    //     expoClientId: '173833028965-lq8ug8mph698kp4a3odr05vdcus6i6dg.apps.googleusercontent.com',
    //     iosClientId: '173833028965-lq8ug8mph698kp4a3odr05vdcus6i6dg.apps.googleusercontent.com',
    //     androidClientId: '173833028965-lq8ug8mph698kp4a3odr05vdcus6i6dg.apps.googleusercontent.com',
    //     webClientId: '173833028965-lq8ug8mph698kp4a3odr05vdcus6i6dg.apps.googleusercontent.com',
    // });
        
    // useEffect(() => {
    //     if (response?.type === 'success') {
    //         setAccountStorageToken({
    //             token: response.authentication.accessToken,
    //             type: 'google'
    //         });
    //     }
    //     setIsLoading(false);
    // }, [response]);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        // promptAsync({ showInRevents: true });
    };

    const handleLoginSkip = () => {
        setIsLoading(true);
        dispatch(createAccountRequest({ params: {}, errorCallback: () => {} }));
    }
    

    // const [userInfo, setUserInfo] = useState();
    // async function getUserData() {
    //     const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             Authorization: `Bearer ${accessToken}`,
    //             'Content-Type': 'application/json'
    //         },
    //     });

    //     // console.log(response);

    //     // userInfoResponse && console.log(userInfoResponse);
    //     // console.info(userInfoResponse);

    //     userInfoResponse && userInfoResponse.json().then(data => { setUserInfo(data) });
    // }

    // useEffect(() => {
    //     console.log(userInfo);
    // }, [userInfo]);

    return (
        <SafeAreaView style={styles.wrapper}>
            <ModalSpinner visible={isLoading} label="Loading..." />
            <Image style={styles.logo} source={logo} />
            <Text variant="displayLarge" style={styles.title}>Login</Text>
            <Text variant="bodyMedium"  style={styles.description}>Sign in with google or skip to create temporaty account associated with your device, You will still be able to connect to Google account in Profile section</Text>
            <Button style={styles.googleButton} mode="contained" icon="google" onPress={handleGoogleLogin}>Login with google</Button>
            <Button onPress={handleLoginSkip}>Skip for now</Button>        
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignContent: 'space-around',
        justifyContent: 'center',
    },
    logo: {
        width: 167,
        height: 120,
        alignSelf: 'center',
        marginBottom: 20
    },
    title: {
        marginBottom: 20,
        textAlign: 'center'
    },
    description: {
        marginBottom: 50,
        textAlign: 'center',
        padding: 10
    },
    googleButton: {
        marginBottom: 20
    }
})