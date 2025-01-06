// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { Card } from 'react-native-paper';
// import { WebView } from 'react-native-webview';
// import { createStackNavigator } from '@react-navigation/stack';

// const LoanPartners = ({ navigation }) => {
//   // Sample list of partner banks
//   const bankData = [
//     { name: 'hdfc Bank', url: 'https://www.hdfcbank.com/' },
//     { name: 'SBI Bank', url: 'https://sbi.co.in/web/personal-banking' },
//     { name: 'ICICI Bank', url: 'https://www.icicibank.com/homepage' },
//     // Add more banks here as needed
//   ];

//   // Function to handle bank selection
//   const handleBankSelect = (url) => {
//     navigation.navigate('BankDashboard', { url });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Our Partner Banks</Text>
//       {bankData.map((bank, index) => (
//         <Card key={index} style={styles.card}>
//           <TouchableOpacity onPress={() => handleBankSelect(bank.url)}>
//             <View style={styles.cardContent}>
//               <Text style={styles.bankName}>{bank.name}</Text>
//             </View>
//           </TouchableOpacity>
//         </Card>
//       ))}
//     </ScrollView>
//   );
// };

// const BankDashboard = ({ route }) => {
//   const { url } = route.params;
//   return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
// };

// const Stack = createStackNavigator();

// const LoanPartnersNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="LoanPartners">
//       <Stack.Screen name="LoanPartners" component={LoanPartners} />
//       <Stack.Screen name="BankDashboard" component={BankDashboard} />
//     </Stack.Navigator>
//   );
// };

// export default LoanPartnersNavigator;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   card: {
//     marginBottom: 10,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   cardContent: {
//     padding: 15,
//   },
//   bankName: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { createStackNavigator } from '@react-navigation/stack';

const LoanPartners = ({ navigation }) => {
  // Sample list of partner banks
  const bankData = [
    { name: 'HDFC Bank', url: 'https://www.hdfcbank.com/', logo: require('../assets/hdfc_logo.png') },
    { name: 'SBI Bank', url: 'https://sbi.co.in/web/personal-banking', logo: require('../assets/sbi_logo.png') },
    { name: 'ICICI Bank', url: 'https://www.icicibank.com/homepage', logo: require('../assets/icici_logo.png') },
    // Add more banks here as needed
  ];

  // Function to handle bank selection
  const handleBankSelect = (url) => {
    navigation.navigate('BankDashboard', { url });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Our Partner Banks</Text>
      {bankData.map((bank, index) => (
        <Card key={index} style={styles.card}>
          <TouchableOpacity onPress={() => handleBankSelect(bank.url)}>
            <View style={styles.cardContent}>
              <Image source={bank.logo} style={styles.bankLogo} />
              <Text style={styles.bankName}>{bank.name}</Text>
            </View>
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  );
};

const BankDashboard = ({ route }) => {
  const { url } = route.params;
  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};

const Stack = createStackNavigator();

const LoanPartnersNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoanPartners">
      <Stack.Screen name="LoanPartners" component={LoanPartners} />
      <Stack.Screen name="BankDashboard" component={BankDashboard} />
    </Stack.Navigator>
  );
};

export default LoanPartnersNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',  // Light gray background
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50', // Dark text for better contrast
  },
  card: {
    marginBottom: 15,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: '#ffffff', // White background for cards
    padding: 10,
  },
  cardContent: {
    flexDirection: 'row', // Align logo and name horizontally
    alignItems: 'center', // Center content vertically
  },
  bankLogo: {
    width: 40, // Set a fixed size for the logo
    height: 40,
    borderRadius: 8, // Rounded corners for the logo
    marginRight: 15, // Space between logo and text
    overflow: 'hidden',
  },
  bankName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e', // Slightly lighter dark text
  },
});
