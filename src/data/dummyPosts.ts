// data/dummyPosts.ts
export type Comment = {
  id: number;
  author: string;
  content: string;
  time: string;
  avatar: string;
};

export type Post = {
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
  isSaved: boolean;
};

export const dummyPosts: Post[] = [
  {
    id: 1,
    CommunityName: "校园生活",
    Title: "今天天气真好 ☀️",
    content: "阳光很舒服，适合去散步！",
    tags: ["生活", "天气"],
    likes: 12,
    comments: [
      { id: 1, author: "Alice", content: "同感！", time: "1h", avatar: "#8B5CF6" },
      { id: 2, author: "Bob", content: "我去图书馆看书 📚", time: "30m", avatar: "#F59E0B" },
    ],
    time: "2h",
    anonymous: "匿名用户",
    avatar: "#8B5CF6",
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    CommunityName: "编程学习",
    Title: "第一次尝试 React Native",
    content: "感觉还不错 😎，就是样式有点麻烦。",
    tags: ["React Native", "学习"],
    likes: 20,
    comments: [
      { id: 1, author: "Charlie", content: "加油！", time: "10m", avatar: "#10B981" },
    ],
    time: "3h",
    anonymous: "匿名用户",
    avatar: "#F59E0B",
    isLiked: false,
    isSaved: true,
  },
  {
    id: 3,
    CommunityName: "运动专区",
    Title: "有人打球吗？",
    content: "有没有人想来打篮球 🏀，缺两个人。",
    tags: ["篮球", "运动"],
    likes: 5,
    comments: [],
    time: "5h",
    anonymous: "匿名用户",
    avatar: "#EF4444",
    isLiked: false,
    isSaved: false,
  },
];
