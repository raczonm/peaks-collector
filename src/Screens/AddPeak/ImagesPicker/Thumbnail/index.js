import { IconButton, useTheme } from 'react-native-paper';
import { StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native';

export default ({ removeImage, setMainImage, image, index, isMainImage }) => {
    const theme = useTheme();
    const thumbnailWidth = ((Dimensions.get('window').width - 25) / 4);

    const handleRemoveIconPress = () => removeImage(index);

    return (
        <TouchableOpacity onPress={() => setMainImage(index)}>
            <View style={styles.thumbnailWrapper(theme, thumbnailWidth, isMainImage)}>
                <Image source={{ uri: image.uri }} style={styles.thumbnail(thumbnailWidth)} />
                <IconButton
                    icon="close"
                    iconColor={theme.colors.white} 
                    size={10}
                    onPress={handleRemoveIconPress}
                    style={styles.removeButton(theme, isMainImage)}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    thumbnailWrapper: (theme, thumbnailWidth, isMainImage) => ({
        position: 'relative',
        width: thumbnailWidth,
        borderWidth: 1,
        borderColor: isMainImage ? theme.colors.primary : theme.colors.lightGray,
        backgroundColor: isMainImage ? theme.colors.primary : theme.colors.white,
        padding: 3,
        marginBottom: 5,
        marginHorizontal: 2.5,
        boxSizing: 'border-box'
    }),
    thumbnail: thumbnailWidth => ({
        width: thumbnailWidth - 8,
        height: (0.66 * thumbnailWidth) - 8
    }),
    removeButton: (theme, isMainImage) => ({
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 0,
        margin: 0,
        padding: 0,
        backgroundColor: isMainImage ? theme.colors.primary : theme.colors.darkGray
    })
});