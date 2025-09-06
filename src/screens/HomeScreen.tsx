import React, { useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { Plus } from "lucide-react-native";
import { PostCard } from "../components/PostCard";
import NewPostScreen from "./NewPostScreen";

// 定义 Post 类型（根据你现有数据字段）
type Post = {
  id: number;
  CommunityName: string;
  Title: string;
  content: string;
  isSaved: boolean;
  tags: string[];
  likes: number;
  comments: {
    id: number;
    author: string;
    content: string;
    time: string;
    avatar: string;
  }[];
  time: string;
  anonymous: string;
  avatar: string;
  isLiked: boolean;
};

interface HomeScreenProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ posts, setPosts }) => {
  const [currentView, setCurrentView] = useState<"home" | "newPost">("home");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>({});

  // 点赞
  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  // 展开/收起评论区
  const handleExpand = (id: number) => {
    setExpandedPost((prev) => (prev === id ? null : id));
  };

  // 保存帖子
  const handleSave = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, isSaved: !p.isSaved } : p)));
  };

  // 发表评论
  const handleComment = (postId: number) => {
    const text = (commentTexts[postId] || "").trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: Date.now(), author: "我", content: text, time: "刚刚", avatar: "#8B5CF6" },
              ],
            }
          : p
      )
    );
    setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
  };

  // 处理新帖子
  const handleAddPost = (newPost: Post) => {
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

      {/* 使用 FlatList 或 map 都可，这里用 map 保持之前风格 */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          expandedPost={expandedPost}
          onLike={handleLike}
          onSave={handleSave}
          onExpand={handleExpand}
          commentText={commentTexts[post.id] || ""}
          setCommentText={(text) => setCommentTexts((prev) => ({ ...prev, [post.id]: text }))}
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

export default HomeScreen;
