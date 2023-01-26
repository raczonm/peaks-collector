import { useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import useForm from '../../../Helpers/useForm';
import schema from '../../../Helpers/formSchemas';
import { createAccountRequest, loginRequest } from '../../../Store/actions';
import ScrollWrapper from '../../../Components/Account/ScrollWrapper';
import FormField from '../../../Components/FormField';
import AccountButton from '../../../Components/Account/Button';
import Description from '../../../Components/Account/Description';
import Box from '../../../Components/Account/Box';


const formSchema = {
    email: schema.email,
    password: schema.password
};

export default ({ navigation }) => {
    const dispatch = useDispatch();

    const form = useForm(formSchema);

    const handleLoginSkip = () => {
        form.setIsLoading(true);
        dispatch(createAccountRequest({ params: {}, errorCallback: form.onApiError }));
    }

    const handleLoginPress = () => {
        if (form.validateFields()) {
            form.setIsLoading(true);
            dispatch(loginRequest({ params: form.formData, errorCallback: form.onApiError }));
        }
    }

    const handleCreateAccountPress = () => navigation.navigate('Signup');
    const handleForgottenPasswordPress = () => navigation.navigate('Forgotten Password');

    return <ScrollWrapper isLoading={form.isLoading} formMessage={form.message} setMessage={form.setMessage}>
        <Box>
            <FormField {...formSchema.email} form={form} />
            <FormField {...formSchema.password} form={form} />
            <View style={styles.forgottenPasswordWrapper}>
                <Button onPress={handleForgottenPasswordPress} compact={true}>Forgot Your password?</Button>
            </View>
            <AccountButton marginTop={5} mode="contained" onPress={handleLoginPress} text="Login" />
        </Box>
        <Box>
            <Description>Don't have an account? Create one in less than a minute!</Description>
            <AccountButton mode="outlined" onPress={handleCreateAccountPress} text="Create Account" />
        </Box>
        <Description>Skip this step to create temporaty account associated with your device, You will be able to complete singup process later.</Description>
        <AccountButton onPress={handleLoginSkip} text="Skip for now" />
    </ScrollWrapper>;
};

const styles = StyleSheet.create({
    forgottenPasswordWrapper: {
        alignSelf: 'flex-end'
    }
})