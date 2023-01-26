import { ActivityIndicator, useTheme } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, Modal } from 'react-native';

export default ({ visible, label }) => {
    const theme = useTheme();

    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.modalOverlay(theme)}>
                <ActivityIndicator animating={true} size={100} />
                <Text variant="titleLarge" style={styles.label}>{label}</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: theme => ({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.white80,
        height: Dimensions.get('window').height,
        width: '100%'
    }),
    label: { marginTop: 20 }
});