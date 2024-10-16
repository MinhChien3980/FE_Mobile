import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ProductListScreen from '../pages/WishList/ProductListScreen';
import FavoritesScreen from '../pages/WishList/FavoritesScreen';
import {NativeBaseProvider} from 'native-base';

const Stack = createStackNavigator();
// Định nghĩa kiểu RootStackParamList
export type RootStackParamList = {
    ProductList: undefined;
    Favorites: undefined;
};
const App = () => {
    return (
        <NativeBaseProvider>
            <Stack.Navigator initialRouteName="ProductList">
                <Stack.Screen
                    name="ProductList"
                    component={ProductListScreen}
                    options={{title: 'Danh sách sản phẩm'}}
                />
                <Stack.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{title: 'Danh sách yêu thích'}}
                />
            </Stack.Navigator>
        </NativeBaseProvider>

    );
};

export default App;

