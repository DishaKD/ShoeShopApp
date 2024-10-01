/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/cartSlice';

const ProductDetails = ({route}) => {
  const {product} = route.params;
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = size => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({...product, selectedSize}));
    Alert.alert('Success', 'Product added to cart!');
  };

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
            <Text style={{color: 'black'}}>Colour: {product.colour}</Text>
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: 15 / 2,
                backgroundColor: product.colour,
                marginLeft: 8,
              }}
            />
          </View>
        )}

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <View style={{marginTop: 8}}>
            <Text style={{color: 'black'}}>Available Sizes:</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {product.sizes.map(size => (
                <TouchableOpacity
                  key={size}
                  onPress={() => handleSizeSelect(size)}
                  style={{
                    padding: 8,
                    borderWidth: 1,
                    borderColor: selectedSize === size ? 'blue' : 'gray',
                    borderRadius: 4,
                    margin: 4,
                    backgroundColor:
                      selectedSize === size ? 'lightblue' : 'white',
                  }}>
                  <Text style={{color: 'black'}}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      <Button
        title="Add to Cart"
        onPress={handleAddToCart}
        color="#007BFF"
        style={{marginTop: 16}}
        disabled={!selectedSize}
      />
      <Button
        title="Buy Now"
        onPress={() => console.log('Buying product')}
        color="#28A745"
        style={{marginTop: 8}}
        disabled={!selectedSize}
      />
    </ScrollView>
  );
};

export default ProductDetails;
