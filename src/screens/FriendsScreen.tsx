import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { MessageCircleMore } from "lucide-react-native";
import ChatScreen from "./ChatScreen";
import ChatBox from "./ChatBox"; // ✅ 使用单独的 ChatBox 文件

// 模拟用户数据
const usersData = [
  {
    id: "1",
    name: "Alice",
    avatar: "https://plus.unsplash.com/premium_photo-1669135332133-bf6a69c6984e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Love hiking and photography",
    tags: ["Hiking", "Photography", "Music"],
  },
  {
    id: "2",
    name: "Bob",
    avatar: "https://images.unsplash.com/photo-1697384355605-f78f0fa118d7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Foodie and gamer",
    tags: ["Gaming", "Cooking", "Travel"],
  },
  {
    id: "3",
    name: "Charlie",
    avatar: "https://images.unsplash.com/photo-1624149449165-a84f865048b0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Coffee lover ☕",
    tags: ["Coffee", "Movies", "Reading"],
  },
];

// 单个用户卡片组件
const UserCard = ({ user, onLike, onDislike }: any) => (
  <View style={styles.card}>
    <Image source={{ uri: user.avatar }} style={styles.avatar} />
    <Text style={styles.name}>{user.name}</Text>
    <Text style={styles.bio}>{user.bio}</Text>

    {/* 标签 */}
    <View style={styles.tags}>
      {user.tags.map((tag: any) => (
        <View key={tag} style={styles.tagContainer}>
          <Text style={styles.tagText}>#{tag}</Text>
        </View>
      ))}
    </View>

    {/* 操作按钮 */}
    <View style={styles.actions}>
      <Pressable onPress={onDislike} style={[styles.button, styles.dislike]}>
        <Text style={[styles.buttonText, { color: "#000" }]}>
          Not interested
        </Text>
      </Pressable>
      <Pressable onPress={onLike} style={[styles.button, styles.like]}>
        <Text style={styles.buttonText}>I Want To Be Friend !</Text>
      </Pressable>
    </View>
  </View>
);

const FriendsScreen = () => {
  const [currentView, setCurrentView] = useState("home");
  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleLike = (userId: string) => {
    const likedUser = users.find((u) => u.id === userId);
    if (likedUser) {
      setSelectedUser(likedUser);
      setCurrentView("chatbox"); // 进入聊天框
    }
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleDislike = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleNavigateToChat = () => {
    setCurrentView("chat");
  };

  // 跳转到 ChatScreen
  if (currentView === "chat") {
    return <ChatScreen onBackToHome={() => setCurrentView("home")} />;
  }

  // 跳转到 ChatBox
  if (currentView === "chatbox" && selectedUser) {
    return <ChatBox user={selectedUser} onBack={() => setCurrentView("home")} />;
  }

  // 没有更多用户
  if (users.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Pressable onPress={handleNavigateToChat} style={styles.navItem}>
            <MessageCircleMore
              size={30}
              color="#A78BFA"
              style={{ marginTop: 30 }}
            />
          </Pressable>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No more users to show!</Text>
        </View>
      </View>
    );
  }

  // 首页
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            marginTop: 50,
            paddingLeft: 16,
            alignSelf: "flex-start",
          }}
        >
          UniTalk
        </Text>
        <Pressable onPress={handleNavigateToChat} style={[styles.navItem]}>
          <MessageCircleMore
            size={30}
            color="#A78BFA"
            style={{ marginTop: 30 }}
          />
          <Text style={{ color: "#A78BFA", fontSize: 12, marginTop: 5 }}>
            Chat
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onLike={() => handleLike(item.id)}
            onDislike={() => handleDislike(item.id)}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  avatar: { width: "100%", height: 280, borderRadius: 20 },
  name: { fontSize: 24, fontWeight: "bold", marginTop: 12, color: "#111827" },
  bio: { fontSize: 16, color: "#4B5563", marginVertical: 8 },
  tags: { flexDirection: "row", flexWrap: "wrap", marginVertical: 10 },
  tagContainer: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: { fontSize: 14, color: "#374151", fontWeight: "500" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  like: { backgroundColor: "#8B5CF6", marginLeft: 6 },
  dislike: { backgroundColor: "#F3F4F6", marginRight: 6 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: { fontSize: 18, color: "#555" },
  container: {
    flex: 1,
    backgroundColor: "#2c2c2cff",
  },
  iconContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 16,
    alignItems: "flex-end",
  },
  navItem: {
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    minWidth: 60,
    minHeight: 60,
  },
});

export default FriendsScreen;
