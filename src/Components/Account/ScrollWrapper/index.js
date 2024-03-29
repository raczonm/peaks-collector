import { ScrollView, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useTheme } from 'react-native-paper';

import Header from '../../../Components/Account/Header';
import ModalSpinner from '../../ModalSpinner';
import FormMessage from '../../FormMessage';
import { EMPTY_MESSAGE } from '../../../Config';

export default ({ children, isLoading, formMessage, setMessage, withInnerPadding = true, withHeader = true }) => {
    const theme = useTheme();

    return <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <ScrollView style={styles.scrollWrapper}>
            <ModalSpinner visible={isLoading} label="Loading..." />
            {withHeader && <Header />}
            <FormMessage {...formMessage} onPress={() => setMessage(EMPTY_MESSAGE)} />
            <View style={styles.innerWrapper(theme, withInnerPadding)}>
                {children}
            </View>
        </ScrollView>
    </KeyboardAvoidingView>;
};

const styles = StyleSheet.create({
    scrollWrapper: theme => ({
        backgroundColor: theme.colors.white
    }),
    innerWrapper: (theme, withInnerPadding) => ({
        padding: withInnerPadding ? 20 : 0,
        backgroundColor: theme.colors.white
    })
})