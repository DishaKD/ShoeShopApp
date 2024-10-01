import React from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart} from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const renderItem = ({item}) => (
    <View style={styles.cartItemContainer}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>
        {item.price.amount} {item.price.currency}
      </Text>
      <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
      {item.selectedSize && (
        <Text style={styles.cartItemSize}>Size: {item.selectedSize}</Text>
      )}
      <Button
        title="Remove"
        onPress={() => dispatch(removeFromCart({id: item.id}))}
        color="#FF6347"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  cartItemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cartItemPrice: {
    fontSize: 16,
    marginVertical: 4,
    color: '#000',
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  cartItemSize: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default Cart;
