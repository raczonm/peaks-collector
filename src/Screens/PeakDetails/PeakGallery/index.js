import { useState, useEffect } from 'react';
import { ActivityIndicator, useTheme, TouchableRipple, Text, IconButton } from 'react-native-paper';
import { StyleSheet, ScrollView, View, Image, Dimensions, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import peaksApi from '../../../Api/PeaksApi';
import ImagePlaceholder from '../../../Components/ImagePlaceholder';
import { getGalleryImageSize } from '../../../Helpers';
import { BASE_ASSETS_URL } from '../../../Config';


export default ({ peak }) => {
    const theme = useTheme();
    const [images, setImages] = useState([]);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const [zoomIndex, setZoomIndex] = useState(0);

    const handleImagePress = index => {
        setZoomIndex(index);
        setIsZoomOpen(true);
    };

    const handleCloseZoomModal = () => {
        setIsZoomOpen(false);
        setZoomIndex(0);
    };

    useEffect(() => {
        setImages(peak.assets.map(asset => ({
            mode: asset.mode,
            url: `${BASE_ASSETS_URL}/${asset._id}.webp`
        })))
    }, []);

    return <>
        <ScrollView>
            <View style={styles.wrapper}>
                {images && images.map((image, index) => {
                    const isOdd = (index + 1) % 2;
                    const adjectedImage = (isOdd ? images[index + 1] : images[index - 1]) || { mode: 'portrait'};
                    const dimensions = getGalleryImageSize(image.mode, adjectedImage.mode);

                    return (
                        <TouchableRipple key={index} onPress={() => handleImagePress(index)} rippleColor={theme.colors.primary}>
                            <View style={styles.imageBox(dimensions)}>
                                <View styles={styles.imageWrapper}>
                                    <ImagePlaceholder height={dimensions.height - 5} iconSize={100} />
                                    <Image source={{ uri: image.url }} style={styles.image(dimensions)} />
                                </View>
                            </View>
                        </TouchableRipple>
                    );
                })}
            </View>
        </ScrollView>
        {<Modal visible={isZoomOpen} isTransparent={true} onRequestClose={handleCloseZoomModal}>
            <ImageViewer
                enableSwipeDown
                enablePreload
                onSwipeDown={handleCloseZoomModal}
                imageUrls={images}
                index={zoomIndex}
                backgroundColor={theme.colors.white}
                saveToLocalByLongPress={false}
                loadingRender={() => <ActivityIndicator animating={true} size="large" />}
                renderIndicator={(currentIndex, allSize) => (
                    <View style={ styles.galleryIndicator }>
                        <Text variant="titleMedium" style={{ textAlign: 'center' }}>Picture {currentIndex} of {allSize}</Text>
                        <IconButton icon="chevron-left" iconColor={theme.colors.black} size={35} style={styles.closeButton} onPress={handleCloseZoomModal} />
                    </View>
                )}
            />
        </Modal>}
    </>
}

const styles = StyleSheet.create({
    wrapper:  {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2.5 
    },
    imageBox: dimensions => ({
        ...dimensions,
        padding: 2.5
    }),
    imageWrapper: {
        position: 'relative'
    },
    image: dimensions => ({
        width: dimensions.width - 5,
        height: dimensions.height - 5,
    }),
    galleryIndicator: {
        position: 'absolute',
        zIndex: 999,
        padding: 10,
        paddingTop: 55,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    closeButton: {
        position: 'absolute',
        top: 35,
        left: 0,
        fontSize: 20
    }
});