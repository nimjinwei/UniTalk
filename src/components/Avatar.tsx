import React from "react";
import { View } from "react-native";
import { Smile } from "lucide-react-native";

export const Avatar = ({ color, size = 32 }: { color: string; size?: number }) => (
  <View
    style={{
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color,
      width: size,
      height: size,
    }}
  >
    <Smile size={size * 0.6} color="white" />
  </View>
);