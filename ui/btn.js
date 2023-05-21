import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";

export default AppButton = (props) => (
    <TouchableOpacity
        onPress={() => {
            props.name.navigate("Login");
        }}
        style={styles.appButtonContainer}
    >
        <Text style={styles.appButtonText}>GET STARTED!</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    appButtonContainer: {
        zIndex: 100,
        backgroundColor: "#D6252E",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 198,
        marginTop: 606,
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },
});
