import { Colors } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateScreen() {
  const router = useRouter();
  const [affirmation, setAffirmation] = useState("");

  const hasText = affirmation.trim().length > 0;

  const handleSave = async () => {
    const existing = await AsyncStorage.getItem("affirmations");
    const list = existing ? JSON.parse(existing) : [];
    list.push(affirmation.trim());
    await AsyncStorage.setItem("affirmations", JSON.stringify(list));
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Affirmation</Text>
      <Text style={styles.subheading}>Write something kind to yourself</Text>

      <TextInput
        style={styles.input}
        placeholder="I am confident and calm..."
        placeholderTextColor={Colors.light.icon}
        value={affirmation}
        onChangeText={setAffirmation}
        multiline
      />

      <TouchableOpacity
        style={[styles.saveButton, !hasText && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={!hasText}
      >
        <Text style={styles.saveButtonText}>Save Affirmation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
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
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  subheading: {
    fontSize: 15,
    color: Colors.light.icon,
  },
  input: {
    width: "100%",
    minHeight: 120,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: Colors.light.text,
    textAlignVertical: "top",
  },
  saveButton: {
    width: "100%",
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.3,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  backText: {
    color: Colors.light.tint,
    fontSize: 15,
    fontWeight: "bold",
  },
});