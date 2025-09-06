import React, { useState } from "react";
import { View } from "react-native";
import AuthScreen from "./src/screens/LoginScreen";
import SocialApp from "./src/SocialApp";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? (
        <SocialApp />
      ) : (
        <AuthScreen onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </View>
  );
}
