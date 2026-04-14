import { Colors, Fonts } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useRef, useState } from "react";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const REPEAT_OPTIONS = [1, 3, 5, 10];

export default function AffirmationScreen() {
  const router = useRouter();
  const { title, text, index } = useLocalSearchParams<{
    title: string;
    text: string;
    index: string;
  }>();
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

  const handleShare = async () => {
    await Share.share({
      message: `${title}\n\n${text}`,
    });
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

      <TouchableOpacity
        style={styles.sessionButton}
        onPress={() =>
          router.push("/session")
        }
      >
        <Text style={styles.sessionButtonText}>▶  Start Session</Text>
      </TouchableOpacity>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
          <Text style={styles.secondaryText}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sessionButton: {
    width: "100%",
    backgroundColor: "#1a0f2e",
    borderWidth: 1,
    borderColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  sessionButtonText: {
    color: Colors.light.tint,
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
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
    fontFamily: Fonts.bold,
    color: Colors.light.tint,
    letterSpacing: 2,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.light.text,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: Fonts.regular,
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
    fontFamily: Fonts.semiBold,
    fontSize: 15,
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
    fontFamily: Fonts.semiBold,
    fontSize: 14,
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
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  bottomRow: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    alignItems: "center",
  },
  secondaryText: {
    color: Colors.light.tint,
    fontFamily: Fonts.semiBold,
    fontSize: 15,
  },
  shareButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: "#1a0f2e",
    alignItems: "center",
  },
  shareText: {
    color: Colors.light.text,
    fontFamily: Fonts.semiBold,
    fontSize: 15,
  },
});