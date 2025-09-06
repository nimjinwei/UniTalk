// screens/ExploreScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";
import { Search } from "lucide-react-native";
import { PostCard } from "../components/PostCard";
import { Post } from "../data/dummyPosts";

export const ExploreScreen = () => {
  const [search, setSearch] = useState("");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>({});
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      CommunityName: "React Native",
      Title: "Why I love React Native ❤️",
      content: "React Native allows you to build apps for both iOS and Android with one codebase.",
      isSaved: false,
      tags: ["ReactNative", "MobileDev"],
      likes: 12,
      comments: [
        { id: 1, author: "Alice", content: "Totally agree!", time: "2h ago", avatar: "#f87171" },
        { id: 2, author: "Bob", content: "Expo makes it even easier 🚀", time: "1h ago", avatar: "#60a5fa" },
      ],
      time: "3h ago",
      anonymous: "John Doe",
      avatar: "#60a5fa",
      isLiked: false,
    },
    {
      id: 2,
      CommunityName: "AI & ML",
      Title: "The future of AI",
      content: "AI will change the way we live and work in the next decade.",
      isSaved: true,
      tags: ["AI", "Future"],
      likes: 34,
      comments: [],
      time: "5h ago",
      anonymous: "Jane Smith",
      avatar: "#34d399",
      isLiked: true,
    },
  ]);

  const communities = [
    { id: "1", name: "Multimedia University", members: 1200 },
    { id: "2", name: "Sunway University", members: 950 },
    { id: "3", name: "Homework Help", members: 2000 },
  ];

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const handleSave = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, isSaved: !p.isSaved } : p)));
  };

  const handleExpand = (id: number) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const handleComment = (postId: number) => {
    const text = (commentTexts[postId] || "").trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { id: Date.now(), author: "You", content: text, time: "Just now", avatar: "#fbbf24" }] }
          : p
      )
    );
    setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* 搜索框 */}
      <View style={styles.searchContainer}>
        <Search size={18} color="#9CA3AF" style={{ marginRight: 6 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 推荐社区 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Communities</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {communities.map((c) => (
            <Pressable key={c.id} style={styles.communityCard}>
              <Text style={styles.communityName}>{c.name}</Text>
              <Text style={styles.communityMembers}>{c.members} members</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* 推荐帖子 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Posts</Text>
        {posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            isExpanded={expandedPost === p.id}
            onLike={handleLike}
            onSave={handleSave}
            onExpand={() => handleExpand(p.id)}
            commentText={commentTexts[p.id] || ""}
            setCommentText={(text) => setCommentTexts((prev) => ({ ...prev, [p.id]: text }))}
            onComment={() => handleComment(p.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2c2c2cff", paddingHorizontal: 15, paddingTop: 50 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#111827" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#fff" },
  communityCard: {
    backgroundColor: "#A78BFA",
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#111111",
    width: 180,
  },
  communityName: { fontSize: 16, fontWeight: "600" },
  communityMembers: { fontSize: 13, color: "#111111" },
});

export default ExploreScreen;