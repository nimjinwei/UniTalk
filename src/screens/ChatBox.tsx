import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";

// 定义消息类型
type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  type: "sent" | "received";
};

// 定义 props 类型
type ChatBoxProps = {
  user: { name: string };
  onBack: () => void;
};

const ChatBox: React.FC<ChatBoxProps> = ({ user, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: user.name,
      text: "Hi, nice to meet you! 😊",
      timestamp: "2:30 PM",
      type: "received",
    },
    {
      id: "2",
      sender: "Me",
      text: "Hello! Nice to meet you too! 👋",
      timestamp: "2:31 PM",
      type: "sent",
    },
    {
      id: "3",
      sender: user.name,
      text: "How are you doing today?",
      timestamp: "2:32 PM",
      type: "received",
    },
  ]);

  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList<Message>>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Me",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "sent",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <View style={styles.container}>
      {/* 顶部栏 */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={{ color: "#A78BFA", fontSize: 16 }}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{user.name}</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* 消息列表 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.type === "sent" ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text
              style={{
                color: item.type === "sent" ? "#fff" : "#111",
                fontSize: 16,
              }}
            >
              {item.text}
            </Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
        style={{ flex: 1, padding: 10 }}
      />

      {/* 输入框 */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
        />
        <Pressable style={styles.sendBtn} onPress={handleSend}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", paddingTop: 40 }, // paddingTop 代替 SafeArea
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#2c2c2cff",
  },
  headerTitle: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  message: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    maxWidth: "70%",
  },
  myMessage: {
    backgroundColor: "#8B5CF6",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#E5E7EB",
    alignSelf: "flex-start",
  },
  timestamp: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 20,
  },
});

export default ChatBox;
