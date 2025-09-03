export type Post = {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
};

export const dummyPosts: Post[] = [
  {
    id: "1",
    author: "Alice",
    content: "今天的天气真好 ☀️，适合出去走走！",
    likes: 12,
    comments: 4,
  },
  {
    id: "2",
    author: "Bob",
    content: "第一次尝试 React Native，感觉还不错 😎",
    likes: 20,
    comments: 6,
  },
  {
    id: "3",
    author: "Charlie",
    content: "有没有人一起打球 🏀？",
    likes: 5,
    comments: 2,
  },
];
