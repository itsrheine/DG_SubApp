import { Colors } from "@/constants/theme";
import * as Notifications from "expo-notifications";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const TIME_OPTIONS = [
  { label: "6:00 AM", hour: 6 },
  { label: "8:00 AM", hour: 8 },
  { label: "12:00 PM", hour: 12 },
  { label: "6:00 PM", hour: 18 },
  { label: "9:00 PM", hour: 21 },
];

export default function SettingsScreen() {
  const [enabled, setEnabled] = useState(false);
  const [selectedHour, setSelectedHour] = useState(8);

  const scheduleReminder = async (hour: number) => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Your daily affirmation is waiting",
        body: "Take a moment for yourself today.",
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute: 0,
      },
    });
  };

  const handleToggle = async (value: boolean) => {
    setEnabled(value);

    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        setEnabled(false);
        return;
      }
      await scheduleReminder(selectedHour);
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const handleTimeSelect = async (hour: number) => {
    setSelectedHour(hour);
    if (enabled) {
      await scheduleReminder(hour);
    }
  };

  const selectedLabel =
    TIME_OPTIONS.find((t) => t.hour === selectedHour)?.label ?? "8:00 AM";

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.subheading}>Manage your preferences</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reminder Time</Text>
        <View style={styles.timeGrid}>
          {TIME_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.hour}
              style={[
                styles.timeOption,
                selectedHour === option.hour && styles.timeOptionActive,
              ]}
              onPress={() => handleTimeSelect(option.hour)}
            >
              <Text
                style={[
                  styles.timeOptionText,
                  selectedHour === option.hour && styles.timeOptionTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>Daily Reminder</Text>
          <Text style={styles.rowSubtitle}>
            Notifies you every day at {selectedLabel}
          </Text>
        </View>
        <Switch
          value={enabled}
          onValueChange={handleToggle}
          trackColor={{ false: "#3a2d52", true: Colors.light.tint }}
          thumbColor="#ffffff"
        />
      </View>

      <View style={styles.statusBox}>
        <Text style={styles.statusText}>
          {enabled
            ? `Reminder is on — you'll hear from us at ${selectedLabel}`
            : "Reminder is off"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 24,
    paddingTop: 60,
    gap: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  subheading: {
    fontSize: 16,
    color: Colors.light.icon,
    marginTop: -12,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: Colors.light.text,
    fontSize: 15,
    fontWeight: "bold",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  timeOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  timeOptionActive: {
    backgroundColor: Colors.light.tint,
  },
  timeOptionText: {
    color: Colors.light.tint,
    fontSize: 14,
    fontWeight: "bold",
  },
  timeOptionTextActive: {
    color: "#ffffff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 16,
    padding: 20,
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  rowSubtitle: {
    color: Colors.light.icon,
    fontSize: 13,
  },
  statusBox: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#1a0f2e",
    alignItems: "center",
  },
  statusText: {
    color: Colors.light.icon,
    fontSize: 13,
    textAlign: "center",
  },
});