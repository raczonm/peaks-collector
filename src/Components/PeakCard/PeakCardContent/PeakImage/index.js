import { Image, View, StyleSheet } from 'react-native';
import ImagePlaceholder from '../../../ImagePlaceholder';

export default ({ imageUrl, height = 250 }) => {
    return (
        <View style={styles.imageWrapper(height)}>
            <ImagePlaceholder height={height} />
            <Image style={styles.image(height)} source={{ uri: imageUrl }} />
        </View>
    );
};

const styles = StyleSheet.create({
    imageWrapper: height => ({
        position: 'relative',
        width: '100%',
        height
    }),
    image: height => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height
    }),
})