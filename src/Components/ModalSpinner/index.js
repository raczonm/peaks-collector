import { ActivityIndicator } from 'react-native-paper';
import { StyleSheet, Text, Modal } from 'react-native';

import ModalOverlay from '../ModalOverlay';

export default ({ visible, label }) => {
    return (
        <Modal transparent={true} visible={visible}>
            <ModalOverlay>
                <ActivityIndicator animating={true} size={100} />
                <Text variant="titleLarge" style={styles.label}>{label}</Text>
            </ModalOverlay>
        </Modal>
    );
}

const styles = StyleSheet.create({
    label: { marginTop: 20 }
});