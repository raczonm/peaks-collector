import { useContext, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';

import AccountContext from '../../Context/AccountContext';
import FormMessage from '../../Components/FormMessage';
import ModalSpinner from '../../Components/ModalSpinner';
import MainPeakInfo from '../../Components/MainPeakInfo';
import SaveButton from '../../Components/SaveButton';
import FormField from '../../Components/FormField';
import ImagesPicker from './ImagesPicker';
import DatePicker from '../../Components/DatePicker';
import { formatDate } from '../../Helpers';

const ERROR_MESSAGE = 'Sorry, something went wrong with saving this peak!';

export default ({ navigation, route }) => {
    const { peak } = route.params;
    const theme = useTheme();
    const account = useContext(AccountContext);

    const [message, setMessage] = useState({ visible: false, level: 'neutral', text: '' })
    const [isSaving, setIsSaving] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const [imagesData, setImagesData] = useState({ images: [], mainImage: 0 });
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');

    const handleImageChange = data => setImagesData(data);
    const handleDateChange = data => setDate(data);
    const handleDescriptionChange = value => setDescription(value);

    const errorCallback = () => {
        setIsSaving(false);
        setMessage({
            level: 'error',
            visible: true,
            text: ERROR_MESSAGE
        })
    }

    const handleBannerOkPress = () => setMessage({ visible: false, level: 'neutral', text: '' })

    const handleSave = () => {
        setIsSaving(true);

        account.addPeak({
            params: {
                peakId: peak.id,
                mainAssetIndex: imagesData.mainImage,
                conquerDate: formatDate(date),
                description,
                isPublic,
                rating: 4,
                difficulty: 4
            },
            assets: imagesData.images,
            successCallback: () => navigation.navigate('Home'),
            errorCallback: () => errorCallback()
        });
    }

    return <ScrollView style={styles.formWrapper(theme)}>
        <FormMessage {...message} onPress={handleBannerOkPress}/>
        <ModalSpinner visible={isSaving} label="Saving..." />
        <View style={styles.innerWrapper}>
            <MainPeakInfo peak={peak} />
            <DatePicker onChange={handleDateChange} initialDate={new Date()} label="Visited date" />
            <ImagesPicker onChange={handleImageChange} />
            <FormField label="Comment" onChange={handleDescriptionChange} options={{ isMultiline: true, placeholder: 'Share Your insights about this peak' }} />
            <SaveButton onPress={handleSave} text="Save Peak" />
            <View style={{ height: 320 }} />
        </View>
    </ScrollView>;
}


const styles = StyleSheet.create({
    formWrapper: theme => ({
        height: Dimensions.get('window').height - 120,
        backgroundColor: theme.colors.white
    }),
    innerWrapper: {
        padding: 10
    },
    saveButton: theme => ({
        backgroundColor: theme.colors.success,
        paddingVertical: 10,
        marginTop: 20
    })
});