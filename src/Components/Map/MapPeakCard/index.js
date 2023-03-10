import { useEffect, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import PeakCardContent from '../../PeakCard/PeakCardContent';

import MapButton from '../MapButton';


export default ({ peak, onClose }) => {
    const theme = useTheme();
    const [wrapperTranslateYValue] = useState(new Animated.Value(350));
    const [buttonOpacityValue] = useState(new Animated.Value(0));

    const handleCloseButton = () => {
        Animated.parallel([
            Animated.timing(buttonOpacityValue, { toValue: 0, duration: 200, useNativeDriver: true }),
            Animated.timing(wrapperTranslateYValue, { toValue: 350, duration: 500, useNativeDriver: true })
        ]).start(onClose);
    }

    useEffect(() => {
        Animated.sequence([
            Animated.timing(wrapperTranslateYValue, { toValue: 0, duration: 700, useNativeDriver: true }),
            Animated.timing(buttonOpacityValue, { toValue: 1, duration: 200, useNativeDriver: true }),
        ]).start();
    }, [])

    return (
        <Animated.View style={styles.wrapper(wrapperTranslateYValue)}>
            <Animated.View style={styles.buttonWrapper(buttonOpacityValue)}>
                <MapButton icon="close" onPress={handleCloseButton} bottomPosition={0} />
            </Animated.View>
            <Animated.View style={styles.cardWrapper(theme)}>
                <PeakCardContent
                    peak={peak}
                    isOnWishlist={true}
                    isVisited={true}
                    visitedDate={'2021-21-12'}
                    imageHeight={150}
                    showInfoAboveImage={false}
                />
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: translateY => ({
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        transform: [{ translateY: translateY }]
    }),
    buttonWrapper: opacity => ({
        postion: 'relative',
        opacity
    }),
    cardWrapper: theme => ({
        padding: 10,
        margin: 5,
        backgroundColor: theme.colors.white90,
        borderRadius: 10,
        borderColor: theme.colors.white80,
        borderWidth: 1,
    })
})