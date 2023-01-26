import { useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { createAccountRequest } from '../../../Store/actions';
import schema from '../../../Helpers/formSchemas';
import useForm from '../../../Helpers/useForm';
import FormField from '../../../Components/FormField';
import AvatarPeaker from '../../../Components/Account/AvatarPeaker';
import Button from '../../../Components/Account/Button';
import Description from '../../../Components/Account/Description';
import DatePicker from '../../../Components/DatePicker';
import ScrollWrapper from '../../../Components/Account/ScrollWrapper';

const formSchema = {
    bugDescription: schema.bugDescription,
    bugScreenShot: schema.bugScreenShot,
};

export default () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const form = useForm(formSchema);

    const handleSignupPress = () => {
        if (form.validateFields()) {
            form.setIsLoading(true);
            // dispatch(createAccountRequest({ params: form.formData, errorCallback: form.onApiError }));
            console.log('form', form.formData)
        }
    }

    return <ScrollWrapper isLoading={form.isLoading} formMessage={form.message} setMessage={form.setMessage} withHeader={false}>
        <Description>Nunc eget ornare arcu. Vestibulum ultrices pharetra dolor, vel ultricies tortor placerat id. Maecenas pretium a dui sed euismod.</Description>

        <FormField {...formSchema.bugDescription} form={form} withBottomBorder={false} />
        <AvatarPeaker {...formSchema.bugScreenShot} form={form} />
        <Button mode="contained" marginTop={20} onPress={handleSignupPress} text="Send" />
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