import { useTheme, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import ScrollWrapper from '../../Components/Account/ScrollWrapper';
import MainPeakInfo from '../../Components/MainPeakInfo';
import FormField from '../../Components/FormField';
import ImagesPicker from './ImagesPicker';
import DatePicker from '../../Components/DatePicker';
import schema from '../../Helpers/formSchemas';
import useForm from '../../Helpers/useForm';
import { addEntranceRequest } from '../../Store/actions';

const formSchema = {
    dateVisited: schema.dateVisited,
    isPublic: schema.isPublic,
    peakComment: schema.peakComment,
    mainAssetIndex: { name: 'mainAssetIndex', initialValue: 0, isRequired: false },
    assets: { name: 'assets', initialValue: [] },
    rating: schema.rating,
    difficulty: schema.difficulty,
};

export default ({ navigation, route }) => {
    const { peak } = route.params;

    const theme = useTheme();
    const dispatch = useDispatch();
    const form = useForm(formSchema);

    const handleImageChange = ({ mainImage, images }) => {
        form.handleFormDataChange('mainAssetIndex', mainImage);
        form.handleFormDataChange('assets', images);
    }

    const handleSave = () => {
        if (form.validateFields()) {
            form.setIsLoading(true);
            dispatch(addEntranceRequest({ params: form.formData }));
        }

        // account.addPeak({
        //     params: {
        //         peakId: peak.id,
        //         mainAssetIndex: imagesData.mainImage,
        //         conquerDate: formatDate(date),
        //         description,
        //         isPublic,
        //         rating: 4,
        //         difficulty: 4
        //     },
        //     assets: imagesData.images,
        //     successCallback: () => navigation.navigate('Home'),
        //     errorCallback: () => errorCallback()
        // });
    }

    return (
        <ScrollWrapper isLoading={form.isLoading} formMessage={form.message} setMessage={form.setMessage} withHeader={false} withInnerPadding={false}>
            <ImagesPicker onChange={handleImageChange} />
            <View style={styles.innerWrapper}>
                <MainPeakInfo peak={peak} />
                <DatePicker {...formSchema.dateVisited} form={form} />
                <FormField {...formSchema.peakComment} form={form} />
                <FormField {...formSchema.rating} form={form} />
                <FormField {...formSchema.difficulty} form={form} />
                <FormField {...formSchema.isPublic} form={form} />
                <Button icon="content-save" marginTop={20} mode="contained" onPress={handleSave}>Save entrance</Button>
            </View>
        </ScrollWrapper>
    );
}


const styles = StyleSheet.create({
    innerWrapper: {
        padding: 10,
        paddingTop: 0,
        paddingBottom: 20
    }
});