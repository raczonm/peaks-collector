import { useState, useEffect } from 'react';
import { Button, Text, useTheme } from 'react-native-paper';
import { StyleSheet, Image, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

import Thumbnail from './Thumbnail';

export default ({ onChange }) => {
    const theme = useTheme();

    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState(0);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            selectionLimit: 8,
            aspect: [5, 3],
            quality: 0.5,
        });
    
        !result.cancelled && setImages(result.selected);
    };

    const removeImage = index => {
        const tempImages = [...images];
        tempImages.splice(index, 1)

        setImages(tempImages);

        if (index === mainImage) { setMainImage(0) }
        else if (index < mainImage) setMainImage(mainImage - 1)
    }

    useEffect(() => {
        onChange({ images, mainImage })
    }, [images, mainImage]);
    
    return (
        <View style={styles.imagePickerWrapper(theme)}>
            <View style={styles.mainImageWrapper}>
                <View style={styles.imagePlaceholder(theme)}>
                    <MaterialCommunityIcons name='image-filter-hdr' color={theme.colors.darkGray} size={200} style={styles.imagePlaceholderIcon} />
                </View>
                {images[mainImage] && <Image source={{ uri: images[mainImage].uri }} style={styles.mainImage} />}
                {images[mainImage] && <Text variant="titleSmall" style={styles.mainImageLabel(theme)}>Main image</Text>}
                <Button
                    mode="contained"
                    icon="camera"
                    onPress={pickImage}
                    style={styles.button(theme, !!images.length)}
                    textColor={!!images.length ? theme.colors.primary : theme.colors.darkGray}
                >
                    {images.length ? 'Change images' : 'Add'}
                </Button>
            </View>
            <View style={styles.thumbnailsList}>
                {images.map((image, index) => (
                    <Thumbnail
                        setMainImage={setMainImage}
                        removeImage={removeImage}
                        image={image}
                        index={index}
                        key={index}
                        isMainImage={index === mainImage}
                    />
                ))}
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    imagePickerWrapper: theme => ({
        width: '100%',
        backgroundColor: theme.colors.lightGray
    }),
    mainImageWrapper: {
        position: 'relative',
        width: '100%',
        height: 200,
        marginBottom: 5
    },
    imagePlaceholder: theme => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 200,
        backgroundColor: theme.colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }),
    imagePlaceholderIcon: {
        alignSelf: 'center'
    },
    mainImage: {
        width: '100%', 
        height: 200
    },
    mainImageLabel: theme => ({
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        position: 'absolute',
        top: 0,
        right: 0,
        paddingVertical: 5,
        paddingHorizontal: 20
    }),
    button: (theme, isChange) => ({
        position: 'absolute',
        bottom: isChange ? 10 : 'auto',
        top: isChange ? 'auto' : 10, 
        right: 5,
        backgroundColor: isChange ? theme.colors.white70 : 'transparent',
        borderColor: isChange ? theme.colors.primary : theme.colors.darkGray,
        borderWidth: 1,
        margin: 0

    }),
    thumbnailsList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 2.5
    }
});