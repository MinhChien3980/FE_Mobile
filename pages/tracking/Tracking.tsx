import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface Status {
  title: string;
  date: string;
  completed: boolean;
}

interface TrackingData {
  productImage: any;
  productName: string;
  size: string;
  quantity: number;
  price: number;
  expectedDelivery: string;
  trackingID: string;
  statuses: Status[];
}

const fakeTrackingData: TrackingData = {
  productImage: '../../assets/images/proFake_1.jpeg',
  productName: 'Brown Suite',
  size: 'XL',
  quantity: 10,
  price: 120,
  expectedDelivery: '03 Sep 2023',
  trackingID: 'TRK452126542',
  statuses: [
    {
      title: 'Order Placed',
      date: '23 Aug 2023, 04:25 PM',
      completed: true,
    },
    {
      title: 'In Progress',
      date: '23 Aug 2023, 03:54 PM',
      completed: true,
    },
    {
      title: 'Shipped',
      date: 'Expected 02 Sep 2023',
      completed: false,
    },
    {
      title: 'Delivered',
      date: '23 Aug 2023, 2023',
      completed: false,
    },
  ],
};

const Tracking = () => {
  const navigation = useNavigation();
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  useEffect(() => {
    setTrackingData(fakeTrackingData);
  }, []);

  const toggleStatus = (index: number) => {
    if (!trackingData) return;

    // Tạo bản sao của statuses và chuyển đổi trạng thái
    const updatedStatuses = trackingData.statuses.map((status, idx) => {
      if (idx === index) {
        return { ...status, completed: !status.completed }; 
      }
      return status;
    });

    setTrackingData({
      ...trackingData,
      statuses: updatedStatuses,
    });
  };

  if (!trackingData) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Text>
        <Text style={styles.headerTitle}>Track Order</Text>
      </View>

      <View style={styles.productInfo}>
        <Image
          source={{ uri: trackingData.productImage }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{trackingData.productName}</Text>
          <Text style={styles.productSize}>
            Size: {trackingData.size} | Qty: {trackingData.quantity}
          </Text>
          <Text style={styles.productPrice}>{trackingData.price}$</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.orderDetailsTitle}>Order Details</Text>
        <View style={styles.orderInfo}>
          <Text>Expected Delivery Date</Text>
          <Text style={styles.orderInfoBold}>{trackingData.expectedDelivery}</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text>Tracking ID</Text>
          <Text style={styles.orderInfoBold}>{trackingData.trackingID}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.orderDetailsTitle}>Order Status</Text>

        <View style={styles.timeline}>
          {trackingData.statuses.map((status, index) => (
            <TouchableOpacity key={index} onPress={() => toggleStatus(index)}>
              <View style={styles.timelineItem}>
                <View style={styles.timelineIcon}>
                  <Ionicons
                    name={status.completed ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={status.completed ? '#8B4513' : '#C0C0C0'} 
                  />
                </View>

                {index !== trackingData.statuses.length - 1 && (
                  <View
                    style={
                      status.completed
                        ? styles.timelineConnector
                        : styles.timelineConnectorGray
                    }
                  />
                )}

                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{status.title}</Text>
                  <Text style={styles.timelineDate}>{status.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productSize: {
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
  },
  orderDetails: {
    marginVertical: 16,
  },
  orderDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderInfoBold: {
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 16,
  },
  timeline: {
    marginVertical: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineIcon: {
    marginRight: 16,
  },
  timelineConnector: {
    width: 2,
    height: 40,
    backgroundColor: '#8B4513',
    position: 'absolute',
    left: 12,
    top: 26.5,
    zIndex: -1,
  },
  timelineConnectorGray: {
    width: 2,
    height: 40,
    backgroundColor: '#C0C0C0',
    position: 'absolute',
    left: 12,
    top: 26.5,
    zIndex: -1,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timelineDate: {
    color: '#666',
  },
});

export default Tracking;
