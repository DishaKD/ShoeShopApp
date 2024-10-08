/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductList from './src/screens/ProductList';
import ProductDetails from './src/screens/ProductDetails';
import Cart from './src/screens/Cart';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {Text, View, Button} from 'react-native';

const Stack = createNativeStackNavigator();

const CenteredHeader = () => (
  <View className="flex-1 justify-center items-center h-14">
    <Text className="font-extrabold text-black text-xl">Shoe Shop</Text>
  </View>
);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={ProductList}
            options={({navigation, route}) => ({
              headerTitle: () => <CenteredHeader />,
              headerRight: () => (
                <Button
                  title="Cart"
                  onPress={() => navigation.navigate('Cart')}
                />
              ),
            })}
          />
          <Stack.Screen name="Details" component={ProductDetails} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
