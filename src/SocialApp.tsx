import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Home, Compass, Users, User } from "lucide-react-native";
import HomeScreen from "./screens/HomeScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ChatScreen from "./screens/ChatScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ExploreScreen  from "./screens/ExploreScreens";
import { dummyPosts } from "./data/dummyPosts";
import LoginScreen from "./screens/LoginScreen";

const SocialApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 默认未登录
  const [currentView, setCurrentView] = useState("home");
  const [posts, setPosts] = useState(dummyPosts);

  // 如果没登入，直接显示登入页面
  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* 页面切换 */}
      {currentView === "home" && <HomeScreen posts={posts} setPosts={setPosts} />}
      {currentView === "friends" && <FriendsScreen />}
      {currentView === "profile" && (
        <ProfileScreen
          posts={posts} // 直接传所有 posts，ProfileScreen 内部会显示 My Posts / Saved Posts 两个 tab
          savedPosts={posts.filter((p: any) => p.isSaved)} // 传已保存的帖子
          onLogout={() => {
            setIsLoggedIn(false); // 退出后回到登录页
            setCurrentView("home"); // 登出后默认回到 home
          }}
        />
      )}
      {currentView === "explore" && <ExploreScreen />}

      {/* 底部导航栏 */}
      <View style={styles.navbar}>
        <Pressable onPress={() => setCurrentView("home")} style={styles.navItem}>
          <Home color={currentView === "home" ? "#8B5CF6" : "#6B7280"} size={28} />
        </Pressable>

        <Pressable onPress={() => setCurrentView("explore")} style={styles.navItem}>
          <Compass color={currentView === "explore" ? "#8B5CF6" : "#6B7280"} size={28} />
        </Pressable>

        <Pressable onPress={() => setCurrentView("friends")} style={styles.navItem}>
          <Users color={currentView === "friends" ? "#8B5CF6" : "#6B7280"} size={28} />
        </Pressable>

        <Pressable onPress={() => setCurrentView("profile")} style={styles.navItem}>
          <User color={currentView === "profile" ? "#8B5CF6" : "#6B7280"} size={28} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#2c2c2cff",
    marginBottom: 10,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
});

export default SocialApp;
