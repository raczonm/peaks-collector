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
        initialValue: false,
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
    dateVisited: {
        name: 'dateVisited',
        label: 'Visited date',
        isRequired: true,
        initialValue: null,
        icon: 'calendar',
        options: {}
    },
    peakComment: {
        name: 'peakComment',
        label: 'Comment',
        isRequired: false,
        initialValue: '',
        icon: 'comment',
        options: {
            isMultiline: true, placeholder: 'Share Your insights about this peak' 
        }
    },
    isPublic: {
        name: 'isPublic',
        label: 'Public',
        isRequired: false,
        initialValue: false,
        icon: 'eye',
        type: 'switch',
        description: 'Images addod to public entrances will be visible to other users.'
    },
    rating: {
        name: 'rating',
        label: 'Rating',
        isRequired: false,
        initialValue: 0,
        icon: 'star',
        type: 'rating',
        description: 'Your overall impression about the peak, trail quality, landscapes and nature.'
    },
    difficulty: {
        name: 'difficulty',
        label: 'Difficulty',
        isRequired: false,
        initialValue: 0,
        icon: 'speedometer-medium',
        type: 'rating',
        description: 'Your overall impression about the peak, trail quality, landscapes and nature.'
    }
};