import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { createAccountRequest, updateAccountRequest } from '../../../Store/actions';
import schema from '../../../Helpers/formSchemas';
import useForm from '../../../Helpers/useForm';
import FormField from '../../../Components/FormField';
import AvatarPeaker from '../../../Components/Account/AvatarPeaker';
import Button from '../../../Components/Account/Button';
import Description from '../../../Components/Account/Description';
import DatePicker from '../../../Components/DatePicker';
import ScrollWrapper from '../../../Components/Account/ScrollWrapper';

const formSchema = {
    email: schema.email,
    password: schema.password,
    confirmPassword: schema.confirmPassword,
    acceptTerms: schema.acceptTerms,
    name: schema.name,
    avatar: schema.avatar,
    birthdate: schema.birthdate,
    description: schema.description,
    acceptNewsletter: schema.acceptNewsletter
};

export default () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const form = useForm(formSchema);

    const { isLoggedIn } = useSelector(state => state.account);

    const handleSignupPress = () => {
        if (form.validateFields()) {
            form.setIsLoading(true);
            
            isLoggedIn ? 
                dispatch(updateAccountRequest({ params: form.formData, errorCallback: form.onApiError, successCallback })) :
                dispatch(createAccountRequest({ params: form.formData, errorCallback: form.onApiError }));
        }
    }

    const successCallback = () => {
        form.setIsLoading(false);
        form.setMessage({ visible: true, level: 'success', text: 'Profile succesfully updated!' })
    }

    return <ScrollWrapper isLoading={form.isLoading} formMessage={form.message} setMessage={form.setMessage} withHeader={false}>
        <Description>You ony have to fill Your email and password, or other fields are optional and can be filled later</Description>
        <View style={styles.requiredWrapper(theme)}>
            <FormField {...formSchema.email} form={form} />
            <FormField {...formSchema.password} form={form} />
            <FormField {...formSchema.confirmPassword} form={form} />
            <FormField {...formSchema.acceptTerms} form={form} />
        </View>
        <FormField {...formSchema.name} form={form} withBottomBorder={false} />
        <AvatarPeaker {...formSchema.avatar} form={form} />
        <DatePicker {...formSchema.birthdate} form={form} />
        <FormField {...formSchema.description} form={form} />
        <FormField {...formSchema.acceptNewsletter} form={form} />
        <Button mode="contained" marginTop={20} onPress={handleSignupPress} text={isLoggedIn ? 'Update Profile' : 'Create Account'} />
    </ScrollWrapper>;
};

const styles = StyleSheet.create({
    requiredWrapper: theme => ({
        borderColor: theme.colors.primary,
        marginHorizontal: -20,
        paddingRight: 20,
        paddingLeft: 10,
        borderLeftWidth: 10 
    })
})