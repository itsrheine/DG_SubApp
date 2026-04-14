import { Colors, Fonts } from "@/constants/theme";
import { updateStreak } from "@/utils/streak";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  type Affirmation = {
    title: string;
    text: string;
  };

  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const stored = await AsyncStorage.getItem("affirmations");
        const list = stored ? JSON.parse(stored) : [];
        setAffirmations(list);

        const currentStreak = await updateStreak();
        setStreak(currentStreak);
      };
      load();
    }, [])
  );

  const handleDelete = async (index: number) => {
    const updated = affirmations.filter((_, i) => i !== index);
    setAffirmations(updated);
    await AsyncStorage.setItem("affirmations", JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DG_SubApp</Text>
      <Text style={styles.subheading}>Your daily affirmations</Text>
      <View style={styles.streakBadge}>
        <Text style={styles.streakText}>🔥 {streak} day{streak !== 1 ? "s" : ""} in a row</Text>
      </View>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {affirmations.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No affirmations yet.</Text>
            <Text style={styles.emptySubtext}>
              Tap the button below to add your first one.
            </Text>
          </View>
        ) : (
          affirmations.map((item: Affirmation, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: "/affirmation",
                    params: { title: item.title, text: item.text, index },
                  })
                }
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardText}>{item.text}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(index)}
                >
                  <Text style={styles.deleteText}>Remove</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/create")}
      >
        <Text style={styles.buttonText}>+ New Affirmation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 24,
    paddingTop: 60,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 16,
    color: Colors.light.icon,
    marginBottom: 24,
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  cardText: {
    color: Colors.light.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  deleteButton: {
    alignSelf: "flex-end",
  },
  deleteText: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "bold",
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 8,
  },
  emptyText: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  emptySubtext: {
    color: Colors.light.icon,
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardTitle: {
    color: Colors.light.tint,
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  streakBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#1a0f2e",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 20,
  },
  streakText: {
    color: Colors.light.tint,
    fontFamily: Fonts.semiBold,
    fontSize: 13,
  }
});