import { Button } from "@/components/Button";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true, 
    shouldShowList: true,  
  }),
});


async function scheduleNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hora de Beber Água!",
      body: "Lembrete para 15 segundos.",
      sound: "default",
    },
    trigger: {
    type: SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 2,
    repeats: false,
  },
  });

  alert("Notificação agendada para 15 segundos!");
}

async function scheduleRecurringNotification() {
  const now = new Date();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Lembrete Recorrente",
      body: "Hora de hidratar!",
      sound: "default",
    },
    trigger: {
      type: SchedulableTriggerInputTypes.CALENDAR,
      hour: now.getHours(),
      minute: (now.getMinutes() + 1) % 60,
      repeats: true,
    },
  });
}


export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const [notifications, setNotifications] = useState<
    Notifications.Notification[]
  >([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event: any, date?: Date) => {
    setShowPicker(false);
    if (date) setSelectedDate(date);
  };


  async function scheduleCustomNotification() {
    const now = new Date();

    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      selectedDate.getHours(),
      selectedDate.getMinutes()
    );

    
    const date = new Date(selectedDate); 

await Notifications.scheduleNotificationAsync({
  content: {
    title: "Lembrete Personalizado",
    body: `Hora de beber água amanhã às ${
      selectedDate.getHours().toString().padStart(2, "0")
    }:${selectedDate.getMinutes().toString().padStart(2, "0")}.`,
    sound: "default",
  },
  trigger: {
    type: SchedulableTriggerInputTypes.DATE,
    date: date, 
  },
    });

    alert(
      `Lembrete personalizado agendado para amanhã às ${selectedDate.toLocaleTimeString()}`
    );
  }

  
  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão de notificações negada.");
      }
    }
    requestPermissions();

    const subscription =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotifications((prev) => [...prev, notification]);
      });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }} style={styles.image} />
      <Text style={styles.text}>{user?.fullName}</Text>

      <View style={styles.buttonContainer}>
        <Button icon="water" title="Agendar (15s)" onPress={scheduleNotification} />
        <Button icon="refresh" title="Recorrente" onPress={scheduleRecurringNotification} />
      </View>

      {}
      <View style={styles.customScheduler}>
        <Text style={styles.customScheduleText}>
          Lembrete Personalizado —{" "}
          {selectedDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button
            icon="calendar"
            title="Escolher Horário"
            onPress={() => setShowPicker(true)}
          />

          <Button icon="alarm" title="Agendar Amanhã" onPress={scheduleCustomNotification} />
        </View>
      </View>

      <Button icon="exit" title="Sair" onPress={() => signOut()} />

      {}
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}

      {}
      <Text style={styles.historyTitle}>Histórico de Notificações</Text>

      <FlatList
        data={notifications}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>
              {item.request.content.title}
            </Text>
            <Text style={styles.notificationBody}>
              {item.request.content.body}
            </Text>
          </View>
        )}
        style={styles.historyList}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              color: "#666",
            }}
          >
            Nenhuma notificação recebida ainda.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 60,
    gap: 12,
    alignItems: "center",
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  image: {
    width: 92,
    height: 92,
    borderRadius: 12,
  },

  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
    marginVertical: 10,
  },

  customScheduler: {
    width: "100%",
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
    gap: 10,
  },

  customScheduleText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "flex-start",
  },

  historyList: {
    width: "100%",
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },

  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },

  notificationTitle: {
    fontWeight: "bold",
  },

  notificationBody: {
    fontSize: 12,
    color: "#333",
  },
});
