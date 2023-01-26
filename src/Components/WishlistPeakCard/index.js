import { useContext } from 'react';
import { IconButton, Button, Text, useTheme } from 'react-native-paper';
import { Image, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ImagePlaceholder from '../../Components/ImagePlaceholder';
import AccountContext from '../../Context/AccountContext';
import PeaksContext from '../../Context/PeaksContext';

export default ({ peak }) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { togglePeakInWishlist } = useContext(AccountContext);
    const { updatePeakWishlist } = useContext(PeaksContext);

    const handleOnPress = () => navigation.navigate('Peak details', { peakId: peak.id });
    const handleAddPeak = () => navigation.navigate('Add Peak', { peak });

    const handleRemoveFromWishlist = () => {
        togglePeakInWishlist({ 
            params: { peakId: peak.id },
            successCallback: () => updatePeakWishlist(peak.id, false)
        });
    }

    return (
        <TouchableOpacity onPress={handleOnPress}>
            <View style={styles.wrapper(theme)}>
                <ImagePlaceholder height={180} />
                <Image style={styles.image} source={{ uri: 'https://picsum.photos/700' }} />
                <IconButton
                    icon="close"
                    mode="contained"
                    onPress={handleRemoveFromWishlist}
                    size={20}
                    iconColor={theme.colors.error}
                    style={styles.removeButton(theme)}
                />
                <View style={styles.infoWrapper(theme)}>
                    <Text variant="titleLarge">{peak.name} - {peak.elevation}m</Text>
                    {/* <Text variant="bodyMedium">{peak.country}, {peak.region}</Text> */}
                    <Text variant="bodyMedium">Poland, małopolska</Text>
                    <Button mode="contained" style={styles.addPeakButton} onPress={handleAddPeak}>Add Peak</Button>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: theme => ({
        position: 'relative',
        borderWidth: 1,
        borderColor: theme.colors.lightGray,
        margin: 5,
        marginBottom: 0,
        backgroundColor: theme.colors.white,
        height: 252
    }),
    image: {
        width: '100%',
        height: 250
    },
    visitedText: theme => ({
        color: theme.colors.white,
        fontWeight: 'bold',
        marginLeft: 5,
    }),
    infoWrapper: theme => ({
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.white80,
        padding: 10,
        paddingRight: 100
    }),
    elevation: (theme) => ({
        position: 'absolute',
        textWrap: 'nowrap',
        top: 10,
        right: 10,
        color: theme.colors.black,
        textAlign: 'right'
    }),
    removeButton: theme => ({
        position: 'absolute',
        top: 0,
        right: 0,
        borderWidth: 1,
        borderColor: theme.colors.error,
        backgroundColor: theme.colors.white80,
        zIndex: 5
    }),
    addPeakButton: {
        position: 'absolute',
        top: 15,
        right: 10
    }
})