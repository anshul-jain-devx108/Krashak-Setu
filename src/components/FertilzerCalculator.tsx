import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Picker } from '@react-native-picker/picker';

const FertilizerCalculator = () => {
  const [inputs, setInputs] = useState({ area: "", soil: "", crop: "" });
  const [result, setResult] = useState(null);

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const calculateFertilizer = () => {
    const { area, soil, crop } = inputs;

    // Check if inputs are valid
    if (!area || !soil || !crop) {
      alert("Please fill all fields!");
      return;
    }

    // Convert area to number before doing arithmetic operation
    const areaNum = parseFloat(area); // Convert area to a number

    if (isNaN(areaNum)) {
      alert("Please enter a valid number for land area!");
      return;
    }

    const fertilizer = (areaNum * 50).toFixed(2); // Replace with actual formula
    setResult({
      quantity: fertilizer,
      types: ["NPK", "Organic Mix"],
      distribution: [
        { name: "Nitrogen", value: 40, color: "#4caf50", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "Phosphorus", value: 30, color: "#ff9800", legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { name: "Potassium", value: 30, color: "#2196f3", legendFontColor: "#7F7F7F", legendFontSize: 15 },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fertilizer Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Land Area (hectares)"
        keyboardType="numeric"
        value={inputs.area}
        onChangeText={(text) => handleChange("area", text)}
      />
      <Picker
        selectedValue={inputs.soil}
        onValueChange={(itemValue) => handleChange("soil", itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Soil Type" value="" />
        <Picker.Item label="Sandy" value="sandy" />
        <Picker.Item label="Clayey" value="clayey" />
        <Picker.Item label="Loamy" value="loamy" />
      </Picker>
      <Picker
        selectedValue={inputs.crop}
        onValueChange={(itemValue) => handleChange("crop", itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Crop Type" value="" />
        <Picker.Item label="Wheat" value="wheat" />
        <Picker.Item label="Rice" value="rice" />
        <Picker.Item label="Maize" value="maize" />
      </Picker>
      <Button title="Calculate" onPress={calculateFertilizer} color="#4caf50" />
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Fertilizer Quantity: {result.quantity} kg/hectare</Text>
          <Text style={styles.resultText}>Recommended Types: {result.types.join(", ")}</Text>
          <PieChart
            data={result.distribution}
            width={Dimensions.get("window").width - 50}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4caf50",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 30,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});

export default FertilizerCalculator;
