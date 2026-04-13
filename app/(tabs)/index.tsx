import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const sampleAffirmations = [
  "I am confident and calm",
  "I deserve good things",
  "I am growing every day",
  "I trust the process",
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DG_SubApp</Text>
      <Text style={styles.subheading}>Your daily affirmations</Text>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {sampleAffirmations.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
          </View>
        ))}
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
});