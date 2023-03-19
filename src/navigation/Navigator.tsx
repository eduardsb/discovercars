import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home';
import OffersScreen from '../screens/Offers';
import { type OfferResponse } from '../services/api/types/booking';
import PreviewScreen from '../screens/Preview';
import BookScreen from '../screens/Book';

export type StackParamList = {
    Home: undefined;
    Offers: {
        locationId: number;
    };
    Preview: {
        offer: OfferResponse;
    };
    Book: {
        offerUId: string;
    };
};

const Navigator = () => {
    const NavigatorStack = createNativeStackNavigator<StackParamList>();

    return (
        <NavigationContainer>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <NavigatorStack.Navigator>
                <NavigatorStack.Screen name="Home" component={HomeScreen} />
                <NavigatorStack.Screen name="Offers" component={OffersScreen} />
                <NavigatorStack.Screen
                    name="Preview"
                    component={PreviewScreen}
                />
                <NavigatorStack.Screen name="Book" component={BookScreen} />
            </NavigatorStack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
