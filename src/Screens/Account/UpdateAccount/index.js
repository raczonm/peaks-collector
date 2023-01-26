import { useDispatch, useSelector } from 'react-redux';
import { updateAccountRequest } from '../../../Store/actions';
import schema from '../../../Helpers/formSchemas';
import useForm from '../../../Helpers/useForm';
import FormField from '../../../Components/FormField';
import AvatarPeaker from '../../../Components/Account/AvatarPeaker';
import Button from '../../../Components/Account/Button';
import DatePicker from '../../../Components/DatePicker';
import ScrollWrapper from '../../../Components/Account/ScrollWrapper';

const createFormSchema = ({ avatarUrl, name, birthdate, description }) => ({
    avatar: { ...schema.avatar, initialValue: { uri: avatarUrl } },
    name: { ...schema.name, initialValue: name },
    birthdate: { ...schema.birthdate, initialValue: birthdate ? new Date(birthdate) : schema.birthdate.initialValue },
    description: { ...schema.description, initialValue: description },
    acceptNewsletter: { ...schema.acceptNewsletter, initialValue: false },
});

export default () => {
    const dispatch = useDispatch();
    const { info } = useSelector(state => state.account);
    const formSchema = createFormSchema(info);
    const form = useForm(formSchema);

    const handleUpdateAccountPress = () => {
        if (form.validateFields()) {
            form.setIsLoading(true);

            dispatch(updateAccountRequest({
                params: form.formData,
                errorCallback: form.onApiError,
                successCallback
            }));
        }
    }

    const successCallback = () => {
        form.setIsLoading(false);
        form.setMessage({ visible: true, level: 'success', text: 'Profile succesfully updated!' })
    }

    return <ScrollWrapper isLoading={form.isLoading} formMessage={form.message} setMessage={form.setMessage} withHeader={false}>
        <FormField {...formSchema.name} form={form} withBottomBorder={false} />
        <AvatarPeaker {...formSchema.avatar} form={form} />
        <DatePicker {...formSchema.birthdate} form={form} />
        <FormField {...formSchema.description} form={form} />
        <FormField {...formSchema.acceptNewsletter} form={form} />
        <Button mode="contained" marginTop={20} onPress={handleUpdateAccountPress} text="Update Account" />
    </ScrollWrapper>;
};