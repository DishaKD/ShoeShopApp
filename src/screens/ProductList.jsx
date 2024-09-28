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

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {product: item})}>
      <View className="bg-white p-4 rounded-lg shadow-md m-2">
        <Image source={{uri: item.mainImage}} className="w-full h-40 rounded" />
        <Text className="text-black font-bold mt-2">{item.name}</Text>
        <Text className="text-gray-500">
          {item.brandName || 'Unknown Brand'}
        </Text>
        <Text className="text-black font-bold mt-2">
          {item.price.amount} {item.price.currency}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
