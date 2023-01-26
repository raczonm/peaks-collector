import { Text } from 'react-native-paper';

import WebLink from '../../Components/WebLink';

export default {
    email: {
        name: 'email',
        label: 'Email*',
        isRequired: true,
        initialValue: '',
        icon: 'account',
        options: {
            placeholder: 'Type your email address'
        },
        validation: [
            {
                name: 'email',
                message: 'Email field must be in email format!'
            }
        ]
    },
    password: {
        name: 'password',
        label: 'Password*',
        isRequired: true,
        initialValue: '',
        icon: 'eye',
        options: {
            placeholder: 'Type your password',
            isSecure: true
        },
        validation: [
            {
                name: 'minLength',
                message: 'Password needs to have at least 5 characters',
                options: { length: '5' }
            }
        ]
    },
    confirmPassword: {
        name: 'confirmPassword',
        label: 'Confirm password*',
        isRequired: true,
        initialValue: '',
        icon: 'eye',
        options: {
            placeholder: 'Confirm your password',
            isSecure: true
        },
        validation: [
            {
                name: 'equalTo',
                message: 'Confirm password field must the same as password!',
                options: { fieldName: 'password' }
            }
        ]
    },
    acceptTerms: {
        name: 'acceptTerms',
        label: 'Terms and Conditions',
        isRequired: true,
        initialValue: '',
        icon: 'check-circle-outline',
        type: 'switch',
        description: <Text>You need to accept Peaks Collector <WebLink href="https://google.com" >terms and conditions</WebLink> in order to create an account.</Text>
    },
    acceptNewsletter: {
        name: 'acceptNewsletter',
        label: 'Accept Newsletter',
        isRequired: false,
        initialValue: '',
        icon: 'newspaper-variant-outline',
        type: 'switch',
        description: 'Please allow us to send You update info from time to time.'
    },
    avatar: {
        name: 'avatar',
        label: 'Avatar',
        isRequired: false,
        initialValue: null,
        icon: 'image',
        options: {}
    },
    name: {
        name: 'name',
        label: 'Name',
        isRequired: false,
        initialValue: '',
        icon: 'account',
        options: {
            placeholder: 'Your displayed name',
        }
    },
    birthdate: {
        name: 'birthdate',
        label: 'Date of birth',
        isRequired: false,
        initialValue: '1990-01-01',
        icon: 'calendar',
        options: {}
    },
    description: {
        name: 'description',
        label: 'Description',
        isRequired: false,
        initialValue: '',
        icon: 'information-outline',
        options: {
            placeholder: "Tell us more about You",
            isMultiline: true 
        }
    },
    resetPasswordCode: {
        name: 'resetPasswordCode',
        label: 'Reset Passord Code',
        isRequired: true,
        initialValue: '',
        icon: 'information-outline',
        options: {
            placeholder: "Type code received in email"
        },
        validation: [
            {
                name: 'minLength',
                message: 'Code needs to have at least 4 characters',
                options: { length: '4' }
            }
        ]
    },
    bugScreenShot: {
        label: 'Screen shot',
        isRequired: false,
        initialValue: '',
        icon: 'image',
        options: {
            placeholder: "Attach bug screen shot if possible"
        }
    },
    bugDescription: {
        label: 'Bug description',
        isRequired: true,
        initialValue: '',
        icon: 'information-outline',
        options: {
            placeholder: "Please provide bug description and how to reproduce",
            isMultiline: true 
        }
    }
};