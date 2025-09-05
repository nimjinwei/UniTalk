import React, { useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { Plus } from "lucide-react-native";
import { PostCard } from "../components/PostCard";
import NewPostScreen from "./NewPostScreen";

export const HomeScreen = () => {
  const [currentView, setCurrentView] = useState<"home" | "newPost">("home");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      CommunityName: "Multimedia University",
      Title: "今天的心情",
      content: "今天的天气真好 ☀️，适合出去走走！",
      isSaved: false,
      tags: ["生活", "天气"],
      likes: 12,
      comments: [
        {
          id: 1,
          author: "同学A",
          content: "真的！阳光超舒服",
          time: "1小时前",
          avatar: "#F59E0B",
        },
      ],
      time: "2小时前",
      anonymous: "匿名同学",
      avatar: "#3B82F6",
      isLiked: false,
    },
    {
      id: 2,
      CommunityName: "Coding",
      Title: "学习React Native的感受",
      content: "第一次尝试 React Native，感觉还不错 😎",
      isSaved: true,
      tags: ["技术", "学习"],
      likes: 20,
      comments: [],
      time: "3小时前",
      anonymous: "匿名同学",
      avatar: "#10B981",
      isLiked: true,
    },
  ]);

  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>({});

  // 点赞
  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  // 展开评论
  const handleExpand = (id: number) => {
    setExpandedPost((prev) => (prev === id ? null : id));
  };

  // 保存帖子
  const handleSave = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, isSaved: !p.isSaved } : p)));
  };

  // 评论输入
  const handleCommentTextChange = (id: number, text: string) => {
    setCommentTexts((prev) => ({ ...prev, [id]: text }));
  };

  // 发表评论
  const handleComment = (postId: number) => {
    const text = commentTexts[postId]?.trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: Date.now() + Math.random(),
                  author: "我",
                  content: text,
                  time: "刚刚",
                  avatar: "#6366F1",
                },
              ],
            }
          : p
      )
    );
    setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
  };

  // 处理新帖子
  const handleAddPost = (newPost: any) => {
    setPosts((prev) => [newPost, ...prev]);
    setCurrentView("home");
  };

  if (currentView === "newPost") {
    return <NewPostScreen onSubmit={handleAddPost} onCancel={() => setCurrentView("home")} />;
  }

  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerText}>UniTalk</Text>
      </View>

      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome to UniTalk 🎓</Text>
        <Text style={styles.welcomeSubtitle}>
          Annoymous sharing for university students, Find your community and Friends here!
        </Text>
      </View>

      <Pressable style={styles.postButton} onPress={() => setCurrentView("newPost")}>
        <Plus color="black" size={20} />
        <Text style={styles.postButtonText}>Share your idea !</Text>
      </Pressable>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          expandedPost={expandedPost}
          onLike={handleLike}
          onSave={handleSave}
          onExpand={handleExpand}
          commentText={commentTexts[post.id] || ""}
          setCommentText={(text) => handleCommentTextChange(post.id, text)}
          onComment={handleComment}
        />
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1, padding: 16, backgroundColor: "#2c2c2cff" },
  header: {
    backgroundColor: "#2c2c2cff",
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 16,
    marginTop: 20,
  },
  headerText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    paddingLeft: 10,
  },
  welcomeCard: {
    backgroundColor: "#2c2c2cff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    marginTop: 20,
    alignItems: "center",
  },
  welcomeTitle: { color: "#A78BFA", fontWeight: "bold", fontSize: 22 },
  welcomeSubtitle: { color: "#A78BFA", opacity: 0.9, textAlign: "center", marginTop: 8 },
  postButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#A78BFA",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  postButtonText: { color: "#4C1D95", marginLeft: 8, fontWeight: "600" },
});
