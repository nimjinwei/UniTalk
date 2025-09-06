import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Post } from "../data/dummyPosts"; // ✅ 直接用 dummyPosts 定义的 Post 类型

type ProfileScreenProps = {
  posts?: Post[];
  savedPosts?: Post[];
  onLogout: () => void;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  posts = [],
  savedPosts = [],
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<"my" | "saved">("my");

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => onLogout() },
      ],
      { cancelable: true }
    );
  };

  const renderPosts = (list: Post[] = []) => {
    if (list.length === 0) {
      return (
        <Text style={{ textAlign: "center", color: "#777", marginTop: 10 }}>
          No posts yet.
        </Text>
      );
    }
    return list.map((p) => (
      <View key={p.id} style={styles.postCard}>
        <Text style={styles.community}>#{p.CommunityName}</Text>
        <Text style={styles.postTitle}>{p.Title}</Text>
        <Text style={styles.postContent}>{p.content}</Text>
        <View style={styles.postFooter}>
          <Text style={styles.footerText}>❤️ {p.likes}</Text>
          {/* <Text style={styles.footerText}>💬 {p.comments}</Text> */}
        </View>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {/* 封面区 */}
      <View style={styles.coverContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/400x200/87ceeb" }}
          style={styles.cover}
        />
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop",
          }}
          style={styles.avatar}
        />
      </View>

      {/* 用户信息 */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bio}>Just a student who loves coding 💻</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{posts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>180</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <Pressable
          style={[styles.tabItem, activeTab === "my" && styles.activeTab]}
          onPress={() => setActiveTab("my")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "my" && styles.activeTabText,
            ]}
          >
            My Posts
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tabItem, activeTab === "saved" && styles.activeTab]}
          onPress={() => setActiveTab("saved")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "saved" && styles.activeTabText,
            ]}
          >
            Saved Posts
          </Text>
        </Pressable>
      </View>

      {/* 帖子列表 */}
      <View style={styles.postsContainer}>
        {activeTab === "my" ? renderPosts(posts) : renderPosts(savedPosts)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2c2c2cff" },
  coverContainer: { position: "relative", alignItems: "center" },
  cover: { width: "100%", height: 180 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    position: "absolute",
    bottom: -60,
  },
  logoutBtn: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#F54927",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
  infoContainer: { alignItems: "center", marginTop: 70, paddingHorizontal: 20 },
  name: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  bio: { fontSize: 15, color: "#bbb", marginVertical: 8, textAlign: "center" },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 15,
  },
  stat: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  statLabel: { fontSize: 14, color: "#aaa" },
  editButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  tabRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  tabItem: { flex: 1, alignItems: "center", paddingVertical: 10 },
  tabText: { fontSize: 16, color: "#aaa" },
  activeTab: { borderBottomWidth: 2, borderColor: "#8B5CF6" },
  activeTabText: { color: "#fff", fontWeight: "bold" },
  postsContainer: { padding: 15 },
  postCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  community: { fontSize: 13, color: "#666", marginBottom: 4 },
  postTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6, color: "#111" },
  postContent: { fontSize: 15, color: "#333", marginBottom: 8 },
  postFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  footerText: { fontSize: 14, color: "#666" },
});

export default ProfileScreen;
