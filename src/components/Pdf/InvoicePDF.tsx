import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Order, AuthProps, Product } from "@/utils/types";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 10,
    color: "#555",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#333",
  },
  total: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
  },
  footer: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 20,
    color: "#aaa",
  },
  logo: {
    width: 150,
    marginBottom: 20,
    alignSelf: "center",
  },
});

const InvoicePDF: React.FC<{
  order: Order;
  user: AuthProps;
  products: { [key: string]: Product };
}> = ({ order, user, products }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src="/Elsy_Bike_transparent.png" />
      <Text style={styles.header}>
        Invoice - Order #{order.id?.slice(0, 8).toUpperCase()}
      </Text>
      <View style={styles.section}>
        <Text style={styles.subHeader}>Customer Details</Text>
        <Text style={styles.text}>
          Name: {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.text}>Address: {user.adresse}</Text>
        <Text style={styles.text}>City: {user.city}</Text>
        <Text style={styles.text}>Postal Code: {user.postaleCode}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subHeader}>Order Details</Text>
        <Text style={styles.text}>
          Order Date:{" "}
          {order.purchaseDate
            ? new Date(order.purchaseDate).toLocaleDateString()
            : "Unknown"}
        </Text>
        <Text style={styles.text}>Total: ${order.total}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subHeader}>Products</Text>
        {user.cart.cart_Has_Product
          .filter((item) => item.id === order.cartHasProductId)
          .map((cartItem) => (
            <View key={cartItem.id} style={{ marginBottom: 5 }}>
              <Text style={styles.text}>
                Name: {products[cartItem.productId]?.name || "Unknown"}
              </Text>
              <Text style={styles.text}>
                Quantity: {cartItem.quantity || "Unknown"}
              </Text>
            </View>
          ))}
      </View>
      <Text style={styles.footer}>
        Thank you for your purchase! Elsy Ride &copy; 2024
      </Text>
    </Page>
  </Document>
);

export default InvoicePDF;
