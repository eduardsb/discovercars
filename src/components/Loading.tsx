import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

import strings from '../utils/localization';

interface Styles {
    container: ViewStyle;
    text: TextStyle;
}

const styles: Styles = {
    container: {
        alignItems: 'center',
        marginTop: 80,
    },
    text: {
        fontSize: 20,
    }
};

const Loading: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{strings.common.loading}</Text>
        </View>
    );
};

export default Loading;
