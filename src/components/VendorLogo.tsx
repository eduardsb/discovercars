import React from 'react';
import { Image, ImageStyle, Text, TextStyle, View, ViewStyle } from 'react-native';

import { type Vendor } from '../services/api/types/booking';

interface Styles {
    container: ViewStyle;
    vendorName: TextStyle;
    vendorImage: ImageStyle;
}

const styles: Styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    vendorName: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    vendorImage: {
        width: 27,
        height: 37,
    },
};

interface Props {
    vendor: Vendor;
}

const VendorLogo: React.FC<Props> = props => {
    const { vendor } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <Image
                style={styles.vendorImage}
                source={{ uri: vendor.imageLink }}
            />
        </View>
    );
};

export default VendorLogo;
