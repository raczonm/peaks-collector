import { useDispatch } from 'react-redux';

import { forgottenPasswordRequest } from '../../../Store/actions';
import schema from '../../../Helpers/formSchemas';
import useForm from '../../../Helpers/useForm';
import FormField from '../../../Components/FormField';
import Button from '../../../Components/Account/Button';
import Description from '../../../Components/Account/Description';
import ScrollWrapper from '../../../Components/Account/ScrollWrapper';

const formSchema = {
    email: schema.email
};

export default () => {
    const dispatch = useDispatch();
    const form = useForm(formSchema);

    const handleSendCodePress = () => {
        if (form.validateFields()) {
            dispatch(forgottenPasswordRequest({
                params: form.formData,
                errorCallback: form.onApiError,
                successCallback
            }));
        }
    }

    const successCallback = () => {
        form.setIsLoading(false);
        form.setMessage({ visible: true, level: 'success', text: 'New password send to Your email address! We strongly recommend to change Your password imediately after you login to Our app.' });
    }

    return <ScrollWrapper isLoading={form.isLoading} formMessage={form.message} setMessage={form.setMessage} withHeader={false}>
        <Description>We will send You new password to Your email address. If You don't remember email address or didn't receive email (check also spam folder) please contact us on support@peakscollector.com</Description>
        <FormField {...formSchema.email} form={form} />
        <Button mode="contained" marginTop={20} onPress={handleSendCodePress} text="Reset Password" />
    </ScrollWrapper>;
};