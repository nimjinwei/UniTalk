import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const NewPostScreen = ({ onSubmit, onCancel }: any) => {
  const [community, setCommunity] = useState("Multimedia University");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handlePost = () => {
    if (!title.trim() || !content.trim()) return;
    const newPost = {
      id: Date.now() + Math.random(),
      CommunityName: community,
      Title: title,
      content,
      isSaved: false,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      likes: 0,
      comments: [],
      time: "刚刚",
      anonymous: "匿名同学",
      avatar: "#8B5CF6",
      isLiked: false,
    };
    onSubmit(newPost);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Post</Text>

      <Text style={styles.label}>Choose Community</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={community} onValueChange={(v) => setCommunity(v)} style={styles.picker}>
          <Picker.Item label="Multimedia University" value="Multimedia University" />
          <Picker.Item label="Coding" value="Coding" />
          <Picker.Item label="AI & ML" value="AI & ML" />
        </Picker>
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter title" />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={content}
        onChangeText={setContent}
        placeholder="Write your post..."
        multiline
      />

      <Text style={styles.label}>Tags (comma separated)</Text>
      <TextInput
        style={styles.input}
        value={tags}
        onChangeText={setTags}
        placeholder="e.g. 学习, 技术"
      />

      <View style={styles.actions}>
        <Pressable style={[styles.button, { backgroundColor: "#E5E7EB" }]} onPress={onCancel}>
          <Text style={{ color: "#111" }}>Cancel</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: "#8B5CF6" }]} onPress={handlePost}>
          <Text style={{ color: "white" }}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#2c2c2cff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "white" },
  label: { marginTop: 10, marginBottom: 6, fontSize: 16, color: "white" },
  pickerWrapper: { backgroundColor: "white", borderRadius: 8, marginBottom: 10 },
  picker: { height: 50, width: "100%" },
  input: { backgroundColor: "white", borderRadius: 8, padding: 10, marginBottom: 10 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center", marginHorizontal: 5 },
});

export default NewPostScreen;
