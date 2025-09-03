import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

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
      {/* 头像和名字 */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/120" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.text}>Just a student who loves coding 💻</Text>
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
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#555",
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
