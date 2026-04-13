import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handlePress = () => {
    router.push("/create");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DG_SubApp</Text>
      <Text style={styles.subheading}>Your daily affirmations</Text>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>+ New Affirmation</Text>
      </TouchableOpacity>

      {message ? (
        <Text style={styles.message}>{message}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
    gap: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  subheading: {
    fontSize: 16,
    color: Colors.light.icon,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    color: Colors.light.tint,
    fontSize: 15,
    marginTop: 8,
  },
});