
import { useEffect, useState } from 'react';
import { StyleSheet, Animated, Modal, Image, Dimensions, SafeAreaView, View } from 'react-native';
import { useTheme, Button, Text } from 'react-native-paper';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tempIcon from '../../Assets/tempAchievements/peaksIcon.png';

import ModalOverlay from '../ModalOverlay';

export default ({ visible, achievement, onConfirmPress }) => {
    
    const theme = useTheme();
    const [boxScaleValue] = useState(new Animated.Value(0.5));
    const [boxOpacityValue] = useState(new Animated.Value(0));
    const [iconScaleValue] = useState(new Animated.Value(0.5));

    const mainColor = theme.colors.achievements.levels[achievement.currentLevel];
    const nextColor = theme.colors.achievements.levels[achievement.currentLevel + 1];

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
                <SafeAreaView>
                    <Animated.View style={styles.wrapper(theme, boxScaleValue, boxOpacityValue, mainColor)}>
                        <Text style={styles.modalTitle(theme)}>Congratulations!</Text>
                        <Text style={styles.modalSubtitle(theme)}>You have unlocked new achievement!</Text>
                        
                        <Animated.View style={styles.iconContainer(mainColor, iconScaleValue)}>
                            <Image source={tempIcon}  style={{ tintColor: theme.colors.black50, marginTop: 15 }} />
                            <View style={{ position: 'relative', marginTop: 5 }}>
                                <View style={{ position: 'absolute', top: 7, left: -27, borderColor: 'rgb(230, 20, 20)', borderLeftColor: 'transparent', width: 0, height: 0, borderWidth: 17 }}></View>
                                <View style={{ backgroundColor: 'red', padding: 10, paddingHorizontal: 20, zIndex: 2, minWidth: 150 }}>
                                    <Text style={{ textAlign: 'center', width: '100%', color: theme.colors.white, fontWeight: 'bold' }}>{achievement.name}</Text>
                                </View>
                                <View style={{ position: 'absolute', top: 7, right: -27, borderColor: 'rgb(230, 20, 20)', borderRightColor: 'transparent', width: 0, height: 0, borderWidth: 17 }}></View>
                            </View>
                        </Animated.View>
                        <Text style={styles.info(theme)}>
                            Visit<Text style={styles.number(theme)}> 20 </Text>
                            more peaks to unlock
                            <Text style={styles.badge(nextColor)}> Plainium </Text>
                            level
                        </Text>
                        
                        {/* <Text variant="titleLarge" style={styles.name(theme)}>{achievement.name}</Text> */}
                        
                        {/* <Text variant="titleMedium" style={styles.level(mainColor)}>GOLD</Text> */}
                        
                        <Button
                            compact={true}
                            mode="contained"
                            onPress={handleConfirmButton}
                            style={styles.confirmButton(mainColor)}
                            labelStyle={styles.confirmButtonLabel(theme)}
                        >
                            Confirm
                        </Button>
                        
                    </Animated.View>
                </SafeAreaView>
            </ModalOverlay>
        </Modal>
    );
}

const styles = StyleSheet.create({
    wrapper: (theme, boxScaleValue, boxOpacityValue, mainColor) => ({
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: boxScaleValue }],
        opacity: boxOpacityValue,
        backgroundColor: theme.colors.white,
        margin: 20,
        width: Dimensions.get('window').width - 60,
        borderRadius: 20,
        padding: 20,
        paddingVertical: 30,
        borderWidth: 2,
        borderColor: mainColor
    }),
    modalTitle: theme => ({
        fontSize: 20,
        fontWeight: 'bold'
    }),
    modalSubtitle: theme => ({
        fontSize: 14,
        marginTop: 5,
        // fontWeight: 'bold',
        color: theme.colors.darkGray
    }),
    iconContainer: (backgroundColor, iconScaleValue) => ({
        marginTop: 30,
        borderRadius: 100,
        width: 150,
        height: 150,
        borderWidth: 10,
        borderColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: iconScaleValue }],
    }),
    name: theme => ({
        marginTop: 15,
        marginBottom: 20,
        color: theme.colors.black,
        fontWeight: 'bold',
        textAlign: 'center'
    }),
    badge: color => ({
        fontWeight: 'bold',
        color,
        fontSize: 14,
    }),
    number: color => ({
        color,
        fontWeight: 'bold',
        fontSize: 14,
    }),
    info: (theme) => ({
        fontSize: 12,
        textAlign: 'center',
        marginTop: 40
    }),

    level: color => ({
        color,
        fontWeight: 'bold',
        marginTop: -20,
        marginBottom: 30
    }),
    confirmButton: mainColor => ({
        width: 120,
        marginTop: 30,
        backgroundColor: mainColor
    }),
    confirmButtonLabel: theme => ({
        color: theme.colors.white
    })
});