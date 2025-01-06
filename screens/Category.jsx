import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Category() {
    const router = useRouter();

    const buttons = [
        {
            title: "Add Crop",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/10650/10650139.png",
            route: "/page1",
        },
        {
            title: "Inventory",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/9252/9252207.png",
            route: "/page2",
        },
        {
            title: "Orders",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/2649/2649223.png",
            route: "/page3",
        },
        
    ];

    return (
        <View style={styles.container}>
            {buttons.map((button, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => router.push(button.route)}
                >
                    <Image
                        source={{ uri: button.imageUrl }}
                        style={styles.image}
                    />
                    <Text style={styles.text}>{button.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 120,
        marginHorizontal: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    text: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: 'outfit-medium',
        textAlign: 'center',
        color: '#000',
    },
});
