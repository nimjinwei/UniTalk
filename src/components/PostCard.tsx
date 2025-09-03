import React from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { Heart, MessageCircle, Clock, Hash, Send, Bookmark } from "lucide-react-native";
import { Avatar } from "./Avatar";

type Comment = {
  id: number;
  author: string;
  content: string;
  time: string;
  avatar: string;
};

type Post = {
  id: number;
  CommunityName: string;
  Title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  time: string;
  anonymous: string;
  avatar: string;
  isLiked: boolean;
};

export const PostCard = ({
  post,
  expandedPost,
  onLike,
  onExpand,
  commentText,
  setCommentText,
  onComment,
}: {
  post: Post;
  expandedPost: number | null;
  onLike: (id: number) => void;
  onExpand: (id: number) => void;
  commentText: string;
  setCommentText: (t: string) => void;
  onComment: (postId: number) => void;
}) => (
  <View style={styles.card}>
    {/* 作者信息 */}
    <View style={styles.cardHeader}>
      <Avatar color={post.avatar} size={36} />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.author}>{post.anonymous}</Text>
        <View style={styles.timeRow}>
          <Clock size={12} color="#9CA3AF" />
          <Text style={styles.time}>{post.time}</Text>
        </View>
      </View>
    </View>
    {/* 社区和标题 */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
  {/* 圆形头像容器 */}
  <View
    style={{
      width: 30,
      height: 30,
      borderRadius: 15,      // 圆形
      overflow: 'hidden',    // 圆形裁剪
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5,        // 图片和文字间距
    }}
  >
    <Image
      source={{ uri: "https://www.pikpng.com/pngl/m/213-2136499_life-is-strange-logo-png.png" }}
      style={{
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // 保持比例完整显示
      }}
    />
  </View>

  {/* 文字 */}
  <Text style={{ color: "black", fontSize: 24, fontWeight: "bold" }}>
    {post.CommunityName}
  </Text>
</View>
    <Text style={{color:"black",fontSize:24,fontWeight:"bold"}}>{post.Title}</Text>
    {/* 内容 */}
    <Text style={styles.content}>{post.content}</Text>

    {/* 标签 */}
    <View style={styles.tags}>
      {post.tags.map((tag) => (
        <View key={tag} style={styles.tagContainer}>
          <Hash size={10} color="#8B5CF6" />
          <Text style={styles.tag}>{tag}</Text>
        </View>
      ))}
    </View>

    {/* 操作按钮 */}
    <View style={styles.actions}>
      <Pressable
        style={[styles.actionBtn, post.isLiked && styles.likedBtn]}
        onPress={() => onLike(post.id)}
      >
        <Heart
          size={18}
          color={post.isLiked ? "#FF4757" : "#9CA3AF"}
          fill={post.isLiked ? "#FF4757" : "none"}
        />
        <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
          {post.likes}
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.actionBtn,
          expandedPost === post.id && styles.activeCommentBtn,
        ]}
        onPress={() => onExpand(post.id)}
      >
        <MessageCircle
          size={18}
          color={expandedPost === post.id ? "#8B5CF6" : "#9CA3AF"}
        />
        <Text
          style={[
            styles.actionText,
            expandedPost === post.id && styles.activeCommentText,
          ]}
        >
          {post.comments.length}
        </Text>
        
      </Pressable>
      <Bookmark
            size={18}
            color={expandedPost === post.id ? "#8B5CF6" : "#9CA3AF"}
            style={{ marginLeft: 'auto' }} 
        />
    </View>

    {/* 评论区 */}
    {expandedPost === post.id && (
      <View style={styles.commentSection}>
        {post.comments.map((c) => (
          <View key={c.id} style={styles.commentCard}>
            <Avatar color={c.avatar} size={28} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.commentAuthor}>{c.author}</Text>
              <Text>{c.content}</Text>
              <Text style={styles.commentTime}>{c.time}</Text>
            </View>
          </View>
        ))}

        {/* 评论输入框 */}
        <View style={styles.commentInputBox}>
          <TextInput
            style={styles.commentInput}
            placeholder="写下你的评论..."
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <Pressable
            style={styles.commentButton}
            onPress={() => onComment(post.id)}
          >
            <Send size={16} color="white" />
          </Pressable>
        </View>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  // 这里可以沿用你原来的样式
  card: { backgroundColor: "#8B5CF6", padding: 10, borderRadius: 16, marginBottom: 10 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  author: { fontWeight: "600", color: "#8B5CF6" },
  timeRow: { flexDirection: "row", alignItems: "center" },
  time: { marginLeft: 4, fontSize: 12, color: "#9CA3AF" },
  content: { fontSize: 16, marginBottom: 12, color:"white",lineHeight:24 },
  tags: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  tagContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#F3E8FF", borderRadius: 12, padding: 6, marginRight: 6 },
  tag: { color: "#8B5CF6", fontSize: 12, marginLeft: 4 },
  actions: { flexDirection: "row", gap: 20 },
  actionBtn: { flexDirection: "row", alignItems: "center", padding: 8, borderRadius: 20, backgroundColor: "#8B5CF6" },
  actionText: { marginLeft: 6, color: "#6B7280" },
  likedBtn: { backgroundColor: "#8B5CF6" },
  likedText: { color: "#FF4757" },
  activeCommentBtn: { backgroundColor: "#F3E8FF" },
  activeCommentText: { color: "#8B5CF6" },
  commentSection: { marginTop: 12, borderTopWidth: 1, borderTopColor: "#E5E7EB", paddingTop: 12 },
  commentCard: { flexDirection: "row", marginBottom: 8 },
  commentAuthor: { fontWeight: "600", color: "#8B5CF6" },
  commentTime: { fontSize: 11, color: "#9CA3AF" },
  commentInputBox: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  commentInput: { flex: 1, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 20, padding: 10 },
  commentButton: { backgroundColor: "#8B5CF6", padding: 10, borderRadius: 20 },
});