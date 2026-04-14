import { Colors, Fonts } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ title?: string; text?: string; index?: string }>();

  const isEditing = params.index !== undefined;

  const [title, setTitle] = useState(params.title ?? "");
  const [affirmation, setAffirmation] = useState(params.text ?? "");

  const hasContent = title.trim().length > 0 && affirmation.trim().length > 0;

  const handleSave = async () => {
    const existing = await AsyncStorage.getItem("affirmations");
    const list = existing ? JSON.parse(existing) : [];

    if (isEditing) {
      list[Number(params.index)] = { title: title.trim(), text: affirmation.trim() };
      await AsyncStorage.setItem("affirmations", JSON.stringify(list));
    router.dismissAll();
    } else {
      list.push({ title: title.trim(), text: affirmation.trim() });
      await AsyncStorage.setItem("affirmations", JSON.stringify(list));
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {isEditing ? "Edit Affirmation" : "New Affirmation"}
      </Text>
      <Text style={styles.subheading}>Write something kind to yourself</Text>

      <TextInput
        style={styles.input}
        placeholder="Title e.g. Morning Boost"
        placeholderTextColor={Colors.light.icon}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="I am confident and calm..."
        placeholderTextColor={Colors.light.icon}
        value={affirmation}
        onChangeText={setAffirmation}
        multiline
      />

      <TouchableOpacity
        style={[styles.saveButton, !hasContent && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={!hasContent}
      >
        <Text style={styles.saveButtonText}>
          {isEditing ? "Update Affirmation" : "Save Affirmation"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    heading: {
      fontSize: 28,
      fontFamily: Fonts.bold,
      color: Colors.light.text,
    },
    subheading: {
      fontSize: 15,
      fontFamily: Fonts.regular,
      color: Colors.light.icon,
    },
    input: {
      width: "100%",
      backgroundColor: Colors.light.background,
      borderWidth: 1,
      borderColor: Colors.light.tint,
      borderRadius: 16,
      padding: 16,
      fontSize: 16,
      fontFamily: Fonts.regular,
      color: Colors.light.text,
    },
    saveButtonText: {
      color: "#ffffff",
      fontFamily: Fonts.bold,
      fontSize: 16,
    },
    backText: {
      color: Colors.light.tint,
      fontFamily: Fonts.semiBold,
      fontSize: 15,
    },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
    gap: 16,
    padding: 24,
  },
  textArea: {
    minHeight: 120,
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
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
});