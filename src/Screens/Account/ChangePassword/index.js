import { useDispatch } from 'react-redux';
import { changePasswordRequest } from '../../../Store/actions';
import schema from '../../../Helpers/formSchemas';
import useForm from '../../../Helpers/useForm';
import FormField from '../../../Components/FormField';
import AvatarPeaker from '../../../Components/Account/AvatarPeaker';
import Button from '../../../Components/Account/Button';
import DatePicker from '../../../Components/DatePicker';
import ScrollWrapper from '../../../Components/Account/ScrollWrapper';

const formSchema = {
    password: schema.password,
    newPassword: { ...schema.password, name: 'newPassword', label: 'New password*' },
    confirmNewPassword: {
        ...schema.confirmPassword,
        name: 'confirmNewPassword',
        label: 'Confirm new password*',
        validation: [
            {
                name: 'equalTo',
                message: 'Confirm new password field must the same as new password!',
                options: { fieldName: 'newPassword' }
            }
        ]
    }
};

export default () => {
    const dispatch = useDispatch();
    const form = useForm(formSchema);

    const handleChangePasswordPress = () => {
        if (form.validateFields()) {
            form.setIsLoading(true);

            dispatch(changePasswordRequest({
                params: form.formData,
                errorCallback: form.onApiError,
                successCallback
            }));
        }
    }

    const successCallback = message => {
        form.onApiSuccess(message);
        form.clearForm();
    }

    return <ScrollWrapper isLoading={form.isLoading} formMessage={form.message} setMessage={form.setMessage} withHeader={false}>
        <FormField {...formSchema.password} form={form}/>
        <FormField {...formSchema.newPassword} form={form} />
        <FormField {...formSchema.confirmNewPassword} form={form} />
        <Button mode="contained" marginTop={20} onPress={handleChangePasswordPress} text="Change Password" />
    </ScrollWrapper>;
};