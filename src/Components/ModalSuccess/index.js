
import { useEffect, useState } from 'react';
import { StyleSheet, Animated, Modal } from 'react-native';
import { useTheme, Button, Text } from 'react-native-paper';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ModalOverlay from '../ModalOverlay';

export default ({ visible, message, onConfirmPress }) => {
    const theme = useTheme();
    const [boxScaleValue] = useState(new Animated.Value(0.5));
    const [boxOpacityValue] = useState(new Animated.Value(0));
    const [iconScaleValue] = useState(new Animated.Value(0.5));

    const animate = ({ toValue, toValueOpacity = 1, duration = 500, iconDuration, onFinishCallback }) => {
        Animated.parallel([
            Animated.timing(boxScaleValue, { toValue, duration, useNativeDriver: true }),
            Animated.timing(iconScaleValue, { toValue, duration: iconDuration || duration, useNativeDriver: true }),
            Animated.timing(boxOpacityValue, { toValue: toValueOpacity, duration, useNativeDriver: true })
        ]).start(onFinishCallback);
    }

    const handleConfirmButton = () => {
        animate({ toValue: 0.5, toValueOpacity: 0, duration: 200, onFinishCallback: onConfirmPress });
    }

    useEffect(() => {
        visible && animate({ toValue: 1, iconDuration: 700 });
    }, [visible]);

    return (
        <Modal transparent={true} visible={visible}>
            <ModalOverlay>
                <Animated.View style={styles.successBox(theme, boxScaleValue, boxOpacityValue)}>
                    <Animated.View style={styles.iconContainer(iconScaleValue)}>
                        <MaterialCommunityIcons name="check-circle" color={theme.colors.white} size={80} />
                    </Animated.View>
                    <Text variant="titleMedium" style={styles.message(theme)}>{message}</Text>
                    <Button
                        mode="contained"
                        compact={true}
                        onPress={handleConfirmButton}
                        style={styles.confirmButton(theme)}
                        labelStyle={styles.confirmButtonText(theme)}
                    >
                        Ok
                    </Button>
                </Animated.View>
            </ModalOverlay>
        </Modal>
    );
}

const styles = StyleSheet.create({
    successBox: (theme, boxScaleValue, boxOpacityValue) => ({
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.success,
        transform: [{ scale: boxScaleValue }],
        opacity: boxOpacityValue,
        width: 300,
        borderRadius: 20,
        padding: 20,
        paddingBottom: 40
    }),
    iconContainer: iconScaleValue => ({
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: iconScaleValue }],
    }),
    message: theme => ({
        marginTop: 15,
        marginBottom: 20,
        color: theme.colors.white,
        textAlign: 'center'
    }),
    confirmButton: theme => ({
        width: 200,
        backgroundColor: theme.colors.white
    }),
    confirmButtonText: theme => ({
       color: theme.colors.success,
       fontWeight: 'bold'
    })
});