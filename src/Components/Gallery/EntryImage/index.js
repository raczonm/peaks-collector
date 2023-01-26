import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';

import ImagePlaceholder from '../../ImagePlaceholder';

export default ({ image, onPress }) => {
    const theme = useTheme();
    
    return (
        <View style={styles.wrapper}>
            <ImagePlaceholder height={250} />
            {image && <TouchableOpacity onPress={onPress}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.viewGalleryLabel(theme)}>
                    <Text variant="titleSmall">VIEW GALLERY</Text>
                </View>
            </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        width: '100%',
        height: 250
    },
    image: {
        width: '100%', 
        height: 250
    },
    viewGalleryLabel: theme => ({
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        position: 'absolute',
        bottom: 20,
        right: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,

    })
});