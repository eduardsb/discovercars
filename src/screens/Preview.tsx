import React from 'react';
import {
    Image,
    ImageStyle,
    ScrollView,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../navigation/Navigator';
import { parseSIPPCode } from '../utils/codeParser';
import strings from '../utils/localization';
import Button from '../components/Button';
import VendorLogo from '../components/VendorLogo';

type Props = NativeStackScreenProps<StackParamList, 'Preview'>;

interface Styles {
    container: ViewStyle;
    content: ViewStyle;
    title: TextStyle;
    carImage: ImageStyle;
    details: ViewStyle;
    price: ViewStyle;
    amount: TextStyle;
}

const styles: Styles = {
    container: {
        paddingTop: 80,
        paddingHorizontal: 16,
        backgroundColor: '#f2f2f2',
    },
    content: {
        marginBottom: 80,
        alignItems: 'center',
    },
    title: {
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
    carImage: {
        marginTop: 20,
        height: 103,
        width: 200,
    },
    details: {
        marginTop: 20,
    },
    price: {
        marginVertical: 20,
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
};

const OffersScreen: React.FC<Props> = props => {
    const { navigation, route } = props;
    const { offer } = route?.params;

    const carDetails = parseSIPPCode(offer.vehicle.sipp);

    const onBook = () => {
        navigation.navigate('Book', {offerUId: offer.offerUId});
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{offer.vehicle.modelName}</Text>
                <VendorLogo vendor={offer.vendor} />
                <Image
                    style={styles.carImage}
                    source={{ uri: offer.vehicle.imageLink }}
                />
                <View style={styles.details}>
                    <Text>{carDetails.carClass}</Text>
                    <Text>{carDetails.transmission}</Text>
                    <Text>{carDetails.doors}</Text>
                    <Text>{carDetails.fuel}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.amount}>
                        {offer.price.amount.toFixed(2)} {offer.price.currency} /{' '}
                        {strings.booking.day}
                    </Text>
                </View>
                <Button
                    title={strings.booking.bookButton}
                    onPress={onBook}></Button>
            </View>
        </ScrollView>
    );
};

export default OffersScreen;
