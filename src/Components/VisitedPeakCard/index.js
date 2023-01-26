import { Text, useTheme } from 'react-native-paper';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePlaceholder from '../ImagePlaceholder';
import { BASE_ASSETS_URL } from '../../Config';

export default ({ peak }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const handleOnPress = () =>  navigation.navigate('Peak details', { peak });

    return (
        <TouchableOpacity onPress={handleOnPress}>
            <View style={styles.wrapper(theme)}>
                <View style={styles.visitedInfo(theme)}>
                    <MaterialCommunityIcons name="calendar" color={theme.colors.white} size={18} />
                    <Text variant="bodyMedium" style={styles.visitedText(theme)}>{peak.conquerDate || peak.firstVisitedDate}</Text>
                </View>
                <ImagePlaceholder height={180} />
                {!!peak.entranceAssets.length && <Image style={styles.image} source={{ uri: `${BASE_ASSETS_URL}/${peak.entranceAssets[0]._id}.webp` }} />}
                <View style={styles.infoWrapper(theme)}>
                    <Text variant="titleLarge">{peak.name} - {peak.elevation}m</Text>
                    {/* <Text variant="bodyMedium">{peak.country}, {peak.region}</Text> */}
                    <Text variant="bodyMedium">Poland, małopolska</Text>
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
    visitedInfo: theme => ({
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        top: 0,
        left: 0,
        backgroundColor: theme.colors.primary,
        paddingVertical: 3,
        paddingRight: 10,
        paddingLeft: 5,
        zIndex: 2
    }),
    wishlistInfo: backgroundColor => ({
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor,
        padding: 5,
        paddingLeft: 7,
        zIndex: 2
    }),
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
    }),
    elevation: (theme) => ({
        position: 'absolute',
        textWrap: 'nowrap',
        top: 10,
        right: 10,
        color: theme.colors.black,
        textAlign: 'right'
    })
})