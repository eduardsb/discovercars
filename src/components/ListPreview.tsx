import React from 'react';
import {
    Image,
    ImageStyle,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import { OfferResponse } from '../services/api/types/booking';
import strings from '../utils/localization';
import { parseSIPPCode } from '../utils/codeParser';
import Button from './Button';
import VendorLogo from './VendorLogo';

interface Styles {
    container: ViewStyle;
    title: TextStyle;
    header: ViewStyle;
    preview: ViewStyle;
    image: ImageStyle;
    details: ViewStyle;
    option: TextStyle;
    summary: ViewStyle;
    price: TextStyle;
    item: ViewStyle;
}

const styles: Styles = {
    container: {
        marginTop: 25,
        backgroundColor: '#f2f2f2',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    preview: {
        flexDirection: 'row',
        marginTop: 10,
    },
    image: {
        width: 150,
        height: 75,
    },
    details: {
        marginLeft: 25,
    },
    option: {
        fontSize: 12,
        color: '#666',
    },
    summary: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: 'bold',
    },
    item: {
        height: 50,
        marginVertical: 10,
        borderRadius: 15,
    },
};

interface Props {
    offer: OfferResponse;
    onSelect: () => void;
}

const ListPreview: React.FC<Props> = props => {
    const { offer, onSelect } = props;

    const carDetails = parseSIPPCode(offer.vehicle.sipp);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{offer.vehicle.modelName}</Text>
                <VendorLogo vendor={offer.vendor} />
            </View>
            <View style={styles.preview}>
                <Image
                    style={styles.image}
                    source={{ uri: offer.vehicle.imageLink }}
                />
                <View style={styles.details}>
                    <Text style={styles.option}>{carDetails.carClass}</Text>
                    <Text style={styles.option}>{carDetails.doors}</Text>
                    <Text style={styles.option}>{carDetails.transmission}</Text>
                    <Text style={styles.option}>{carDetails.fuel}</Text>
                </View>
            </View>
            <View style={styles.summary}>
                <Text style={styles.price}>
                    {offer.price.amount.toFixed(2)} {offer.price.currency} /{' '}
                    {strings.booking.day}
                </Text>
                <Button onPress={onSelect} title={strings.booking.view} />
            </View>
        </View>
    );
};

export default ListPreview;
