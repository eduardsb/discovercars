import React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';

import Navigator from './src/navigation/Navigator';

interface Styles {
    safeArea: ViewStyle;
}

const styles: Styles = {
    safeArea: {
        height: '100%',
    },
};

const App = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Navigator />
        </SafeAreaView>
    );
};

export default App;
