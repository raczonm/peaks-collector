import { useState } from 'react';
import { EMPTY_MESSAGE } from '../../Config';

export default formSchema => {
    const getDefaultFormData = () => Object.keys(formSchema).reduce((acc, key) => ({ ...acc, [formSchema[key].name]: formSchema[key].initialValue }), {});
    
    const [formData, setFormData] = useState(getDefaultFormData());
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(EMPTY_MESSAGE);

    const validationMethods = {
        email: value => {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            return regex.test(value);
        },
        equalTo: (value, options) => {
            return value === formData[options.fieldName];
        },
        minLength: (value, options) => {
            return value.length >= options.length ;
        }
    }

    const clearForm = () => setFormData(getDefaultFormData());

    const handleFormDataChange = (fieldName, value) => setFormData({ ...formData, [fieldName]: value });

    const validateFields = () => {
        let isFormValid = true;

        Object.keys(formSchema).forEach(fieldName => {
            const field = formSchema[fieldName];

            if (isFormValid && field.isRequired && !formData[field.name]) {
                setMessage({ visible: true, level: 'error', text: `Field ${field.name} must not be empty!` });
                isFormValid = false;
            }

            if (isFormValid && field.validation) {
                field.validation.forEach(method => {
                    if (!validationMethods[method.name](formData[field.name], method.options)) {
                        setMessage({ visible: true, level: 'error', text: method.message });
                        isFormValid = false;
                    }
                })
            }
        });

        return isFormValid;
    };

    const onApiError = message => {
        setMessage({ level: 'error', visible: true, text: message || 'API error message...' });
        setIsLoading(false);
    }

    const onApiSuccess = message => {
        setMessage({ level: 'success', visible: true, text: message || 'Action Completed Successfully' });
        setIsLoading(false);
    }

    return {
        formData,
        setFormData,
        isLoading,
        setIsLoading,
        message,
        setMessage,
        handleFormDataChange,
        validateFields,
        onApiError,
        onApiSuccess,
        clearForm
    };
}