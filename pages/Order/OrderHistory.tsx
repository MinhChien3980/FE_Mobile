import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Define the type for an Order object
interface Order {
  id: string;
  productName: string;
  price: number;
  size: string;
  qty: number;
  status: 'Active' | 'Completed' | 'Cancelled';
  imageUrl: string;
}

// Fake data for testing
const fakeOrders: Order[] = [
  {
    id: '1',
    productName: 'Brown Jacket',
    price: 83.97,
    size: 'XL',
    qty: 10,
    status: 'Active',
    imageUrl: '../../assets/images/proFake_1.jpeg',
  },
  {
    id: '2',
    productName: 'Brown Suite',
    price: 120,
    size: 'XL',
    qty: 10,
    status: 'Active',
    imageUrl: '../../assets/images/proFake_2.jpeg',
  },
  {
    id: '3',
    productName: 'Brown Jacket',
    price: 83.97,
    size: 'XL',
    qty: 10,
    status: 'Active',
    imageUrl: '../../assets/images/proFake_3.jpeg',
  },
  {
    id: '4',
    productName: 'Brown Suite',
    price: 120,
    size: 'XL',
    qty: 10,
    status: 'Active',
    imageUrl: '../../assets/images/proFake_4.jpeg',
  },
  {
    id: '5',
    productName: 'Brown Jacket',
    price: 83.97,
    size: 'XL',
    qty: 10,
    status: 'Completed',
    imageUrl: '../../assets/images/proFake_1.jpeg',
  },
  {
    id: '6',
    productName: 'Brown Suite',
    price: 120,
    size: 'XL',
    qty: 10,
    status: 'Completed',
    imageUrl: '../../assets/images/proFake_2.jpeg',
  },
  {
    id: '7',
    productName: 'Brown Jacket',
    price: 83.97,
    size: 'XL',
    qty: 10,
    status: 'Completed',
    imageUrl: '../../assets/images/proFake_3.jpeg',
  },
  {
    id: '8',
    productName: 'Brown Suite',
    price: 120,
    size: 'XL',
    qty: 10,
    status: 'Completed',
    imageUrl: '../../assets/images/proFake_4.jpeg',
  },
  {
    id: '9',
    productName: 'Brown Jacket',
    price: 83.97,
    size: 'XL',
    qty: 10,
    status: 'Cancelled',
    imageUrl: '../../assets/images/proFake_1.jpeg',
  },
  {
    id: '10',
    productName: 'Brown Suite',
    price: 120,
    size: 'XL',
    qty: 10,
    status: 'Cancelled',
    imageUrl: '../../assets/images/proFake_2.jpeg',
  },
  {
    id: '11',
    productName: 'Brown Jacket',
    price: 83.97,
    size: 'XL',
    qty: 10,
    status: 'Cancelled',
    imageUrl: '../../assets/images/proFake_3.jpeg',
  },
  {
    id: '12',
    productName: 'Brown Suite',
    price: 120,
    size: 'XL',
    qty: 10,
    status: 'Cancelled',
    imageUrl: '../../assets/images/proFake_4.jpeg',
  }
];

// OrderHistory component
const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState<'Active' | 'Completed' | 'Cancelled'>('Active');

  // Filter orders based on active tab
  const filteredOrders = fakeOrders.filter(order => order.status === activeTab);

  // Render individual order
  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.orderDetails}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productInfo}>
          Size: {item.size} | Qty: {item.qty}
        </Text>
        <Text style={styles.oderStyle}>
            <Text style={styles.price}>{item.price}$</Text>
            {activeTab === 'Active' && (
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Track Order</Text>
            </TouchableOpacity>
            )}
            {activeTab === 'Completed' && (
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Leave Review</Text>
            </TouchableOpacity>
            )}
            {activeTab === 'Cancelled' && (
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Re-Order</Text>
            </TouchableOpacity>
            )}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Active')}>
          <Text style={[styles.tabText, activeTab === 'Active' && styles.activeTab]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Completed')}>
          <Text style={[styles.tabText, activeTab === 'Completed' && styles.activeTab]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Cancelled')}>
          <Text style={[styles.tabText, activeTab === 'Cancelled' && styles.activeTab]}>Cancelled</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabText: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#888',
  },
  activeTab: {
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  orderContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  orderDetails: {
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  oderStyle: {
    width: 250,
    display: 'flex',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productInfo: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#8B4513',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default OrderHistory;
