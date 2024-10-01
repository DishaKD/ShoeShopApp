import React from 'react';
import {View, Text, Image, Button, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/cartSlice';

const ProductDetails = ({route}) => {
  const {product} = route.params;
  const dispatch = useDispatch();

  return (
    <ScrollView style={{flex: 1, padding: 16}}>
      <Image
        source={{uri: product.mainImage}}
        style={{width: '100%', height: 288, borderRadius: 8}}
      />
      <View style={{marginTop: 16}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
          {product.name}
        </Text>
        <Text style={{fontSize: 16, color: 'black'}}>{product.brandName}</Text>
        <Text style={{fontSize: 24, color: 'black', fontWeight: '600'}}>
          {product.price.amount} {product.price.currency}
        </Text>
        <Text style={{marginTop: 8, color: 'black'}}>
          {product.description}
        </Text>

        {/* Stock Status */}
        {product.stockStatus && (
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor:
                  product.stockStatus === 'IN STOCK' ? 'green' : 'red',
                marginRight: 8,
              }}
            />
            <Text
              style={{
                color: product.stockStatus === 'IN STOCK' ? 'green' : 'red',
              }}>
              {product.stockStatus}
            </Text>
          </View>
        )}

        {/* Colour */}
        {product.colour && (
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
            <Text style={{color: 'blue'}}>Colour:</Text>
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: 15 / 2,
                backgroundColor: product.colour, // Assumes a single color; customize for multiple
                marginLeft: 8,
              }}
            />
          </View>
        )}

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <View style={{marginTop: 8}}>
            <Text style={{color: 'black'}}>Available Sizes:</Text>
            <Text style={{color: 'black'}}>{product.sizes.join(', ')}</Text>
          </View>
        )}
      </View>

      <Button
        title="Add to Cart"
        onPress={() => dispatch(addToCart(product))}
        color="#007BFF" // Custom button color
        style={{marginTop: 16}} // Top margin for button
      />
      <Button
        title="Buy Now"
        onPress={() => console.log('Buying product')}
        color="#28A745" // Custom button color
        style={{marginTop: 8}} // Top margin for button
      />
    </ScrollView>
  );
};

export default ProductDetails;
