// ProductDetails.js

import React from 'react';
import {View, Text, Image, Button, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/cartSlice';

const ProductDetails = ({route}) => {
  const {product} = route.params;
  const dispatch = useDispatch();

  return (
    <ScrollView className="flex-1 p-4">
      <Image source={{uri: product.mainImage}} className="w-full h-72" />
      <View className="mt-4">
        <Text className=" text-lg text-black font-bold">{product.name}</Text>
        <Text className="text-lg text-black">{product.brandName}</Text>
        <Text className="text-xl text-black font-semibold">
          {product.price.amount} {product.price.currency}
        </Text>
        <Text className="mt-2 text-black">{product.description}</Text>
      </View>

      <Button
        title="Add to Cart"
        onPress={() => dispatch(addToCart(product))}
        className="mt-4 bg-blue-500 text-white p-4"
      />
      <Button
        title="Buy Now"
        onPress={() => console.log('Buying product')}
        className="mt-2 bg-green-500 text-white p-4"
      />
    </ScrollView>
  );
};

export default ProductDetails;
