import { Colors, Fonts } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AMBIENT_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const INTERVAL_OPTIONS = [
  { label: "30s", value: 30000 },
  { label: "1m", value: 60000 },
  { label: "2m", value: 120000 },
  { label: "5m", value: 300000 },
];

type Affirmation = { title: string; text: string };

export default function SessionScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [interval, setInterval_] = useState(30000);
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("");

  const soundRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);
  const listRef = useRef<Affirmation[]>([]);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem("affirmations");
      const list = stored ? JSON.parse(stored) : [];
      setAffirmations(list);
      listRef.current = list;
      if (list.length > 0) setCurrentTitle(list[0].title);
    };
    load();

    return () => {
      stopSession();
    };
  }, []);

  const speakNext = () => {
    const list = listRef.current;
    if (list.length === 0) return;

    const item = list[indexRef.current];
    setCurrentIndex(indexRef.current);
    setCurrentTitle(item.title);

    Speech.speak(item.text, { rate: 0.85, pitch: 0.95 });
    indexRef.current = (indexRef.current + 1) % list.length;
  };

  const startSession = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    const { sound } = await Audio.Sound.createAsync(
      { uri: AMBIENT_URL },
      { isLooping: true, volume: 0.4 }
    );
    soundRef.current = sound;
    await sound.playAsync();

    indexRef.current = 0;
    speakNext();
    timerRef.current = setInterval(speakNext, interval);
    setIsPlaying(true);
  };

  const stopSession = async () => {
    Speech.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setIsPlaying(false);
    indexRef.current = 0;
    setCurrentIndex(0);
    if (listRef.current.length > 0) setCurrentTitle(listRef.current[0].title);
  };

  const progress = affirmations.length > 0
    ? `${currentIndex + 1} of ${affirmations.length}`
    : "No affirmations";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>NOW PLAYING</Text>
        <Text style={styles.title}>
          {currentTitle || "Loading..."}
        </Text>
        <Text style={styles.progress}>{progress}</Text>

        <View style={styles.dots}>
          {affirmations.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
      </View>

      {!isPlaying && (
        <View style={styles.intervalRow}>
          <Text style={styles.intervalLabel}>Speak every</Text>
          <View style={styles.intervalOptions}>
            {INTERVAL_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.intervalOption,
                  interval === opt.value && styles.intervalOptionActive,
                ]}
                onPress={() => setInterval_(opt.value)}
              >
                <Text
                  style={[
                    styles.intervalOptionText,
                    interval === opt.value && styles.intervalOptionTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {isPlaying && (
        <View style={styles.playingBadge}>
          <Text style={styles.playingText}>● Session running</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.mainButton, isPlaying && styles.mainButtonStop]}
        onPress={isPlaying ? stopSession : startSession}
        disabled={affirmations.length === 0}
      >
        <Text style={styles.mainButtonText}>
          {isPlaying ? "Stop Session" : "▶  Start Session"}
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
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    gap: 12,
  },
  label: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    color: Colors.light.tint,
    letterSpacing: 2,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.light.text,
    textAlign: "center",
  },
  progress: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.light.icon,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3a2d52",
  },
  dotActive: {
    backgroundColor: Colors.light.tint,
  },
  intervalRow: {
    width: "100%",
    gap: 12,
  },
  intervalLabel: {
    color: Colors.light.text,
    fontFamily: Fonts.semiBold,
    fontSize: 15,
  },
  intervalOptions: {
    flexDirection: "row",
    gap: 8,
  },
  intervalOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  intervalOptionActive: {
    backgroundColor: Colors.light.tint,
  },
  intervalOptionText: {
    color: Colors.light.tint,
    fontFamily: Fonts.semiBold,
    fontSize: 14,
  },
  intervalOptionTextActive: {
    color: "#ffffff",
  },
  playingBadge: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#1a0f2e",
  },
  playingText: {
    color: Colors.light.tint,
    fontFamily: Fonts.semiBold,
    fontSize: 13,
  },
  mainButton: {
    width: "100%",
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  mainButtonStop: {
    backgroundColor: "#ef4444",
  },
  mainButtonText: {
    color: "#ffffff",
    fontFamily: Fonts.bold,
    fontSize: 16,
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
    fontFamily: Fonts.semiBold,
    fontSize: 15,
  },
});