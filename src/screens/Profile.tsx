import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const FarmerProfile = () => {
  const [farmerData, setFarmerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [address, setAddress] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [district, setDistrict] = useState("");
  const [landArea, setLandArea] = useState("");
  const [landMark, setLandMark] = useState("");
  const [mainCrops, setMainCrops] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const farmerId = await AsyncStorage.getItem("aadharNumber");
        if (!farmerId) {
          setError("Farmer ID not found. Please log in again.");
          setLoading(false);
          return;
        }

        const docRef = doc(db, "farmer_data", farmerId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFarmerData(data);
          setAccountNumber(data.account_no || "");
          setIfscCode(data.ifsc_code || "");
        } else {
          setError("Farmer data not found.");
        }
      } catch (error) {
        console.error("Error fetching farmer data: ", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, []);

  const handleUpdate = async () => {
    try {
      const farmerId = await AsyncStorage.getItem("aadharNumber");
      if (!farmerId) {
        Alert.alert("Error", "Farmer ID not found. Please log in again.");
        return;
      }

      const docRef = doc(db, "farmer_data", farmerId);
      await updateDoc(docRef, {
        account_no: accountNumber,
        ifsc_code: ifscCode,
      });

      Alert.alert("Success", "Account details updated successfully.");
      setEditing(false);
    } catch (error) {
      console.error("Error updating data: ", error);
      Alert.alert("Error", "An error occurred while updating data.");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("aadharNumber");
      navigation.navigate("Login"); // Adjust the route name if different
    } catch (error) {
      console.error("Error during logout: ", error);
      Alert.alert("Error", "An error occurred while logging out.");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        
        <Text style={styles.title}>Farmer Personal Info</Text>
        {!editing ? (
            <View style={styles.infoContainer}>
            <Text style={styles.label}>
              <MaterialIcons name="person" size={20} color="#4CAF50" /> Name:
            </Text>
            <Text style={styles.value}>{farmerData?.name || "N/A"}</Text>
  
            <Text style={styles.label}>
              <MaterialIcons name="credit-card" size={20} color="#4CAF50" /> Aadhaar Number:
            </Text>
            <Text style={styles.value}>{farmerData?.aadhar || "N/A"}</Text>
  
            <Text style={styles.label}>
              <MaterialIcons name="location-on" size={20} color="#4CAF50" /> Address:
            </Text>
            <Text style={styles.value}>{farmerData?.address || "N/A"}</Text>
  
            <Text style={styles.label}>
              <MaterialIcons name="phone" size={20} color="#4CAF50" /> Contact Number:
            </Text>
            <Text style={styles.value}>{farmerData?.phone || "N/A"}</Text>
  
            <Text style={styles.label}>
              <MaterialIcons name="map" size={20} color="#4CAF50" /> State:
            </Text>
            <Text style={styles.value}>{farmerData?.state || "N/A"}</Text>
  
            <Text style={styles.label}>
              <MaterialIcons name="location-on" size={20} color="#4CAF50" /> District:
            </Text>
            <Text style={styles.value}>{farmerData?.district || "N/A"}</Text>
  
            <Text style={styles.label}>
              <MaterialIcons name="location-city" size={20} color="#4CAF50" /> Tehsil:
            </Text>
            <Text style={styles.value}>{farmerData?.tehsil || "N/A"}</Text>
  
            <Text style={styles.label}>
              <MaterialIcons name="home" size={20} color="#4CAF50" /> Village:
            </Text>
            <Text style={styles.value}>{farmerData?.village || "N/A"}</Text>
  
            <Text style={styles.label}>
              <MaterialIcons name="pin" size={20} color="#4CAF50" /> Pincode:
            </Text>
            <Text style={styles.value}>{farmerData?.pincode || "N/A"}</Text>

            {/*Bank Details */}
            <Text style={styles.title}>Bank Details</Text>

            <Text style={styles.label}>
              <MaterialIcons name="account-balance" size={20} color="#4CAF50" /> Bank Branch:
            </Text>
            <Text style={styles.value}>{farmerData?.bankbranch || "N/A"}</Text>

            <Text style={styles.label}>
              <MaterialIcons name="credit-card" size={20} color="#4CAF50" /> Account Number:
            </Text>
            <Text style={styles.value}>{farmerData?.accountnumber || "N/A"}</Text>

            <Text style={styles.label}>
              <MaterialIcons name="code" size={20} color="#4CAF50" /> IFSC Code:
            </Text>
            <Text style={styles.value}>{farmerData?.ifsccode || "N/A"}</Text>

            {/*Farm Details */}
            <Text style={styles.title}>Farm Details</Text>
            <Text style={styles.label}>
              <MaterialIcons name="area-chart" size={20} color="#4CAF50" /> Land Area:
            </Text>
            <Text style={styles.value}>{farmerData?.landarea || "N/A"}</Text>

            <Text style={styles.label}>
              <MaterialIcons name="landscape" size={20} color="#4CAF50" /> Land Mark:
            </Text>
            <Text style={styles.value}>{farmerData?.landmark || "N/A"}</Text>

            <Text style={styles.label}>
              <MaterialIcons name="grass" size={20} color="#4CAF50" /> Main Crops:
            </Text>
            <Text style={styles.value}>{farmerData?.maincrops || "N/A"}</Text>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditing(true)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ): (
            <View style={styles.container}>
            <Text style={styles.label}>Address:</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter Address"
            />
             <Text style={styles.label}>Contact Number:</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              keyboardType="numeric"
              onChangeText={setPhoneNumber}
              placeholder="Enter Contact Number"
            />
            <Text style={styles.label}>District:</Text>
            <TextInput
              style={styles.input}
              value={district}
              onChangeText={setDistrict}
              placeholder="Enter District"
            />
            <Text style={styles.label}>Pincode:</Text>
            <TextInput
              style={styles.input}
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              placeholder="Enter Pincode"
            />

            <Text style={styles.label}>Bank Branch:</Text>
            <TextInput
              style={styles.input}
              value={bankBranch}
              onChangeText={setBankBranch}
              placeholder="Enter Bank Branch"
            />

            <Text style={styles.label}>Account Number:</Text>
            <TextInput
              style={styles.input}
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
              placeholder="Enter Account Number"
            />

            <Text style={styles.label}>IFSC Code:</Text>
            <TextInput
              style={styles.input}
              value={ifscCode}
              onChangeText={setIfscCode}
              placeholder="Enter IFSC Code"
            />
            <Text style={styles.label}>Land Area:</Text>
            <TextInput
              style={styles.input}
              value={landArea}
              onChangeText={setLandArea}
              placeholder="Enter Land Area"
            />

            <Text style={styles.label}>Land Mark:</Text>
            <TextInput
              style={styles.input}
              value={landMark}
              onChangeText={setLandMark}
              placeholder="Enter Land Mark"
            />

            <Text style={styles.label}>Main Crops:</Text>
            <TextInput
              style={styles.input}
              value={mainCrops}
              onChangeText={setMainCrops}
              placeholder="Enter Main Crops"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdate}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View> 
        )}
        
      </View>
      

       {/* Logout Button */}
       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F8E8",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F0F8E8",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#D4E157",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  logoutButton: {
    backgroundColor: "#FF5722",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  logoutButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 12,
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#388E3C",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C8E6C9",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: "#FFEB3B",
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
  },
  editButtonText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
  },
  saveButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    paddingHorizontal: 16,
  },
});

export default FarmerProfile;