import { Colors } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const REPEAT_OPTIONS = [1, 3, 5, 10];

export default function AffirmationScreen() {
  const router = useRouter();
  const { title, text, index } = useLocalSearchParams<{ title: string; text: string; index:string; }>();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);
  const timesLeftRef = useRef(0);

  const speakOnce = () => {
    Speech.speak(text as string, {
      onDone: () => {
        timesLeftRef.current -= 1;
        if (timesLeftRef.current > 0) {
          speakOnce();
        } else {
          setIsSpeaking(false);
        }
      },
      onStopped: () => {
        timesLeftRef.current = 0;
        setIsSpeaking(false);
      },
    });
  };

  const handlePlay = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      timesLeftRef.current = repeatCount;
      setIsSpeaking(true);
      speakOnce();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>YOUR AFFIRMATION</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>

      <View style={styles.repeatRow}>
        <Text style={styles.repeatLabel}>Repeat</Text>
        <View style={styles.repeatOptions}>
          {REPEAT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.repeatOption,
                repeatCount === option && styles.repeatOptionActive,
              ]}
              onPress={() => setRepeatCount(option)}
            >
              <Text
                style={[
                  styles.repeatOptionText,
                  repeatCount === option && styles.repeatOptionTextActive,
                ]}
              >
                {option}×
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.playButton, isSpeaking && styles.playButtonActive]}
        onPress={handlePlay}
      >
        <Text style={styles.playButtonText}>
          {isSpeaking ? "Stop" : `▶  Play ${repeatCount}×`}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
            router.push({
                pathname: "/create",
                params: { title, text, index },
            })
        }>
        <Text style={styles.editText}>Edit</Text>
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
  repeatRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  repeatLabel: {
    color: Colors.light.text,
    fontSize: 15,
    fontWeight: "bold",
  },
  repeatOptions: {
    flexDirection: "row",
    gap: 8,
  },
  repeatOption: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  repeatOptionActive: {
    backgroundColor: Colors.light.tint,
  },
  repeatOptionText: {
    color: Colors.light.tint,
    fontSize: 14,
    fontWeight: "bold",
  },
  repeatOptionTextActive: {
    color: "#ffffff",
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
  editButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.light.icon,
  },
  editText: {
    color: Colors.light.icon,
    fontSize: 15,
    fontWeight: "bold",
  }
});