import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, FlatList, Alert} from "react-native";
import { MessageCircleMore } from "lucide-react-native";
import ChatScreen from "./ChatScreen";

// 模拟用户数据
const usersData = [
  {
    id: "1",
    name: "Alice",
    avatar: "https://i.pravatar.cc/300?img=1",
    bio: "Love hiking and photography",
    tags: ["Hiking", "Photography", "Music"],
  },
  {
    id: "2",
    name: "Bob",
    avatar: "https://i.pravatar.cc/300?img=2",
    bio: "Foodie and gamer",
    tags: ["Gaming", "Cooking", "Travel"],
  },
  {
    id: "3",
    name: "Charlie",
    avatar: "https://i.pravatar.cc/300?img=3",
    bio: "Coffee lover ☕",
    tags: ["Coffee", "Movies", "Reading"],
  },
];

// 单个用户卡片组件
const UserCard = ({ user, onLike, onDislike }:any) => (
  <View style={styles.card}>
    <Image source={{ uri: user.avatar }} style={styles.avatar} />
    <Text style={styles.name}>{user.name}</Text>
    <Text style={styles.bio}>{user.bio}</Text>

    {/* 标签 */}
    <View style={styles.tags}>
      {user.tags.map((tag:any) => (
        <Text key={tag} style={styles.tag}>
          #{tag}
        </Text>
      ))}
    </View>

    {/* 操作按钮 */}
    <View style={styles.actions}>
      <Pressable onPress={onDislike} style={[styles.button, styles.dislike]}>
        <Text style={[styles.buttonText, { color: '#000' }]}>Not interested</Text>
      </Pressable>
      <Pressable onPress={onLike} style={[styles.button, styles.like]}>
        <Text style={styles.buttonText}>I Want To Be Friend !</Text>
      </Pressable>
    </View>
  </View>
);

// 主屏幕
const CardScreen = () => {
  const [currentView, setCurrentView] = useState("home");
  const [users, setUsers] = useState(usersData);
  const [matchRequests, setMatchRequests] = useState<{ [key: string]: boolean }>({});

  const handleLike = (userId: string) => {
    if (!matchRequests[userId]) {
      Alert.alert("Message Sent", "You can send 1 message to start chatting!");
      setMatchRequests((prev) => ({ ...prev, [userId]: true }));
    } else {
      Alert.alert("Chat Allowed", "You can now chat freely!");
    }
    // 可以从列表中移除已处理用户
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleDislike = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // 添加调试函数
  const handleNavigateToChat = () => {
    console.log("Navigate to chat pressed"); // 调试用
    Alert.alert("Debug", "Button pressed!"); // 临时调试
    setCurrentView("chat");
  };

  // 根据 currentView 状态决定显示哪个页面
  if (currentView === "chat") {
    return <ChatScreen onBackToHome={() => setCurrentView("home")} />;
  }

  if (users.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Pressable onPress={handleNavigateToChat} style={styles.navItem}>
            <MessageCircleMore size={30} color="#A78BFA" style={{marginTop:30}}/>
          </Pressable>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No more users to show!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={{ color: "white", fontSize: 32, fontWeight: "bold",marginTop: 50,paddingLeft:16,alignSelf:'flex-start' }}>
            UniTalk
        </Text>
        <Pressable 
          onPress={handleNavigateToChat} 
          style={[styles.navItem,]}     
          >
          <MessageCircleMore size={30} color="#A78BFA" style={{marginTop:30}}/>
          <Text style={{ color: '#A78BFA', fontSize: 12, marginTop: 5 }}>Chat</Text>
        </Pressable>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard user={item} onLike={() => handleLike(item.id)} onDislike={() => handleDislike(item.id)} />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: { width: "100%", height: 200, borderRadius: 12 },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  bio: { fontSize: 16, color: "#555", marginVertical: 5 },
  tags: { flexDirection: "row", flexWrap: "wrap", marginVertical: 8 },
  tag: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  button: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center" },
  like: { backgroundColor: "#8B5CF6", marginLeft: 5 },
  dislike: { backgroundColor: "#E5E7EB", marginRight: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 100 },
  emptyText: { fontSize: 18, color: "#555" },
  container: {
    flex: 1,
  },
  iconContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-end',
  },
  navItem: {
    padding: 10, // 增加点击区域
    alignItems: "center",
    borderRadius: 8, // 添加圆角
    minWidth: 60, // 设置最小宽度
    minHeight: 60, // 设置最小高度
  },
});

export default CardScreen;