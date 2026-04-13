import { Colors } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AffirmationScreen() {
  const router = useRouter();
  const { title, text } = useLocalSearchParams<{ title: string; text: string }>();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>YOUR AFFIRMATION</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 24,
  },
  card: {
    width: "100%",
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    gap: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: Colors.light.tint,
    letterSpacing: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: Colors.light.icon,
    textAlign: "center",
    lineHeight: 28,
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