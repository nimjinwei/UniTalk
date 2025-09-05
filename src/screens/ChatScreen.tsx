import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Pressable } from "react-native";
import { MessageCircleMore } from "lucide-react-native";

const friendsData = [
  { id: '1', name: "Alice", avatar: "https://i.pravatar.cc/150?img=1", status: "Hey, how are you?" },
  { id: '2', name: "Bob", avatar: "https://i.pravatar.cc/150?img=2", status: "Let's catch up!" },
  { id: '3', name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3", status: "Online" },
  { id: '4', name: "David", avatar: "https://i.pravatar.cc/150?img=4", status: "Busy" },
];

const ChatScreen = ({ onBackToHome }:any) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.friendItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendStatus}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={onBackToHome} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back to Cards</Text>
      </Pressable>
      
      <FlatList
        data={friendsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 10, backgroundColor: "#2c2c2cff", paddingHorizontal: 16 }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Friends</Text>
            <Text style={styles.text}>Chat with your friends</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2cff",
  },
  backButton: {
    padding: 16,
    paddingTop: 50, // 为状态栏留出空间
    backgroundColor: "#2c2c2cff",
  },
  backButtonText: {
    fontSize: 16,
    color: "#A78BFA",
    fontWeight: "600",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 10,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  friendStatus: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 2,
  },
});

export default ChatScreen;