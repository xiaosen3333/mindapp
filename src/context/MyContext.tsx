import React, { useState } from "react";
import img1 from "../image/1.png";
import img2 from "../image/2.png";
import img3 from "../image/3.png";
import img4 from "../image/4.png";
import img5 from "../image/5.png";
import img6 from "../image/6.png";

const progress: number = 0;

export const ProgressContext = React.createContext<{
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}>({
  progress,
  setProgress: () => {},
});
interface PageContextType {
  pagenum: number;
  setPagenum: React.Dispatch<React.SetStateAction<number>>;
}

// 创建一个context对象，并提供默认值
export const PageContext = React.createContext<PageContextType>({
  pagenum: 0,
  setPagenum: () => {},
});

const record: {
  img: string;
  event: string;
  descriptions: {
    question: string;
    answer: string;
  }[];
  conslusion: string;
  correct: boolean;
}[] = [
  {
    event: "记录一下今天喜欢的一道菜吧",
    img: img1,
    descriptions: [
      {
        question: "向我详细形容一下这道菜的味道吧",
        answer: "是麻辣的，很好吃，很符合我的口味，豌豆很糯，我很喜欢",
      },
      {
        question: "为什么喜欢呢",
        answer: "因为我很喜欢花椒麻麻的感觉",
      },
    ],
    conslusion: "",
    correct: false,
  },
  {
    event: "记录今天做的一件家务",
    img: img2,
    descriptions: [
      {
        question: "详细说说你具体做了什么",
        answer: "我洗了很多的碗，并且把灶台也擦干净了",
      },
    ],
    conslusion: "",
    correct: false,
  },
  {
    event: "记录今天看到的美景",
    img: img3,
    descriptions: [
      {
        question: "除此之外，还有什么喜欢的花吗？",
        answer: "我还很喜欢桂花，金金黄黄的，秋天的时候很香，也不会很腻",
      },
    ],
    conslusion: "",
    correct: false,
  },
  {
    event: "与今天交流中带给快乐的人合照",
    img: img4,
    descriptions: [
      {
        question: "TA是你的熟人吗？不是的话你们有交流名字吗？",
        answer: "是我的老伴，她叫李春兰",
      },
      {
        question: "你们聊了什么让你感到开心呢？和我分享一下吧",
        answer: "我们聊了我们的孙子，是一个很调皮的娃娃，不过说实话很讨喜",
      },
    ],
    conslusion: "",
    correct: false,
  },
  {
    event: "与今天一起散步的伙伴合照吧",
    img: img5,
    descriptions: [
      {
        question: "你们去了哪里？",
        answer: "去了家附近的西湖公园，风景很美，天气很好",
      },
      {
        question: "有看到了什么印象深刻的事物吗？",
        answer: "有一只小狗和二黄玩，感觉它们俩很开心，我也挺高兴的",
      },
    ],
    conslusion: "",
    correct: false,
  },
  {
    event: "记录一下今天让你快乐的事物吧",
    img: img6,
    descriptions: [
      {
        question: "为什么TA让你感到开心呢",
        answer: "它很可爱，并且它主动蹭过来让我摸",
      },
      {
        question: "除了猫之外还有什么喜欢的小动物吗",
        answer:
          "鹦鹉吧，李老头有一只鹦鹉天天带过来炫耀，那只鹦鹉还会和我们打招呼嘞",
      },
    ],
    conslusion: "",
    correct: false,
  },
  {
    event: "",
    img: "",
    descriptions: [],
    conslusion: "",
    correct: false,
  },
];

export const RecordContext = React.createContext(record);
