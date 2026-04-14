import AsyncStorage from "@react-native-async-storage/async-storage";

const STREAK_KEY = "streak_data";

type StreakData = {
  count: number;
  lastOpenedDate: string;
};

export async function updateStreak(): Promise<number> {
  const today = new Date().toISOString().split("T")[0];

  const stored = await AsyncStorage.getItem(STREAK_KEY);
  const data: StreakData = stored
    ? JSON.parse(stored)
    : { count: 0, lastOpenedDate: "" };

  if (data.lastOpenedDate === today) {
    return data.count;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split("T")[0];

  const newCount =
    data.lastOpenedDate === yesterdayString ? data.count + 1 : 1;

  await AsyncStorage.setItem(
    STREAK_KEY,
    JSON.stringify({ count: newCount, lastOpenedDate: today })
  );

  return newCount;
}