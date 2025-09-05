import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";

type Post = {
  id: string;
  author: string;
  content: string;
};

type ProfileScreenProps = {
  posts: Post[];
};

const ProfileScreen = ({ posts }: ProfileScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      {/* 封面图 */}
      <View style={styles.coverContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/400x200/87ceeb" }}
          style={styles.cover}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/120" }}
          style={styles.avatar}
        />
      </View>

      {/* 基本信息 */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bio}>Just a student who loves coding 💻</Text>

        {/* 统计信息 */}
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

        {/* 编辑资料按钮 */}
        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </View>

      {/* 用户的帖子 */}
      <View style={styles.postsContainer}>
        <Text style={styles.sectionTitle}>My Posts</Text>
        {posts.map((p) => (
          <View key={p.id} style={styles.postCard}>
            <Text style={styles.postContent}>{p.content}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2cff",
  },
  coverContainer: {
    position: "relative",
    alignItems: "center",
  },
  cover: {
    width: "100%",
    height: 180,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    position: "absolute",
    bottom: -60,
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 70,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 15,
    color: "#555",
    marginVertical: 8,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 15,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#777",
  },
  editButton: {
    backgroundColor: "#2c2c2c",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  postsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  postContent: {
    fontSize: 15,
    color: "#333",
  },
});

export default ProfileScreen;
