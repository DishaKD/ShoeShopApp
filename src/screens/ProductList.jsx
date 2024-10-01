/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchProducts} from '../redux/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderItem = ({item}) => {
    const getColorStyle = () => {
      if (Array.isArray(item.colour)) {
        return {backgroundColor: 'linear-gradient(to right, red, blue)'};
      } else {
        return {backgroundColor: item.colour || 'gray'};
      }
    };

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', {product: item})}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 8,
            margin: 8,
            shadowOpacity: 0.3,
          }}>
          <Image
            source={{uri: item.mainImage}}
            style={{width: '100%', height: 160, borderRadius: 8}}
          />
          <Text style={{color: 'black', fontWeight: 'bold', marginTop: 8}}>
            {item.name}
          </Text>
          <Text style={{color: 'gray'}}>
            {item.brandName || 'Unknown Brand'}
          </Text>
          <Text style={{color: 'black', fontWeight: 'bold', marginTop: 8}}>
            {item.price.amount} {item.price.currency}
          </Text>

          {item?.stockStatus && (
            <Text
              style={{
                color: item.stockStatus === 'IN STOCK' ? 'green' : 'red',
                marginTop: 4,
              }}>
              {item.stockStatus}
            </Text>
          )}

          {item?.colour && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Text style={{color: 'blue', marginRight: 8}}>Colour:</Text>
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 15 / 2,
                  ...getColorStyle(), // Apply the color style based on the item color
                }}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
});

export default ProductList;
