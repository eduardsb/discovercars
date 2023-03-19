import React from 'react';
import { Text, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Styles {
    container: ViewStyle;
    text: TextStyle;
}

const styles: Styles = {
    container: {
        backgroundColor: '#00a200',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
};

interface Props {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    disabled?: boolean;
}

const Button: React.FC<Props> = props => {
    const { title, onPress, style, disabled } = props;

    const callback = () => {
        if (disabled) {
            return;
        }
        onPress();
    };

    return (
        <TouchableOpacity onPress={callback} style={[styles.container, style]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
