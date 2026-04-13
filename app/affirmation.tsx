import { Colors } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AffirmationScreen() {
  const router = useRouter();
  const { title, text } = useLocalSearchParams<{ title: string; text: string }>();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handlePlay = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      Speech.speak(text as string, {
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>YOUR AFFIRMATION</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>

      <TouchableOpacity
        style={[styles.playButton, isSpeaking && styles.playButtonActive]}
        onPress={handlePlay}
      >
        <Text style={styles.playButtonText}>
          {isSpeaking ? "Stop" : "▶  Play"}
        </Text>
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
  playButton: {
    width: "100%",
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  playButtonActive: {
    backgroundColor: "#ef4444",
  },
  playButtonText: {
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