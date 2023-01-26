import { Button } from 'react-native-paper';

export default ({ onPress, text }) => (
        <Button
            compact={true}
            mode="contained"
            labelStyle={{ fontSize: 12, height: 30, lineHeight: 30, justifyContent: 'center', }}
            style={{ justifyContent: 'center', height: 30, paddingVertical: 0, marginRight: 10, marginBottom: 5 }}
            onPress={onPress}>
                {text}
        </Button>
);
